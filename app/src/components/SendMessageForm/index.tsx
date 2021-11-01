import React, { useState } from 'react';
import { Alert, TextInput, View, Keyboard } from 'react-native';
import { api } from '../../service/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export const SendMessageForm = () => {
  const [message, setMessage] = useState<string>('');
  const [sendingMessage, setSendingMessage] = useState<boolean>(false);

  const handleMessageSubmit = async () => {
    const messageFormatted = message.trim();
    if (messageFormatted.length) {
      setSendingMessage(true);
      await api.post('/messages', { message: messageFormatted });
      setMessage('');
      Keyboard.dismiss();
      setSendingMessage(false);
      Alert.alert('Mensagem enviada com sucesso');
      return;
    }
    Alert.alert('Escreva a mensagem para enviar');
  };

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        style={styles.input}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
        returnKeyType="send"
      />
      <Button
        isLoading={sendingMessage}
        title="Enviar mensagem"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        onPress={handleMessageSubmit}
      />
    </View>
  );
};
