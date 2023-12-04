import {View} from 'react-native';
import {ChatClient} from '@azure/communication-chat';
import {AzureCommunicationTokenCredential} from '@azure/communication-common';
export default function ChatTest(): JSX.Element {
  let endpointUrl =
    'https://hospitalathomechat.unitedstates.communication.azure.com';
  let userAccessToken =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVFODQ4MjE0Qzc3MDczQUU1QzJCREU1Q0NENTQ0ODlEREYyQzRDODQiLCJ4NXQiOiJYb1NDRk1kd2M2NWNLOTVjelZSSW5kOHNUSVEiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOmY0ZGQ4YWZiLWE5MzUtNDJjMy04OWUzLTRiMzU4ZjA5Mzc4OV8wMDAwMDAxYy1kNGRiLTE3N2ItYjViYi1hNDNhMGQwMGNiNjAiLCJzY3AiOjE3OTIsImNzaSI6IjE3MDE2OTU4MTIiLCJleHAiOjE3MDE3ODIyMTIsInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6ImNoYXQiLCJyZXNvdXJjZUlkIjoiZjRkZDhhZmItYTkzNS00MmMzLTg5ZTMtNGIzNThmMDkzNzg5IiwicmVzb3VyY2VMb2NhdGlvbiI6InVuaXRlZHN0YXRlcyIsImlhdCI6MTcwMTY5NTgxMn0.dXkrDNE4RCDkPBLYuG0QSguUt83Uj5Wd9uTUcDb6XlQHERsl1Ji72aRrbkxfWMf6dh_BV9caolVg2UV_CiE2hmsF79G05qv1zPyA3kH73q6p6xVGh4qBtc7xX79_IiyfDpAcIR4sNFkMHrfP3ETEdrMvSJRp_vT8_BG0D-833ueIJjRUl1gVv48OeJPNK8yOu3jmUBRfevinvzr24jxVInDCJGVyvpqg2HGXeW9LX3U4XiUzHJJz-H0Z11mwnhUJqh4eKuU5VzB2oJLyS8nFuwGGGLCAfNwxUKrD7MKdmTNMAwrmK2NAP0daH9UiXx-pqsgUkqpLYloTzvzVyWuyUQ';

  let chatClient = new ChatClient(
    endpointUrl,
    new AzureCommunicationTokenCredential(userAccessToken),
  );
  console.log('Azure Communication Chat client created!');

  const userId =
    '8:acs:f4dd8afb-a935-42c3-89e3-4b358f093789_0000001c-d4db-177b-b5bb-a43a0d00cb60';
  async function createChatThread() {
    const createChatThreadRequest = {
      topic: 'Hello, World!',
    };
    const createChatThreadOptions = {
      participants: [
        {
          id: {communicationUserId: userId},
          displayName: 'test',
        },
      ],
    };
    const createChatThreadResult = await chatClient.createChatThread(
      createChatThreadRequest,
      createChatThreadOptions,
    );
    const threadId = createChatThreadResult.chatThread.id;
    return threadId;
  }

  createChatThread().then(async threadId => {
    console.log(`Thread created:${threadId}`);
    let chatThreadClient = chatClient.getChatThreadClient(threadId);
    console.log(`Chat Thread client for threadId:${threadId}`);

    const sendMessageRequest = {
      content: 'This is a test message',
    };
    let sendMessageOptions = {
      senderDisplayName: 'testA',
      type: 'text',
    };
    const sendChatMessageResult = await chatThreadClient.sendMessage(
      sendMessageRequest,
      sendMessageOptions,
    );
    const messageId = sendChatMessageResult.id;
    console.log(`Message sent!, message id:${messageId}`);
    // PLACEHOLDERS
    // <CREATE CHAT THREAD CLIENT>
    // <RECEIVE A CHAT MESSAGE FROM A CHAT THREAD>
    // <SEND MESSAGE TO A CHAT THREAD>
    // <LIST MESSAGES IN A CHAT THREAD>
    // <ADD NEW PARTICIPANT TO THREAD>
    // <LIST PARTICIPANTS IN A THREAD>
    // <REMOVE PARTICIPANT FROM THREAD>
  });

  return <View />;
}
