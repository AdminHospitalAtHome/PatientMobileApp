import {ChatClient, ChatThreadClient} from '@azure/communication-chat';
import {AzureCommunicationTokenCredential} from '@azure/communication-common';
import * from '@azure/communication-react';

export const endpointUrl =
  'https://hospitalathomechat.unitedstates.communication.azure.com';

export let temp_communicationId: string = '';
let temp_provider_name: string = '';

export function initChatClient(
  userId: number,
): Promise<ChatClient | undefined> {
  return new Promise<ChatClient | undefined>(resolve => {
    getCommunicationId(userId)
      .then(res => {
        temp_communicationId = res;
        getCommunicationToken(res)
          .then(accessToken => {
            resolve(
              new ChatClient(
                endpointUrl,
                new AzureCommunicationTokenCredential(accessToken),
              ),
            );
          })
          .catch(() => {
            console.error('Failed to init chat client');
            resolve(undefined);
          });
      })
      .catch(() => {
        console.error('Failed to init chat client');
        resolve(undefined);
      });
  });
}

export function getCommunicationId(userId: number): Promise<string> {
  return new Promise((resolve, reject) => {
    // Checking if we have a providerID or a PatinetID. PatientIDs are 9 digits and providerIDs are 6. Both can not have a leading zero so this works.
    let fetchString: string = '';
    if (userId > 999999) {
      fetchString = `/getCommunicationId?patientID=${userId}`;
    } else {
      fetchString = `/getProviderById?providerID=${userId}`;
    }
    fetch(`https://hosptial-at-home-js-api.azurewebsites.net/api${fetchString}`)
      .then(res => res.json())
      .then(res => {
        if (res.length === 1) {
          if (userId < 1000000) {
            temp_provider_name = res[0].FirstName + ' ' + res[0].LastName;
          }

          // noinspection JSUnresolvedReference
          resolve(res[0].CommunicationId);
        } else {
          reject('failed to get communicationId');
        }
      });
  });
}

export function getCommunicationToken(
  communicationId: string,
): Promise<string> {
  return new Promise(resolve => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getUserToken?userId=${communicationId}`,
    )
      .then(res => res.json())
      .then(res => {
        resolve(res.token);
      });
  });
}

export function getAllThreads(
  chatClient: ChatClient,
): Promise<ChatThreadClient[]> {
  return new Promise<ChatThreadClient[]>(async resolve => {
    console.log("HELLO???")
    const threads = chatClient.listChatThreads();
    let threadClients: ChatThreadClient[] = [];
    for await (const t of threads) {
      try {
        if (!t.deletedOn) {
          threadClients.push(chatClient.getChatThreadClient(t.id));
          console.log("THREAD");
        }
      } catch {}
    }
    resolve(threadClients);
  });
}
