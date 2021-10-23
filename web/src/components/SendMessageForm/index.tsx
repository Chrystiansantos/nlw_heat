import { FormEvent, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { useAuth } from '../../context/auth';
import { api } from '../../services/api';
import styles from './styles.module.scss';

export const SendMessageForm = () => {
  const { user, signOut } = useAuth();
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    // debugger;
    if (!message.trim()) return;

    await api.post('messages', { message });
    setMessage('');
  };

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} type="button" className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>
      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" /> {user?.login}
        </span>
      </header>
      <form className={styles.sendMessageForm} onSubmit={handleSendMessage}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          onChange={event => setMessage(event.target.value)}
          placeholder="Qual sua expectativa para o evento"
          value={message}
        />
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
};
