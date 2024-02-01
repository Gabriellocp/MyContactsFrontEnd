class ContactService {
  async listContacts(orderBy = 'asc') {
    const response = await fetch(`http://localhost:3000/contacts?order=${orderBy}`);
    fetch(`http://localhost:3000/contacts?order=${orderBy}`);
    const json = await response.json();
    return json;
  }
}

export default new ContactService();
