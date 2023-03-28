import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Screens
import iniciScreen from './screens/IniciScreen';
import dadesScreen from './screens/DadesScreen.js';
import ajudaScreen from './screens/AjudaScreen';
import Tabla from './screens/Tabla';

//Screen names
const iniciName = "Inici";
const dadesName = "Dades";
const ajudaName = "Ajuda";
const Tablaname = "Tabla";

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

            } else if (rn === dadesName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === ajudaName) {
              iconName = focused ? 'information-circle-outline' : 'information-circle-outline';
            
            } else if (rn === Tablaname) {
              iconName = focused ? 'information-circle-outline' : 'information-circle-outline';
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
        <Tab.Screen name={dadesName} component={dadesScreen} />
        <Tab.Screen name={ajudaName} component={ajudaScreen} />
        <Tab.Screen name={Tablaname} component={Tabla} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}

export default MainContainer;