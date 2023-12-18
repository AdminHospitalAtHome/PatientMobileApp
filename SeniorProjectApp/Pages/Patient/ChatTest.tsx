import {View} from 'react-native';
import {ChatClient} from '@azure/communication-chat';
import {AzureCommunicationTokenCredential} from '@azure/communication-common';
import {
  getChatThread,
  getCommunicationId,
  getCommunicationToken, getMessage, sendMessage
} from '../../BackEndFunctionCall/ChatFunctions/Message';
import {useState} from 'react';

export default function ChatTest(): JSX.Element {
  const [accessToken, setAccessToken] = useState('');
  const [communicationId, setCommunicationId] = useState('');
  const [chatThreadId, setChatThreadId] = useState('');
  const [chatMessage, setChatMessage] = useState([]);
  const user2 =
      '8:acs:f4dd8afb-a935-42c3-89e3-4b358f093789_0000001d-1547-2fd2-b5bb-a43a0d00c2a5';
  const user3 =
    '8:acs:f4dd8afb-a935-42c3-89e3-4b358f093789_0000001d-1544-971c-47b4-a43a0d00b97f';
  //init
  getCommunicationId(300000001).then(res => setCommunicationId(res));
  // console.log(communicationId);
  getCommunicationToken(communicationId).then(res => setAccessToken(res));
  // console.log(accessToken);
  getChatThread(communicationId).then(res => setChatThreadId(res));
  // console.log(chatThreadId);

  getMessage(chatThreadId, accessToken);
  // sendMessage(chatThreadId, accessToken, 'this is a test message').then(r =>
  //   console.log(r),
  // );
  // setCommunicationId(getCommunicationId("300000001"));
  // setAccessToken(getCommunicationToken(user3));



  // let chatClient = new ChatClient(
  //   endpointUrl,
  //   new AzureCommunicationTokenCredential(userAccessToken),
  // );
  // console.log('Azure Communication Chat client created!');

  // async function createChatThread() {
  //   const createChatThreadRequest = {
  //     topic: 'Hello, World!',
  //   };
  //   const createChatThreadOptions = {
  //     participants: [
  //       {
  //         id: {communicationUserId: user3},
  //         displayName: 'test user 3',
  //       },
  //       {
  //         id: {communicationUserId: user2},
  //         displayName: 'test user 2',
  //       },
  //     ],
  //   };
  //   const createChatThreadResult = await chatClient.createChatThread(
  //     createChatThreadRequest,
  //     createChatThreadOptions,
  //   );
  //   const threadId = createChatThreadResult.chatThread.id;
  //   return threadId;
  // }
  //
  // createChatThread().then(async threadId => {
  //   console.log(`Thread created:${threadId}`);
  //   let chatThreadClient = chatClient.getChatThreadClient(threadId);
  //   console.log(`Chat Thread client for threadId:${threadId}`);

  // const sendMessageRequest = {
  //   content: 'This is a test message',
  // };
  // let sendMessageOptions = {
  //   senderDisplayName: 'testA',
  //   type: 'text',
  // };
  // const sendChatMessageResult = await chatThreadClient.sendMessage(
  //   sendMessageRequest,
  //   sendMessageOptions,
  // );
  // const messageId = sendChatMessageResult.id;
  // console.log(`Message sent!, message id:${messageId}`);

  // PLACEHOLDERS
  // <CREATE CHAT THREAD CLIENT>
  // <RECEIVE A CHAT MESSAGE FROM A CHAT THREAD>
  // <SEND MESSAGE TO A CHAT THREAD>
  // <LIST MESSAGES IN A CHAT THREAD>
  // <ADD NEW PARTICIPANT TO THREAD>
  // <LIST PARTICIPANTS IN A THREAD>
  // <REMOVE PARTICIPANT FROM THREAD>
  // });

  return <View />;
}
