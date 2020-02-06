import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main/index';
import User from './pages/User/index';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
    },
    {
      defaultNavigationOptions: {
        headerBackTitle: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#333333',
        },
        headerTitleStyle: {
          color: '#fff',
          fontWeight: 'bold',
        },
      },
    },
  ),
);

export default Routes;
