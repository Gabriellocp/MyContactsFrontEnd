class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error(response.statusText);
  }
}

export default HttpClient;
