const client = require("@mailchimp/mailchimp_marketing");
const clientConfig = {
  apiKey: process.env.API_KEY,
  server: process.env.API_KEY.split('-')[1],
}
const Response = require('./response.entity');


module.exports = class ContactClient {
  constructor() {
    this.client = client;
    this.client.setConfig(clientConfig);
  }

  // async getAllContacts(listId) {
  //   const response = await this.client.lists.getListMembersInfo(listId);
  //   console.log(response);
  //   return response;
  // }

  async addContact(listId, contact) {
    const response = new Response();
    const result = await this.client.lists.addListMember(
      listId,
      {
        email_address: contact.email,
        merge_fields: {
          FNAME: contact.firstName,
          LNAME: contact.lastName,
        },
        status: "subscribed",
      }
    )
      .then(resp => {
        response.setResult(contact)
        return response
      })
      .catch(error => {
        response.setError(error, contact);
        return response;
      });

    return result;
  }

  // async delete(listId, contactId) {
  //   const response = new Response();

  //   try {
  //     const result = await client.lists.deleteListMemberPermanent(listId, contactId);
  //     response.setResult(result)
  //     return response;
  //   } catch (error) {
  //     return response.setError(error)
  //   }
  // }
}
