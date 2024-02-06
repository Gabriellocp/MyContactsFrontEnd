import HttpClient from './utils/HttpClient';

class ContactService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?order=${orderBy}`);
  }

  async createContact(contact) {
    return this.httpClient.post('/contacts', { body: contact });
  }
}

export default new ContactService();
