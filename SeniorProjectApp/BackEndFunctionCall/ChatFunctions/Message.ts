import {ChatClient, ChatThreadClient} from '@azure/communication-chat';

export async function sendMessage(
  chatClient: ChatClient,
  threadId: string,
  content: string,
  name: string,
) {
  const chatThreadClient: ChatThreadClient =
    chatClient.getChatThreadClient(threadId);
  const sendMessageRequest: {content: string} = {
    content: content,
  };
  let sendMessageOptions: {senderDisplayName: string; type: string} = {
    senderDisplayName: name,
    type: 'text',
  };
  const sendChatMessageResult = await chatThreadClient.sendMessage(
    sendMessageRequest,
    sendMessageOptions,
  );
  const messageId = sendChatMessageResult.id;
  const messages = chatThreadClient.listMessages();
  for await (const message of messages) {
    console.log(`Chat Thread message id:${message.id}`);
  }
}
