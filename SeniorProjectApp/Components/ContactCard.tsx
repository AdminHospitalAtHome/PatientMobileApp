import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Circle} from 'react-native-svg';
import {ChatThreadClient} from "@azure/communication-chat";

export default function ContactCard({chatThreadClient}: {chatThreadClient: ChatThreadClient}): JSX.Element {

  return (
    <View>
      <Text>HELLO</Text>
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
