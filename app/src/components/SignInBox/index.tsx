import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { style } from './styles';

export const SignInBox = () => {
  const { signIn, isSignIn } = useAuth();
  return (
    <View style={style.container}>
      <Button
        title="Entrar com Github"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon="github"
        onPress={signIn}
        isLoading={isSignIn}
      />
    </View>
  );
};
