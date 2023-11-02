import {Text, View} from 'react-native';

import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, IMessage} from 'react-native-gifted-chat';
import axios from 'axios';
import { ChatClient, SendMessageOptions } from '@azure/communication-chat';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import 'node-libs-react-native/globals';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { createUser } from '../BackEndFunctionCall/createUser';
import { getUserToken } from '../BackEndFunctionCall/getUserToken';

export default function ChatPage(navigation: any): JSX.Element {
  let endpointUrl =
    'https://hospitalathomechat.unitedstates.communication.azure.com';
  // The user access token generated as part of the pre-requisites
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatClient, setChatClient] = useState(null);
    const [chatThreadClient, setChatThreadClient] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [providerToken, setProviderToken] = useState(null);
    const [chatThreadId, setChatThreadId] = useState(null);

    //TO-DO: define patientUserId by patientId, give provider a unique userID
    const patientUserId = `8:acs:f4dd8afb-a935-42c3-89e3-4b358f093789_0000001c-22ff-fd2a-9c32-8e3a0d00150e`;
    const providerUserId = `8:acs:f4dd8afb-a935-42c3-89e3-4b358f093789_0000001c-2273-6bd9-6331-8e3a0d00c230`

    const patientName = "<Patient Name>"




    let curr = patientUserId

    
    useEffect(() => {
      const initializeChat = async () => {
        try {
          const data = await getUserToken(providerUserId);
          setUserToken(data.token); // Save the user token
          const tokenCredential = new AzureCommunicationTokenCredential(data.token);
          const newChatClient = new ChatClient(endpointUrl, tokenCredential);
    
          await newChatClient.startRealtimeNotifications();
        
          newChatClient.on("chatMessageReceived", (e) => {
          
            // const receivedMessage: IMessage = {
            //   _id: e.id,
            //   text: e.message,
            //   createdAt: new Date(e.createdOn),
            //   user: {
            //     _id: e.senderDisplayName || e.sender, // Use sender's ID or displayName
            //     name: e.senderDisplayName || 'Unknown',
            //   },
            // };
            // setMessages(previousMessages => GiftedChat.append(previousMessages, [receivedMessage]));
          });
    
          setChatClient(newChatClient);


          const createChatThreadRequest = {
            topic: "Patient Provider Chat"
          };
          const createChatThreadOptions = {
            participants: [
              {
                id: { communicationUserId: providerUserId },
                displayName: 'Union Health'
              },
              {
                id: { communicationUserId: patientUserId },
                displayName: patientName
              }
            ]
          };
    
          const createChatThreadResult = await newChatClient.createChatThread(
            createChatThreadRequest,
            createChatThreadOptions
          );


          const threadId = createChatThreadResult.chatThread.id;
          let chatThreadClient = newChatClient.getChatThreadClient(threadId);
          setChatThreadClient(chatThreadClient)

    
        } catch (err) {
          console.error('Error initializing chat:', err);
        }
      };
    
      initializeChat();

    //   setTimeout(() => {
    //     curr = providerUserId; 
    //     console.log("Current user ID changed to:", curr);
    // }, 3000);
    }, []);

    //modify this to just send message base on current userID
    async function sendMessage(senderId:string, messageContent:string) {

      if(chatThreadClient){
          const messageOptions = {
            senderId: senderId,
            content: messageContent
        };
        const messageId = await chatThreadClient.sendMessage(messageOptions);

        return messageId;
      }
      return 'N/A';
  }

 const onSend = useCallback(async (messages: IMessage[] = []) => {
  for (const message of messages) {
  
    const sentMessage: IMessage = {
      _id: Math.round(Math.random() * 1000000),
      text: message.text,
      createdAt: new Date(),
      user: {
        
        _id: curr,
        name: curr === patientUserId ? patientName : 'Provider', 
      },
    };

 
    setMessages(previousMessages => GiftedChat.append(previousMessages, [sentMessage]));

  
    const res = sendMessage(curr, message.text);
  }
  curr = curr===providerUserId? patientUserId:providerUserId;
  console.log(curr===providerUserId)
}, []); 

  if (!chatClient) {
      return <View><Text>Loading chat...</Text></View>;
  }




  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: curr,
      }}
      textInputStyle={{color: 'black'}}
    />
  );
}
