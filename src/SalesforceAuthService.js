import qs from "qs";

export class SalesforceAuthService {
  org;
  constructor(
    org = {
      baseURL,
      clientId,
      clientSecret,
      grantType,
      secretToken,
      refreshToken,
      password,
    },
  ) {
    this.org = org;
  }

  async getAccessToken() {
    if (!this.org) {
      throw new Error("Org not found");
    }
    const responseAuth = await this.auth(this.org);

    return responseAuth;
  }

  async auth(org) {
    let data;
    switch (org.grantType) {
      case "password":
        data = qs.stringify({
          grant_type: "password",
          client_id: org?.clientId,
          client_secret: org?.clientSecret,
          username: org?.username,
          password: `${org?.password}${org?.secretToken}`,
        });
        break;
      case "refresh_token":
        data = qs.stringify({
          grant_type: "refresh_token",
          client_id: org?.clientId,
          client_secret: org?.clientSecret,
          refresh_token: org?.refreshToken,
        });
        break;
      case "client_credentials":
        data = qs.stringify({
          grant_type: "client_credentials",
          client_id: org?.clientId,
          client_secret: org?.clientSecret,
        });
        break;
    }

    try {
      const response = await fetch(`${org?.baseURL}/services/oauth2/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data,
      });

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
