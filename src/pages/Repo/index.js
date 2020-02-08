import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

// import { Container } from './styles';

export default function Repo(props) {
  const uri = props.navigation.getParam('data').url;

  return <WebView style={{ flex: 1 }} source={{ uri }} />;
}
Repo.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('data').name,
});

Repo.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
