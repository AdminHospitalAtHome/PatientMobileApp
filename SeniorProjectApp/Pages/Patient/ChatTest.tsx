import {View} from 'react-native';
import React, { useState } from 'react';

import {ChatClient} from '@azure/communication-chat';
import {
  ChatMessage,
  FluentThemeProvider,
  MessageStatus,
  MessageThread,
} from '@azure/communication-react';
import {AzureCommunicationTokenCredential} from '@azure/communication-common';
import '@azure/core-asynciterator-polyfill';

import {GetHistoryChatMessages} from '../../BackEndFunctionCall/ChatFunctions/sampleMessage';

export default function ChatTest(): JSX.Element {
  let endpointUrl =
    'https://hospitalathomechat.unitedstates.communication.azure.com';
  let userAccessToken =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVFODQ4MjE0Qzc3MDczQUU1QzJCREU1Q0NENTQ0ODlEREYyQzRDODQiLCJ4NXQiOiJYb1NDRk1kd2M2NWNLOTVjelZSSW5kOHNUSVEiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOmY0ZGQ4YWZiLWE5MzUtNDJjMy04OWUzLTRiMzU4ZjA5Mzc4OV8wMDAwMDAxYy1kYjEzLWQ0YjAtNmEwYi0zNDNhMGQwMDRiYWEiLCJzY3AiOjE3OTIsImNzaSI6IjE3MDE4MDAxOTQiLCJleHAiOjE3MDE4ODY1OTQsInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6ImNoYXQiLCJyZXNvdXJjZUlkIjoiZjRkZDhhZmItYTkzNS00MmMzLTg5ZTMtNGIzNThmMDkzNzg5IiwicmVzb3VyY2VMb2NhdGlvbiI6InVuaXRlZHN0YXRlcyIsImlhdCI6MTcwMTgwMDE5NH0.Fa1MpJQ2QX__HDm7SoFU7t18HXMdsPyh13B_fnQOrTbqyEhLK4VH2DsZk7QXxswZVtbq6yYeTG773Mb0k1q-5UxhpDFQhyvGxOPoIGF38QcmKAKG2EjQd1SCFRo0BgfBc0wB0_mRxOgYlT8xjou239Df9jwmglYw1VsgZlRjqxV_27vB8MLKF-bsgcE9cXiQxTi1kwePEse1uOLBlv638_LL5-0PXW_l6NuWpz-mw5kUa6L9rtxkDRASyLLfkwPMy4nyrjVnVEOb6yAMTus34NNIdREJZ2M_IhDKoaLE-tCSe9bY8tb2kcv07irsAgRnHmjIzxskVE5FNaEdAgwzgw';
  let chatClient = new ChatClient(
    endpointUrl,
    new AzureCommunicationTokenCredential(userAccessToken),
  );
  const userId =
    '8:acs:f4dd8afb-a935-42c3-89e3-4b358f093789_0000001c-db13-d4b0-6a0b-343a0d004baa';

  async function createChatThread() {
    const createChatThreadRequest = {
      topic: 'test!',
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
    const messages = chatThreadClient.listMessages();
    for await (const message of messages) {
      console.log(
        `Chat Thread message id:${message.id}, message: ${message.content.message}`,
      );
    }
  });

  const [messages, setMessages] = useState<ChatMessage[]>(GetHistoryChatMessages());

  return (
    <FluentThemeProvider>
      <MessageThread
        userId={'1'}
        messages={messages}
        onUpdateMessage={async (id, content, metadata) => {
          const updated = messages.map(m =>
            m.messageId === id
              ? {
                  ...m,
                  metadata,
                  failureReason: 'Failed to edit',
                  status: 'failed' as MessageStatus,
                }
              : m,
          );
          setMessages(updated);
          return Promise.reject('Failed to update');
        }}
        onCancelEditMessage={id => {
          const updated = messages.map(m =>
            m.messageId === id
              ? {...m, failureReason: undefined, status: undefined}
              : m,
          );
          setMessages(updated);
        }}
      />
    </FluentThemeProvider>
  );
}
