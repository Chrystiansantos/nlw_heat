import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api } from '../service/api';

interface IUser {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

interface IAuthContextData {
  user: IUser | null;
  isSignIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface IAuthResponse {
  token: string;
  user: IUser;
}

interface IAuthorizationResponse {
  params: {
    code?: string;
    eerror?: string;
  };
  type?: string;
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
  children: ReactNode;
}

const CLIENT_ID = '559ab0571a664822494b';
const SCOPE = 'user';
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);

  const authUrl = `http://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

  useEffect(() => {
    const loadUserStorageData = async () => {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);
      if (userStorage && tokenStorage) {
        api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage));
      }
      setIsSignIn(false);
    };
    loadUserStorageData();
  }, []);

  const signIn = async () => {
    try {
      setIsSignIn(true);
      const authSessionResponse = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizationResponse;

      if (
        authSessionResponse.type === 'success' &&
        authSessionResponse.params.eerror !== 'access_denied'
      ) {
        const { data } = await api.post<IAuthResponse>('/authenticate', {
          code: authSessionResponse.params.code,
        });
        const { token, user: userResponse } = data;
        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(userResponse));
        await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token));
        setUser(userResponse);
      }
      setIsSignIn(false);
    } catch (error) {
      Alert.alert('Não foi possível se autenticar tente mais tarde');
    }
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  };

  return (
    <AuthContext.Provider value={{ isSignIn, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
