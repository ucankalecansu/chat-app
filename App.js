import React from "react";
import {Text,View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChatList from "./screens/ChatList";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Settings from "./screens/Settings";
import {Ionicons} from "@expo/vector-icons";
import Chat from "./screens/Chat";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import {Provider} from "react-native-paper";


const Stack= createNativeStackNavigator();
const Tabs= createBottomTabNavigator();

const TabNavigator=()=>(
    <Tabs.Navigator>
        <Tabs.Screen
            name={"ChatList"}
            component={ChatList}
            options={({route})=>({
                tabBarIcon:({focused,color,size})=>{
                  return <Ionicons color={color} size={size} name={"chatbubbles"}/>

                },
                tabBarInactiveTintColor:"gray"
            })}
        />
        <Tabs.Screen
            name={"Settings"}
            component={Settings}
            options={({route})=>({
                tabBarIcon:({focused,color,size})=>{
                    return <Ionicons color={color} size={size} name={"settings"}/>
                },
                tabBarActiveTintColor:"tomato",
                tabBarInactiveTintColor:"gray"
            })}/>
    </Tabs.Navigator>
)

export default function App() {
  return (
      <NavigationContainer>
          <Provider>
              <Stack.Navigator>
                  <Stack.Screen
                      name={"Home"}
                      component={TabNavigator}
                      options={{headerShown:false}}/>
                  <Stack.Screen name={"Chat"} component={Chat}/>
                  <Stack.Screen name={"Login"} component={Login}/>
                  <Stack.Screen name={"SignUp"} component={SignUp}/>

              </Stack.Navigator>
          </Provider>


      </NavigationContainer>


  );
}


