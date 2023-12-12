export function getChatThread(userId: string) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getChatThread?UserId=${userId}`,
    )
      .then(response => response.json())
      .then(json => {
        if (json.length > 0) {
          resolve(json);
        } else {
          reject('no thread found');
        }
      })
      .catch(() => {
        reject('error');
      });
  });
}
