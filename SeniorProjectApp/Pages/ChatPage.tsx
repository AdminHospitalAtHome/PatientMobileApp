import {Text, View} from 'react-native';

import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { ChatClient } from '@azure/communication-chat';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import 'node-libs-react-native/globals';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';


export default function ChatPage(navigation: any): JSX.Element {
  let endpointUrl =
    'https://hospitalathomechat.unitedstates.communication.azure.com';
  // The user access token generated as part of the pre-requisites
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
   
    useEffect(() => {
      // Fetch token from backend when app loads
      axios.get('http://137.112.210.175:8000/token')
        .then(response => {
          const { user: azureUser, token } = response.data;
          setUser(azureUser);
          // Initialize ChatClient here with the token
          const chatClient = new ChatClient(
           endpointUrl,
            new AzureCommunicationTokenCredential(token)
          );
         
          // Continue with creating chat thread, adding users, etc.
        })
        .catch(error => console.error(error));
    }, []);
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
      //do send message
      // Send message to Azure Communication Services chat thread here
    }, []);


  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user?.id,
      }}
    />
  );
}
