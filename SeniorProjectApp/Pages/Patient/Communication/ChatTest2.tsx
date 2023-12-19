import {
  getChatThread,
  getCommunicationId,
  getCommunicationToken,
  getMessage,
  sendMessage,
} from '../../../BackEndFunctionCall/ChatFunctions/Message';
import {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

export default function ChatTest2(): JSX.Element {
  const [accessToken, setAccessToken] = useState('');
  const [communicationId, setCommunicationId] = useState('');
  const [chatThreadId, setChatThreadId] = useState('');
  const [chatMessage, setChatMessage] = useState([]);
  const [giftedChatMessages, setGiftedChatMessages] = useState([]);

  useEffect(() => {
    getCommunicationId(200000001)
      .then(res => {
        setCommunicationId(res);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (communicationId) {
      getCommunicationToken(communicationId)
        .then(res => {
          setAccessToken(res);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [communicationId]);

  useEffect(() => {
    if (accessToken && communicationId) {
      getChatThread(communicationId)
        .then(res => {
          setChatThreadId(res);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [accessToken, communicationId]);

  useEffect(() => {
    if (chatThreadId && accessToken) {
      getMessage(chatThreadId, accessToken).then(res => {
        let parsedMsg = [];

        for (let i = 0; i < res.value.length; i++) {
          if (!res.value[i].content.message) {
            continue;
          }
          let dic = {
            _id: res.value[i].id,
            text: res.value[i].content.message,
            createdAt: res.value[i].createdOn,
            user: {
              _id: communicationId,
              name: 'Patient',
              avatar:
                'https://upload.wikimedia.org/wikipedia/en/e/ed/Rose%E2%80%93Hulman_Institute_of_Technology_seal.svg',
            },
          };
          parsedMsg.push(dic);
        }
        setChatMessage(res.value);
        setGiftedChatMessages(parsedMsg);
      });
    }
  }, [chatThreadId, accessToken]);

  const onSend = useCallback((messages = []) => {
    console.log(messages[0].text);
    sendMessage(chatThreadId, accessToken, messages[0].text);
    setGiftedChatMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <GiftedChat
      messages={giftedChatMessages}
      onSend={giftedChatMessages => onSend(giftedChatMessages)}
      user={{
        _id: communicationId,
      }}
      textInputStyle={{color: 'black'}}
    />
  );
}
