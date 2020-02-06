import React, { useState, useEffect } from 'react';
import { Keyboard, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  Submit,
  List,
  User,
  Name,
  Bio,
  Avatar,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default function Main() {
  const [users, setUsers] = useState([
    {
      name: 'Lucas',
      login: 'login',
      bio: 'Lorem ipsium dankdsn dnasndask aksjnd',
      avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    const storage = await AsyncStorage.getItem('users');

    setUsers(JSON.parse(storage));
    setLoading(false);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleUserSubmit = async () => {
    if (input === '') {
      return Alert.alert('Error', 'Please type in a user!');
    }
    setLoading(true);

    const response = await api.get(`/users/${input}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    const findOne = users.filter(item => {
      return item.login === data.login;
    });

    console.log(findOne);

    if (findOne.length !== 0) {
      return Alert.alert('Error!', "You can't add the same user two times!");
    }
    setUsers([...users, data]);
    setInput('');

    Keyboard.dismiss();

    return setLoading(false);
  };

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Add user"
          autoFocus={false}
          value={input}
          onChangeText={text => setInput(text)}
          returnKeyType="send"
          onSubmitEditing={handleUserSubmit}
        />
        <Submit onPress={handleUserSubmit} loading={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="plus" color="#ffff" />
          )}
        </Submit>
      </Form>
      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={() => {}}>
              <ProfileButtonText>See profile</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Users',
};
