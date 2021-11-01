import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { io } from 'socket.io-client';
import { api } from '../../service/api';
import { IMessage, Message } from '../Message';
import { styles } from './styles';

const socket = io(String(api.defaults.baseURL));

const messagesQueue: IMessage[] = [];

socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage);
  console.log(newMessage);
});

export const MessageList = () => {
  const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const fetchMessage = async () => {
      const { data } = await api.get<IMessage[]>('/messages/last3');
      setCurrentMessages(data);
    };
    fetchMessage();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length) {
        setCurrentMessages(oldState => [
          messagesQueue[0],
          oldState[0],
          oldState[1],
        ]);
        messagesQueue.shift();
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map(message => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  );
};
