const client = require("@mailchimp/mailchimp_marketing");

const clientConfig = {
  apiKey: process.env.API_KEY,
  server: process.env.API_KEY.split('-')[1],
}

module.exports = class List {
  constructor() {
    this.client = client;
    this.client.setConfig(clientConfig);
  }


  async init(listName) {
    this.listName = listName;
    const isFound = await this.#isFound();

    if (!isFound) {
      await this.#create();
    }

    process.env.LIST_ID = this.id;
    console.log('LIST_ID ', process.env.LIST_ID)
  }


  async #isFound() {
    const response = await this.#getAllIn()
    const { lists } = response;

    if (typeof lists === 'undefined' || lists.length == 0) {
      return false;
    }

    const index = lists.map(list => list.name).indexOf(this.listName)

    if (index >= 0) {
      this.id = lists[index].id;
      return true
    }

    // the basic plan just allow 1 list by user
    // the list must be removed before creating
    // the right one
    if (lists.length > 0) {
      this.remove(lists[0].id)
    }

    return false
  }


  async #create() {

    const response = await this.client.lists.createList({
      name: this.listName,
      permission_reminder: "You are receiving this email because you opted in via our website.",
      email_type_option: true,
      contact: {
        company: "MySelf",
        address1: "Rua Assis Figueiredo",
        city: "Curitiba",
        country: "Brasil",
        state: "Paraná",
        zip: "80630-280"
      },
      campaign_defaults: {
        from_name: "Yan Karlo",
        from_email: "yankarlon@hotmail.com",
        subject: "Code Challenge",
        language: "en",
      },
    });
    this.id = response.id;
  };


  async #getAllIn() {
    const response = await this.client.lists.getAllLists();
    return response
  }


  async remove(listId) {
    const response = await this.client.lists.deleteList(listId);
    return response;
  }

}
