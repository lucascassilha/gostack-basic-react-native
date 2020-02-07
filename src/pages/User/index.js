import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Bio,
  Name,
  List,
  Holder,
  GitImage,
  Title,
  Owner,
  TextHolder,
} from './styles';

export default function User(props) {
  const [starred, setStarred] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const user = props.navigation.getParam('user');

  const loadApi = async () => {
    setLoading(true);
    const response = await api.get(`/users/${user.login}/starred`);

    setStarred(response.data);
    setLoading(false);
  };
  useEffect(() => {
    loadApi();
  }, []);

  const refreshList = async () => {
    setLoading(true);

    const response = await api.get(`/users/${user.login}/starred`);

    setStarred(response.data);

    setLoading(false);
  };

  const openRepo = item => {
    const data = {
      url: item.html_url,
      name: item.name,
    };

    props.navigation.navigate('Repo', { data });
  };

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      {loading ? (
        <ActivityIndicator color="black" size={25} />
      ) : (
        <List
          data={starred}
          onEndReachedThreshold={0.2}
          onRefresh={refreshList}
          refreshing={loading}
          keyExtractor={item => item.fullname}
          renderItem={({ item }) => (
            <Holder key={item.fullname} onPress={() => openRepo(item)}>
              <GitImage source={{ uri: item.owner.avatar_url }} />
              <TextHolder>
                <Title>{item.name}</Title>
                <Owner>{item.owner.login}</Owner>
              </TextHolder>
            </Holder>
          )}
        />
      )}
    </Container>
  );
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
