import HttpClient from './utils/HttpClient';

class ContactService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?order=${orderBy}`);
  }
}

export default new ContactService();
