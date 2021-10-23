import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import styles from './styles.module.scss';
import logoImg from '../../../assets/logo.svg';
import { api } from '../../services/api';

interface IMessage {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const messagesQueue: IMessage[] = [];

const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage: IMessage) => {
  messagesQueue.push(newMessage);
});

export const MessageList = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const timmer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(oldValue =>
          [messagesQueue[0], oldValue[0], oldValue[1]].filter(Boolean),
        );
        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    async function getTreeMessage() {
      const { data } = await api.get<IMessage[]>('/messages/last3');
      setMessages(data);
    }

    getTreeMessage();
  }, []);

  return (
    <div className={styles.messaListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />
      <ul className={styles.messageList}>
        {messages.map(message => (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>{message.text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
