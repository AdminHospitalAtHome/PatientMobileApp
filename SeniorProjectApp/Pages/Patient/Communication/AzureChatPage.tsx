import {ChatThreadClient} from '@azure/communication-chat';
import {GiftedChat} from 'react-native-gifted-chat';
import React, {useEffect, useState} from 'react';
import {
  getAllMessages,
  getMessageNotification,
  getParticipantInThread,
  sendMessage,
} from '../../../BackEndFunctionCall/ChatFunctions/Message';
import {StyleSheet, Text} from 'react-native';
// @ts-ignore
import BackgroundTimer from 'react-native-background-timer';
import {useIsFocused} from '@react-navigation/native';

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
  const isFocused = useIsFocused();

  const [chatMessages, setChatMessages] = useState<any[]>([]); // TODO: Change to specific type later....
  const [providerName, setProviderName] = useState<string>('Initial Config');

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      BackgroundTimer.stopBackgroundTimer();
    });
    if (isFocused) {
      if (providerName !== 'Initial Config') {
        getMessageNotification(chatThreadClient, setChatMessages, providerName);
      }
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(
    () => {
      getParticipantInThread(chatThreadClient, communicationID).then(name => {
        if (name) {
          setProviderName(name);
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (providerName !== 'Initial Config') {
      getAllMessages(chatThreadClient, providerName).then(res => {
        setChatMessages(res);
        console.log('got messages!!');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerName]);

  useEffect(() => {
    if (providerName !== 'Initial Config') {
      getMessageNotification(chatThreadClient, setChatMessages, providerName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerName]);

  if (providerName !== 'Initial Config') {
    return (
      <GiftedChat
        messages={chatMessages}
        user={{_id: communicationID}}
        showAvatarForEveryMessage={true}
        onSend={messages => {
          sendMessage(messages, chatThreadClient);
        }}
        // @ts-ignore
        textInputStyle={styles.textInput}
      />
    );
  } else {
    return <Text>Loading...</Text>;
  }
}

const styles = StyleSheet.create({
  textInput: {
    color: 'black',
  },
});
