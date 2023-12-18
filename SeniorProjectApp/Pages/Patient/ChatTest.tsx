import {View} from 'react-native';
import {
    getChatThread,
    getCommunicationId,
    getCommunicationToken,
    getMessage
} from '../../BackEndFunctionCall/ChatFunctions/Message';
import {useEffect, useState} from 'react';

export default function ChatTest(): JSX.Element {
    const [accessToken, setAccessToken] = useState('');
    const [communicationId, setCommunicationId] = useState('');
    const [chatThreadId, setChatThreadId] = useState('');
    const [chatMessage, setChatMessage] = useState([]);
    
    useEffect(() => {
        getCommunicationId(300000001).then(res => {
            setCommunicationId(res);
            return res;
        }).then(communicationId => {
            return getCommunicationToken(communicationId);
        }).then(res => {
            setAccessToken(res);
            return res;
        }).then(accessToken => {
            return getChatThread(communicationId);
        }).then(res => {
            setChatThreadId(res);
            return res;
        }).then(chatThreadId => {
            getMessage(chatThreadId, accessToken).then(res => {
                console.log(res.value);
                setChatMessage(res.value)
            });
        }).catch(error => {
            console.error(error)
        });
    }, []);

    return <View/>;
}
