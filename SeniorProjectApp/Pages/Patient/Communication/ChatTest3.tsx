import {
  getChatThread,
  getCommunicationId,
  getCommunicationToken,
  getMessage,
  sendMessage,
} from '../../../BackEndFunctionCall/ChatFunctions/Message';
import {useCallback, useEffect, useState} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';

export default function ChatTest3(): JSX.Element {
  const [accessToken, setAccessToken] = useState('');
  const [communicationId, setCommunicationId] = useState('');
  const [chatThreadId, setChatThreadId] = useState('');
  const [chatMessage, setChatMessage] = useState([]);
  const [giftedChatMessages, setGiftedChatMessages] = useState([]);

  useEffect(() => {
    getCommunicationId(300000001)
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
              _id: res.value[i].senderCommunicationIdentifier.communicationUser
                .id,
              name: 'Patient',
              avatar:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2uHhqRHP4DE9qu75Wx838bt6lGM-j1DUuG7O33XOnKQ&s',
            },
          };
          parsedMsg.push(dic);
        }
        setChatMessage(res.value);
        setGiftedChatMessages(parsedMsg);
      });
    }
  }, [chatThreadId, accessToken]);

  const onSend = useCallback(
    (messages = []) => {
      if (chatThreadId && accessToken) {
        sendMessage(chatThreadId, accessToken, messages[0].text);
        setGiftedChatMessages((previousMessages: any) =>
          GiftedChat.append(previousMessages, messages),
        );
      }
    },
    [chatThreadId, accessToken],
  );

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#e6dfdf',
          },
        }}
      />
    );
  };

  return (
    <GiftedChat
      messages={giftedChatMessages}
      onSend={giftedChatMessages => onSend(giftedChatMessages)}
      user={{
        _id: communicationId,
      }}
      textInputStyle={{color: 'black'}}
      renderBubble={renderBubble}
      showAvatarForEveryMessage ={true}
    />
  );
}
