import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Screens
import iniciScreen from './screens/IniciScreen';
import ajudaScreen from './screens/AjudaScreen';
import tablaScreen from './screens/TablaScreen';

//Screen names
const iniciName = "Inici";
const ajudaName = "Ajuda";
const tablaName = "Dades";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={iniciName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === iniciName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === ajudaName) {
              iconName = focused ? 'help-circle-outline' : 'help-circle-outline';
            
            } else if (rn === tablaName) {
              iconName = focused ? 'list' : 'list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
          tabBarStyle: { padding: 10, height: 70 }
        })}
      >
        <Tab.Screen name={iniciName} component={iniciScreen} />
        <Tab.Screen name={tablaName} component={tablaScreen} />
        <Tab.Screen name={ajudaName} component={ajudaScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>

  );
}

export default MainContainer;