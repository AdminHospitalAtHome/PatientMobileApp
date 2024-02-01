import {ChatThreadClient} from '@azure/communication-chat';
import {GiftedChat} from 'react-native-gifted-chat';
import {useEffect, useState} from 'react';
import {
  getAllMessages,
  getParticipantInThread,
} from '../../../BackEndFunctionCall/ChatFunctions/Message';

export function AzureChatPage({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const {threadClient} = route.params;
  const chatThreadClient: ChatThreadClient = threadClient;

  const {communicationID} = route.params;

  const [chatMessages, setChatMessages] = useState<any[]>([]); // TODO: Change to specific type later....
  const [providerName, setProviderName] = useState<string>('Dr');

  useEffect(() => {
    getAllMessages(chatThreadClient, providerName).then(res => {
      setChatMessages(res);
      console.log('got messages!!');
    });
  }, []);

  //@ts-ignore
  useEffect(
    () => {
      getParticipantInThread(chatThreadClient, communicationID).then(name => {
        if (name) {
          setProviderName(name);
        }
      });
      //@ts-ignore
    },
    //@ts-ignore
    [],
  );

  return (
    <GiftedChat
      messages={chatMessages}
      user={{_id: communicationID}}
      showAvatarForEveryMessage={true}
    />
  );
}
