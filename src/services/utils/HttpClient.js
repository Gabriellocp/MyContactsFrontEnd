import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);
    const contentType = response.headers.get('Content-Type');
    let body;
    if (contentType.includes('application/json')) {
      body = await response.json();
    }
    if (response.ok) {
      return body;
    }
    throw new APIError(response, body);
  }

  async post(path, body) {
    const headers = new Headers({
      'content-type': 'application/json',
    });
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });
    const contentType = response.headers.get('Content-Type');
    let responseBody;
    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }
    if (response.ok) {
      return responseBody;
    }
    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
