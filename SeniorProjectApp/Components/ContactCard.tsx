import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Circle} from 'react-native-svg';
import {ChatThreadClient} from '@azure/communication-chat';
import {useEffect, useState} from 'react';
import {getParticipantInThread} from '../BackEndFunctionCall/ChatFunctions/Message';

export default function ContactCard({
  chatThreadClient,
  patientCommunicationID,
}: {
  chatThreadClient: ChatThreadClient;
  patientCommunicationID: string;
}): JSX.Element {
  const [providerName, setProviderName] = useState<string | undefined>('');

  //@ts-ignore
  useEffect(
    () => {
      getParticipantInThread(chatThreadClient, patientCommunicationID).then(
        setProviderName,
      );
      //@ts-ignore
    },
    //@ts-ignore
    [chatThreadClient],
  );

  return (
    <View>
      <Text style={styles.Name}>{providerName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Name: {
    fontSize: 20,
    color: 'black',
  },
  RecentChat: {
    color: 'black',
  },
});
