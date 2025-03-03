import assert from "node:assert";
import crypto from "node:crypto";
import { beforeEach, test } from "node:test";

import { SalesforceAuthService, helloNpm } from "../src/index.js";

globalThis.fetch = async (url, option) => {
  console.log("fetch", url, option);

  if (url === "https://login.salesforce.com/services/oauth2/token") {
    return {
      ok: true,
      status: 200,
      json: async () => {
        return { access_token: generateRandomAccessToken(255) };
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
      baseURL: "https://login.salesforce.com",
      clientId: "3MVG9d8..z.hDcPJZJ3zP4Z3",
      clientSecret: "3D3A",
      grantType: "client_credentials",
    };
    const connection = await new SalesforceAuthService(config).getAccessToken();

    console.log(connection);
  });

  await t.test("Test failed auth", async (t) => {
    const config = {
      baseURL: "https://error.salesforce.com",
      clientId: "3MVG9d8..z.hDcPJZJ3zP4Z3",
      clientSecret: "3D3A",
      grantType: "client_credentials",
    };
    const connection = await new SalesforceAuthService(config).getAccessToken();

    console.log(connection);
  });
});
