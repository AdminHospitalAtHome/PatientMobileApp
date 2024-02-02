import {ChatClient, ChatThreadClient} from '@azure/communication-chat';
import {AzureCommunicationTokenCredential} from '@azure/communication-common';
import 'node-libs-react-native/globals';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import '@azure/core-asynciterator-polyfill';
import {GiftedChat} from 'react-native-gifted-chat';
import BackgroundTimer from 'react-native-background-timer';

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
    console.log('HELLO???');
    const threads = chatClient.listChatThreads();
    let threadClients: ChatThreadClient[] = [];
    for await (const t of threads) {
      try {
        if (!t.deletedOn) {
          threadClients.push(chatClient.getChatThreadClient(t.id));
          console.log('THREAD');
        }
      } catch {}
    }
    resolve(threadClients);
  });
}

export async function getParticipantInThread(
  chatThreadClient: ChatThreadClient,
  communicationID: string,
) {
  return new Promise<string | undefined>(async resolve => {
    try {
      let participants = chatThreadClient.listParticipants();
      for await (const p of participants) {
        // Assumes chats only have two people
        // @ts-ignore
        if (p.id.communicationUserId !== communicationID) {
          resolve(p.displayName);
        }
      }
    } catch {
      console.log('error: get participant in thread function');
    }
    resolve('Error');
  });
}

export function getAllMessages(
  chatThreadClient: ChatThreadClient,
  providerName: string,
): Promise<any[]> {
  return new Promise(async resolve => {
    const messages = chatThreadClient.listMessages();

    let parsedMessages = [];

    for await (const m of messages) {
      // Incase it is a different kind of message like user added to chat or topic changed...
      try {
        //@ts-ignore
        if (m.content?.message && m.sender?.communicationUserId) {
          // If true we are sender
          // @ts-ignore
          if (temp_communicationId === m.sender.communicationUserId) {
            let dictionary = {
              _id: m.id,
              text: m.content.message,
              createdAt: m.createdOn,
              user: {
                //@ts-ignore
                _id: m.sender.communicationUserId,
                name: 'Me',
              },
            };
            parsedMessages.push(dictionary);
          } else {
            let dictionary = {
              _id: m.id,
              text: m.content.message,
              createdAt: m.createdOn,
              user: {
                //@ts-ignore
                _id: m.sender.communicationUserId,
                name: providerName,
              },
            };
            parsedMessages.push(dictionary);
          }
        }
      } catch {}
    }

    resolve(parsedMessages);
  });
}

export function getMessageNotification(
  chatThreadClient: ChatThreadClient,
  setChatMessages: React.Dispatch<React.SetStateAction<any[]>>,
  providerName: string,
  chatMessages: any[],
) {
  BackgroundTimer.runBackgroundTimer(async () => {
    const messages = chatThreadClient.listMessages();
    let parsedMessages = [];

    for await (const m of messages) {
      // @ts-ignore
      try {
        // @ts-ignore
        if (m.content?.message && m.sender?.communicationUserId) {
          console.log(m.content.message);
        }
        if (chatMessages.length !== 0 && chatMessages[0] !== undefined) {
          if (m.id === chatMessages[0]._id) {
            console.log('HEY! I FOUND THE MESSAGE');
            // @ts-ignore
            if (m.content?.message && m.sender?.communicationUserId) {
              console.log(m.content.message);
            }
            break;
          } else {
            // @ts-ignore
            if (m.content?.message && m.sender?.communicationUserId) {
              // @ts-ignore
              if (temp_communicationId === m.sender.communicationUserId) {
                let dictionary = {
                  _id: m.id,
                  text: m.content.message,
                  createdAt: m.createdOn,
                  user: {
                    // @ts-ignore
                    _id: m.sender.communicationUserId,
                    name: 'Me',
                  },
                };
                setChatMessages(previous =>
                  GiftedChat.append(previous, [dictionary]),
                );
              } else {
                let dictionary = {
                  _id: m.id,
                  text: m.content.message,
                  createdAt: m.createdOn,
                  user: {
                    // @ts-ignore
                    _id: m.sender.communicationUserId,
                    name: providerName,
                  },
                };
                setChatMessages(previous =>
                  GiftedChat.append(previous, [dictionary]),
                );
              }
            }
          }
        }
      } catch {}
    }
  }, 3000);

  // console.log('NEW MESSAGE RECIEVED');
  // try {
  //   // @ts-ignore
  //   if (m.content?.message && m.sender?.communicationUserId) {
  //     // @ts-ignore
  //     if (temp_communicationId === m.sender.communicationUserId) {
  //       let dictionary = {
  //         _id: m.id,
  //         text: m.message,
  //         createdAt: m.createdOn,
  //         user: {
  //           // @ts-ignore
  //           _id: m.sender.communicationUserId,
  //           name: 'Me',
  //         },
  //       };
  //       setChatMessages(previous => GiftedChat.append(previous, [dictionary]));
  //     } else {
  //       let dictionary = {
  //         _id: m.id,
  //         text: m.message,
  //         createdAt: m.createdOn,
  //         user: {
  //           // @ts-ignore
  //           _id: m.sender.communicationUserId,
  //           name: providerName,
  //         },
  //       };
  //       setChatMessages(previous => GiftedChat.append(previous, [dictionary]));
  //     }
  //   }
  // } catch {}
}
