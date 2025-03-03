import { SalesforceRestService } from "./SalesforceRestService.js";

/**
 * Service to interact with Salesforce data.
 */
export class SalesforceDataService {
  #url;
  #method;
  #data;
  #salesforceRestService;

  /**
   * Creates an instance of SalesforceDataService.
   * @param {Object} connection - The connection object containing instance URL and access token.
   * @param {string} connection.instance_url - The Salesforce instance URL.
   * @param {string} connection.access_token - The access token for authentication.
   */
  constructor(connection) {
    console.log("connection");
    console.log(connection);

    this.#salesforceRestService = new SalesforceRestService(connection);
  }

  /**
   * Executes the request based on the set method and URL.
   * @returns {Promise<Object>} The response from the Salesforce API.
   */
  async execute() {
    if (this.#method === "GET") {
      return await this.#salesforceRestService.get(this.#url);
    }

    if (this.#method === "POST") {
      return await this.#salesforceRestService.post(this.#url, this.#data);
    }

    if (this.#method === "PATCH") {
      return await this.#salesforceRestService.patch(this.#url, this.#data);
    }
  }

  /**
   * Sets up a query request.
   * @param {string} query - The SOQL query string.
   * @returns {SalesforceDataService} The instance of SalesforceDataService.
   */
  query(query) {
    let url = `/services/data/v62.0/query/?q=${query}`;

    this.#url = url;
    this.#method = "GET";
    return this;
  }

  /**
   * Sets up a request to get the next set of records.
   * @param {string} nextRecordsUrl - The URL for the next set of records.
   * @returns {SalesforceDataService} The instance of SalesforceDataService.
   */
  nextRecordsUrl(nextRecordsUrl) {
    this.#url = nextRecordsUrl;
    this.#method = "GET";
    return this;
  }

  /**
   * Sets up a request to insert a record.
   * @param {string} sobjectType - The Salesforce object type.
   * @param {Object} data - The data to insert.
   * @returns {SalesforceDataService} The instance of SalesforceDataService.
   */
  insertRecord(sobjectType, data) {
    let url = `/services/data/v62.0/sobjects/${sobjectType}`;

    this.#url = url;
    this.#method = "POST";
    this.#data = data;
    return this;
  }

  /**
   * Sets up a request to get a record.
   * @param {string} sobjectType - The Salesforce object type.
   * @param {string} recordId - The ID of the record to retrieve.
   * @returns {SalesforceDataService} The instance of SalesforceDataService.
   */
  getRecord(sobjectType, recordId) {
    let url = `/services/data/v62.0/sobjects/${sobjectType}/${recordId}`;

    this.#url = url;
    this.#method = "GET";
    return this;
  }

  /**
   * Sets up a request to update a record.
   * @param {string} sobjectType - The Salesforce object type.
   * @param {string} recordId - The ID of the record to update.
   * @param {Object} data - The data to update.
   * @returns {SalesforceDataService} The instance of SalesforceDataService.
   */
  updateRecord(sobjectType, recordId, data) {
    let url = `/services/data/v62.0/sobjects/${sobjectType}/${recordId}`;
    this.#url = url;
    this.#method = "PATCH";
    return this;
  }

  /**
   * Sets up a composite request to insert multiple records.
   * @param {Object[]} data - The array of records to insert.
   * @param {boolean} allOrNone - Whether to apply the allOrNone flag.
   * @returns {SalesforceDataService} The instance of SalesforceDataService.
   */
  compositeInsert(data, allOrNone) {
    let url = `/services/data/v62.0/composite/sobjects/`;

    const requestData = {
      allOrNone: allOrNone,
      records: data,
    };

    this.#url = url;
    this.#method = "POST";
    this.#data = requestData;
    return this;
  }

  /**
   * Sets up a composite request to update multiple records.
   * @param {Object[]} data - The array of records to update.
   * @param {boolean} allOrNone - Whether to apply the allOrNone flag.
   * @returns {SalesforceDataService} The instance of SalesforceDataService.
   */
  compositeUpdate(data, allOrNone) {
    let url = `/services/data/v62.0/composite/sobjects/`;

    const requestData = {
      allOrNone: allOrNone,
      records: data,
    };

    this.#url = url;
    this.#method = "PATCH";
    this.#data = requestData;
    return this;
  }
}
