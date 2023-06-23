import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import PapadList from './src/screens/PapadList';
import EditPapad from './src/screens/EditPapad';
import AddPapad from './src/screens/AddPapad';

const Stack = createNativeStackNavigator()

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PapadList"
          component={PapadList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditPapad"
          component={EditPapad}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddPapad"
          component={AddPapad}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
