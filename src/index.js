export function helloNpm() {
  return "hello NPM";
}

export function sendRequest(url, method, body) {
  return fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function formatRequest(data) {
  return { ...data, timestamp: new Date().toISOString() };
}

export * from "./SalesforceAuthService.js";
