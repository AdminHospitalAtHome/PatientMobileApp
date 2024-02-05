import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ContactCard from '../../../Components/ContactCard';
import {ChatClient, ChatThreadClient} from '@azure/communication-chat';
import {useEffect, useState} from 'react';
import {
  getAllThreads,
  initChatClient,
  temp_communicationId,
} from '../../../BackEndFunctionCall/ChatFunctions/Message';

const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').width;
export default function ChatContactPage({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const patientID = 100000001;
  const [chatClient, setChatClient] = useState<ChatClient | undefined>(
    undefined,
  );
  const [threadClients, setThreadClients] = useState<ChatThreadClient[]>([]);

  useEffect(() => {
    initChatClient(patientID).then(res => {
      setChatClient(res);
      // getCommunicationToken(temp_communicationId).then(setCommunicationToken)
    });
  }, []);

  useEffect(() => {
    if (chatClient) {
      getAllThreads(chatClient).then(res => {
        setThreadClients(res);
      });
    }
  }, [chatClient]);

  return (
    <View>
      <ScrollView contentContainerStyle={{alignItems: 'center', padding: 10}}>
        {threadClients.map(threadClient => {
          return (
            <TouchableOpacity
              key={threadClient.threadId}
              style={styles.card}
              onPress={() =>
                navigation.navigate('azureChatPage', {
                  threadClient: threadClient,
                  communicationID: temp_communicationId,
                })
              }>
              <ContactCard
                chatThreadClient={threadClient}
                patientCommunicationID={temp_communicationId}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.18,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
});
