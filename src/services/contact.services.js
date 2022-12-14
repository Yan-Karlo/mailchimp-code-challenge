const axios = require('axios').default;
const ContactClient = require('../../entities/contactClient.entity');
const ListClient = require('../../entities/listClient.entity')
const queue = require('../../helpers/queue.helper');
const Response = require('../../entities/response.entity');
const { listName } = require('../../engines/config.json');

module.exports = class ContactService {
  constructor() {
    this.contactList = new ContactClient();
    this.ListClient = new ListClient();
  }

  ping = () => "pong";

  sync = async (report) => {
    var newContactList = [];
    const response = new Response();
    const showErrors = report == null
        ? false
        : report.toLowerCase() === 'true'
          ? true
        : false;

    try {
      newContactList = await
        (await axios.get('https://613b9035110e000017a456b1.mockapi.io/api/v1/contacts')).data
    } catch (error) {
      response.setError(error);
      return response;
    }

    const tasks = newContactList.map(
        async contact => this.addContact({
              email: contact.email,
              firstName: contact.firstName,
              lastName: contact.lastName
        }));

    const queueSize = 5;
    
    var existList = false;

    const queueResult = await queue.enqueue(tasks, queueSize);

    /*
    * Identifies which were processed and which were unsuccessful due to
    * error code 429 - Too Many Requests
    */
    var tooManyRequestsList = queueResult.filter(task => task.httpStatus == 429)
    var processed = queueResult.filter(task => task.httpStatus !== 429)


    // Retries to sync the unsuccessful contacts subscriptions
    while (tooManyRequestsList.length > 0) {
            // await delay(200);

      const newResponse = await execute(
        tooManyRequestsList.map( contact => this.addContact(contact.result)),
        queueSize
      )

      const reprocessed = newResponse.filter(task => task.httpStatus !== 429)
      tooManyRequestsList = newResponse.filter(task => task.httpStatus == 429)
      processed = [...processed, ...reprocessed]
    }

    return showErrors
        ? this.getResultWithErrors(processed)
        : this.getSimpleResult(processed);
  }


  addContact = async (contact) => {
    const response = await this.contactList
      .addContact(process.env.LIST_ID, contact)

    return response;
  }

  getSimpleResult(contactList) {
    const synced = contactList.filter(contact => {
      if (!contact.isError) {
        return contact.result;
      }
    })

    return {
      syncedContacts: synced.length,
      contacts: synced.map(contact => contact.result),
    }
  }

  getResultWithErrors(contactList) {
    const result = this.getSimpleResult(contactList)
    const notSynced = contactList.filter(contact => {
      if (contact.isError) {
        return contact.result;
      }
    })

    const resultWithErrors = {
        quantity: notSynced.length,
        contacts: notSynced.map(contact => {
          return {
            httpStatus : contact.httpStatus,
            message: contact.message,
            contact: contact.result
          }
        }),
    }

    result['notSynced'] = {...resultWithErrors}
    return result
  }

}