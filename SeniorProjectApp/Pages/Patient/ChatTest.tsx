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
        }).catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        if (communicationId) {
            getCommunicationToken(communicationId).then(res => {
                setAccessToken(res);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [communicationId]);

    useEffect(() => {
        if (accessToken && communicationId) {
            getChatThread(communicationId).then(res => {
                setChatThreadId(res);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [accessToken, communicationId]);

    useEffect(() => {
        if (chatThreadId && accessToken) {
            getMessage(chatThreadId, accessToken).then(res => {
                console.log(res.value);
                setChatMessage(res.value);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [chatThreadId, accessToken]);


    return <View/>;
}
