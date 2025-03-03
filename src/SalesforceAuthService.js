import qs from "qs";

export class SalesforceAuthService {
  connectionConfig;
  constructor(
    connectionConfig = {
      instanceUrl,
      clientId,
      clientSecret,
      grantType,
      secretToken,
      refreshToken,
      password,
    },
  ) {
    this.connectionConfig = connectionConfig;
  }

  async getAccessToken() {
    if (!this.connectionConfig) {
      throw new Error("connectionConfig not found");
    }
    const responseAuth = await this.auth(this.connectionConfig);

    return responseAuth;
  }

  async auth(connectionConfig) {
    let data;
    switch (connectionConfig.grantType) {
      case "password":
        data = qs.stringify({
          grant_type: "password",
          client_id: connectionConfig?.clientId,
          client_secret: connectionConfig?.clientSecret,
          username: connectionConfig?.username,
          password: `${connectionConfig?.password}${connectionConfig?.secretToken}`,
        });
        break;
      case "refresh_token":
        data = qs.stringify({
          grant_type: "refresh_token",
          client_id: connectionConfig?.clientId,
          client_secret: connectionConfig?.clientSecret,
          refresh_token: connectionConfig?.refreshToken,
        });
        break;
      case "client_credentials":
        data = qs.stringify({
          grant_type: "client_credentials",
          client_id: connectionConfig?.clientId,
          client_secret: connectionConfig?.clientSecret,
        });
        break;
    }

    try {
      const response = await fetch(
        `${connectionConfig?.instanceUrl}/services/oauth2/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: data,
        },
      );

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
