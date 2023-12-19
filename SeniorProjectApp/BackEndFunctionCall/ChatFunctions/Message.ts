const endpointurl =
  'https://hospitalathomechat.unitedstates.communication.azure.com';

export function getCommunicationId(userId: number): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getCommunicationId?patientID=${userId}`,
    )
      .then(res => res.json())
      .then(res => {
        if (res.length === 1) {
          resolve(res[0].CommunicationId);
        } else {
          reject('failed to get communicationId');
        }
      });
  });
}

//should modify later when the provider site sis ready, call it on contact page
export function getChatThread(userId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getChatThread?UserId=${userId}`,
    )
      .then(response => response.json())
      .then(res => {
        resolve(res[0].ThreadId);
      });
  });
}

export function getCommunicationToken(userId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getUserToken?userId=${userId}`,
    )
      .then(res => res.json())
      .then(res => {
        resolve(res.token);
      });
  });
}

export function getMessage(
  threadId: string,
  accessToken: string,
): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://hospitalathomechat.unitedstates.communication.azure.com/chat/threads/${threadId}/messages?api-version=2023-11-07`,
      {method: 'GET', headers: {Authorization: `Bearer ${accessToken}`}},
    )
      .then(res => res.json())
      .then(res => resolve(res));
  });
}

export function sendMessage(
  threadId: string,
  accessToken: string,
  message: string,
) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://hospitalathomechat.unitedstates.communication.azure.com/chat/threads/${threadId}/messages?api-version=2023-11-07`,
      {
        method: 'POST',
        body: JSON.stringify({content: message}),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    ).then(res => {
      if (res.status === 201) {
        resolve(res);
      } else {
        reject(`did not send message, status: ${res.status}`);
      }
    });
  });
}
