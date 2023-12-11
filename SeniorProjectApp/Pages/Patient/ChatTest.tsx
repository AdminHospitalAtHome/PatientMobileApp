import {View} from 'react-native';
import React from 'react';
import ReactDOM from 'react-dom'
import {
  Chat,
  ChatItem,
  ChatMessage,
  PersonIcon,
  Avatar,
    Provider
} from '@fluentui/react-northstar';
export default function ChatTest(): JSX.Element {
  return (
    <View>
      <Provider></Provider>
      {/*<Chat>*/}
      {/*  <ChatItem*/}
      {/*    gutter={<Avatar icon={<PersonIcon />} />}*/}
      {/*    message={*/}
      {/*      <ChatMessage*/}
      {/*        author="Pascale Koss"*/}
      {/*        content="Try to reboot the TCP capacitor, maybe it will transmit the primary firewall!"*/}
      {/*        timestamp="Yesterday, 10:15"*/}
      {/*      />*/}
      {/*    }*/}
      {/*  />*/}
      {/*</Chat>*/}
    </View>
  );
}
