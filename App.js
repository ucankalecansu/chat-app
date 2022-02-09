import React, {useEffect} from "react";
import {Text,View} from 'react-native';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChatList from "./screens/ChatList";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Settings from "./screens/Settings";
import {Ionicons} from "@expo/vector-icons";
import Chat from "./screens/Chat";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import {Provider} from "react-native-paper";
import firebase from "firebase/compat";
import "firebase/auth";
import "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyBZG9vm5Oa6iPvF8C7hZOZ5KRlHWco6bTY",
    authDomain: "chat-app-68dd0.firebaseapp.com",
    projectId: "chat-app-68dd0",
    storageBucket: "chat-app-68dd0.appspot.com",
    messagingSenderId: "805399779913",
    appId: "1:805399779913:web:7524bf95a5bf09c9997d98"
};
let app;
app= firebase.initializeApp(firebaseConfig);

const Stack= createNativeStackNavigator();
const Tabs= createBottomTabNavigator();



const TabNavigator=()=>{
    const navigation=useNavigation();
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
            if(!user){
                navigation.navigate("SignUp");
            }
        });
    },[])
    return(

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
}

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
                  <Stack.Screen
                      name={"Login"}
                      component={Login}
                      options={{presentation:"fullScreenModal"}}
                  />
                  <Stack.Screen
                      name={"SignUp"}
                      component={SignUp}
                      options={{
                      presentation:"fullScreenModal"}}/>

              </Stack.Navigator>
          </Provider>


      </NavigationContainer>


  );
}


