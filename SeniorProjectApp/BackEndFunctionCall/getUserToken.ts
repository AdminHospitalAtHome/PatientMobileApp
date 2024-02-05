const getUserTokenUrl =
  'https://hosptial-at-home-js-api.azurewebsites.net/api/getUserToken';

export function getUserToken(userId: string): Promise<any> {
  const urlWithParams = new URL(getUserTokenUrl);
  urlWithParams.searchParams.append('userId', userId);
  return new Promise((resolve, reject) => {
    fetch(urlWithParams.toString())
      .then(response => response.json())
      .then(json => {
        resolve(json);
      });
  });
}
