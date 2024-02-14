import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(path, options) {
    return this.makeRequest(path, { method: 'GET', headers: options?.headers });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  async makeRequest(path, options) {
    const headers = new Headers();
    if (options?.body) {
      // This has to be done so the 'GET' isn't configured as 'PREFLIGHT' but as 'SIMPLE' request
      headers.append('content-type', 'application/json');
    }
    if (options?.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      body: JSON.stringify(options?.body),
      headers,
    });
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
}

export default HttpClient;
