import {Text, View, StyleSheet} from 'react-native';
import {ChatThreadClient} from '@azure/communication-chat';
import React, {useEffect, useState} from 'react';
import {getParticipantInThread} from '../BackEndFunctionCall/ChatFunctions/Message';

export default function ContactCard({
  chatThreadClient,
  patientCommunicationID,
}: {
  chatThreadClient: ChatThreadClient;
  patientCommunicationID: string;
}): React.JSX.Element {
  const [providerName, setProviderName] = useState<string | undefined>('');

  useEffect(
    () => {
      getParticipantInThread(chatThreadClient, patientCommunicationID).then(
        setProviderName,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
