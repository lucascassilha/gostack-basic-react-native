import React, { useState, useEffect } from 'react';
import { Keyboard, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
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

export default function Main(props) {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const loadStorage = async () => {
    AsyncStorage.clear();
    const storage = JSON.parse(await AsyncStorage.getItem('users'));
    console.log(storage);
    if (!storage) {
      setUsers([]);
    } else {
      setUsers(storage);
    }
  };

  const setItem = async () => {
    await AsyncStorage.setItem('users', JSON.stringify(users));
  };

  useEffect(() => {
    setLoading(true);
    loadStorage();
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(users);
    setItem();
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
    if (users) {
      setUsers([...users, data]);
    } else {
      setUsers(data);
    }
    setInput('');

    setLoading(false);

    return Keyboard.dismiss();
  };

  const handleNavigation = user => {
    props.navigation.navigate('User', { user });
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
          <User key={item.login}>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={() => handleNavigation(item)}>
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

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
