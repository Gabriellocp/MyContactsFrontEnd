class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);
    const json = await response.json();
    return json;
  }
}

export default HttpClient;
