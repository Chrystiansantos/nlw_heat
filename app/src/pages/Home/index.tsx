import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { MotiView } from 'moti';
import { Header } from '../../components/Header';
import { MessageList } from '../../components/MessageList';
import { SendMessageForm } from '../../components/SendMessageForm';
import { SignInBox } from '../../components/SignInBox';

import { styles } from './styles';
import { useAuth } from '../../hooks/auth';

export const Home = () => {
  const { user } = useAuth();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Header />
        <MessageList />

        {user ? (
          <MotiView
            from={{ opacity: 0, translateY: 200 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 700 }}
          >
            <SendMessageForm />
          </MotiView>
        ) : (
          <SignInBox />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
