import { SalesforceAuthService } from "./SalesforceAuthService.js";
import { SalesforceDataService } from "./SalesforceDataService.js";
import { SalesforceRestService } from "./SalesforceRestService.js";

/**
 * Class to handle Salesforce requests.
 */
export class SalesforceRequester {
  #org;

  /**
   * Creates an instance of SalesforceRequester.
   * @param {Object} org - The organization configuration object.
   * @param {string} org.instanceUrl - The Salesforce instance URL.
   * @param {string} org.clientId - The client ID for authentication.
   * @param {string} org.clientSecret - The client secret for authentication.
   * @param {string} org.grantType - The grant type for authentication.
   * @param {string} [org.secretToken] - The secret token for authentication.
   * @param {string} [org.refreshToken] - The refresh token for authentication.
   * @param {string} [org.password] - The password for authentication.
   */
  constructor(
    org = {
      instanceUrl,
      clientId,
      clientSecret,
      grantType,
      secretToken,
      refreshToken,
      password,
    },
  ) {
    this.#org = org;
  }

  /**
   * Connects to Salesforce by authenticating with the SalesforceAuthService.
   * If authentication is successful, logs a message indicating the connection.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when the connection process is complete.
   */
  async connect() {
    const authenticate = await new SalesforceAuthService(
      this.#org,
    ).getAccessToken();

    if (authenticate) {
      console.log("Connected to Salesforce");
      console.log(authenticate);

      return authenticate;
    }
  }

  /**
   * Returns an instance of SalesforceDataService.
   * @returns {SalesforceDataService} The SalesforceDataService instance.
   */
  async dataService() {
    const connection = await this.connect();

    return new SalesforceDataService(connection);
  }

  /**
   * Returns an instance of SalesforceRestService.
   * @returns {SalesforceRestService} The SalesforceRestService instance.
   */
  async restService() {
    const connection = await this.connect();

    return new SalesforceRestService(connection);
  }
}
