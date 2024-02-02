class APIError extends Error {
  constructor(response, body) {
    super(
      body?.error ?? response.statusText,
    );
    this.name = 'APIError';
    this.response = response;
    this.body = body;
  }
}

export default APIError;
