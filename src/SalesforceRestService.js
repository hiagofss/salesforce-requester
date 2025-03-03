/**
 * Service to interact with Salesforce REST API.
 */
export class SalesforceRestService {
  #connection;

  /**
   * Creates an instance of SalesforceRestService.
   * @param {Object} connection - The connection object containing instance URL and access token.
   * @param {string} connection.instance_url - The Salesforce instance URL.
   * @param {string} connection.access_token - The access token for authentication.
   */
  constructor(connection = { instance_url: "", access_token: "" }) {
    this.#connection = connection;
  }

  /**
   * Sends a POST request to the specified URL with the provided data.
   * @param {string} url - The URL to send the request to.
   * @param {Object} data - The data to send in the request body.
   * @returns {Promise<Object>} The response data from the Salesforce API.
   */
  async post(url, data) {
    const response = await fetch(`${this.#connection.instance_url}${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.#connection.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }

  /**
   * Sends a DELETE request to the specified URL with the provided data.
   * @param {string} url - The URL to send the request to.
   * @param {Object} data - The data to send in the request body.
   * @returns {Promise<Object>} The response data from the Salesforce API.
   */
  async delete(url, data) {
    const response = await fetch(`${this.#connection.instance_url}${url}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.#connection.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }

  /**
   * Sends a GET request to the specified URL.
   * @param {string} url - The URL to send the request to.
   * @returns {Promise<Object>} The response data from the Salesforce API.
   */
  async get(url) {
    const response = await fetch(`${this.#connection.instance_url}${url}`, {
      headers: {
        Authorization: `Bearer ${this.#connection.access_token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    return await response.json();
  }

  /**
   * Sends a GET request to the specified URL and returns the response as an ArrayBuffer.
   * @param {string} url - The URL to send the request to.
   * @returns {Promise<ArrayBuffer>} The response data as an ArrayBuffer.
   */
  async getArrayBuffer(url) {
    const response = await fetch(`${this.#connection.instance_url}${url}`, {
      headers: {
        Authorization: `Bearer ${this.#connection.access_token}`,
        "Content-Type": "application/json",
      },
    });

    return response.arrayBuffer();
  }

  /**
   * Sends a PATCH request to the specified URL with the provided data.
   * @param {string} url - The URL to send the request to.
   * @param {Object} data - The data to send in the request body.
   * @returns {Promise<Object>} The response data from the Salesforce API.
   */
  async patch(url, data) {
    const response = await fetch(`${this.#connection.instance_url}${url}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.#connection.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }
}
