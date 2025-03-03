import assert from "node:assert";
import crypto from "node:crypto";
import { beforeEach, test } from "node:test";

import { helloNpm, SalesforceRequester } from "../src/index.js";

import { SalesforceAuthService } from "../src/SalesforceAuthService.js";

globalThis.fetch = async (url, option) => {
  console.log("fetch", url, option);

  if (url === "https://login.salesforce.com/services/oauth2/token") {
    return {
      ok: true,
      status: 200,
      json: async () => {
        return {
          access_token: generateRandomAccessToken(255),
          instance_url: "https://login.salesforce.com",
        };
      },
    };
  }
  if (url === "https://error.salesforce.com/services/oauth2/token") {
    return {
      ok: true,
      status: 400,
      json: async () => {
        return { message: "Bad Request" };
      },
    };
  }

  if (
    url ===
    "https://login.salesforce.com/services/data/v62.0/query/?q=SELECT Id, Name FROM Account"
  ) {
    return {
      status: 200,
      ok: true,
      json: async () => {
        return {
          totalSize: 3,
          done: true,
          records: [
            {
              attributes: {
                type: "Account",
                url: "/services/data/v58.0/sobjects/Account/001B000000UnQ2wIAF",
              },
              Id: "001B000000UnQ2wIAF",
              Name: "Burlington Textiles Corp of America",
              CreatedDate: "2017-08-18T14:46:22.000+0000",
              LastModifiedDate: "2017-08-18T14:46:22.000+0000",
              CreatedById: "005B0000003TOI6IAO",
              LastModifiedById: "005B0000003TOI6IAO",
              Type: "Customer - Direct",
            },
            {
              attributes: {
                type: "Account",
                url: "/services/data/v58.0/sobjects/Account/001B000000UnQ2yIAF",
              },
              Id: "001B000000UnQ2yIAF",
              Name: "Dickenson plc",
              CreatedDate: "2017-08-18T14:46:22.000+0000",
              LastModifiedDate: "2017-08-18T14:46:22.000+0000",
              CreatedById: "005B0000003TOI6IAO",
              LastModifiedById: "005B0000003TOI6IAO",
              Type: "Customer - Channel",
            },
            {
              attributes: {
                type: "Account",
                url: "/services/data/v58.0/sobjects/Account/001B000000UnQ2vIAF",
              },
              Id: "001B000000UnQ2vIAF",
              Name: "Edge Communications",
              CreatedDate: "2017-08-18T14:46:22.000+0000",
              LastModifiedDate: "2017-08-18T14:46:22.000+0000",
              CreatedById: "005B0000003TOI6IAO",
              LastModifiedById: "005B0000003TOI6IAO",
              Type: "Customer - Direct",
            },
          ],
        };
      },
    };
  }

  throw new Error("Unexpected request");
};

const generateRandomAccessToken = function (length) {
  return crypto.randomBytes(length).toString("hex");
};

beforeEach(() => {
  console.log("beforeEach");
});

test("test Hello Module", () => {
  assert.strictEqual(helloNpm(), "hello NPM");
});

test("Auth tests", async (t) => {
  await t.test("Test successfull auth", async (t) => {
    const config = {
      instanceUrl: "https://login.salesforce.com",
      clientId: "3MVG9d8..z.hDcPJZJ3zP4Z3",
      clientSecret: "3D3A",
      grantType: "client_credentials",
    };
    const connection = await new SalesforceAuthService(config).getAccessToken();

    // console.log(connection);
  });

  await t.test("Test failed auth", async (t) => {
    const config = {
      instanceUrl: "https://error.salesforce.com",
      clientId: "3MVG9d8..z.hDcPJZJ3zP4Z3",
      clientSecret: "3D3A",
      grantType: "client_credentials",
    };
    const connection = await new SalesforceAuthService(config).getAccessToken();

    // console.log(connection);
  });
});

test("SalesforceRequester tests", async (t) => {
  const connection = new SalesforceRequester({
    instanceUrl: "https://login.salesforce.com",
    clientId: "3MVG9d8..z.hDcPJZJ3zP4Z3",
    clientSecret: "3D3A",
    grantType: "client_credentials",
  });

  await connection.connect();

  const dataService = await connection.dataService();

  let data = await dataService.query("SELECT Id, Name FROM Account").execute();
  console.log(data);
});
