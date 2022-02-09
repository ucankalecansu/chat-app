import React from "react";
import {Text,View} from "react-native";
import {Avatar, Title, Subheading, Button} from "react-native-paper";
import firebase from "firebase/compat";


export default function Settings(){


    return(
        <View style={{alignItems:"center",marginTop:16}}>
            <Avatar.Text label={"UN"} />
            <Title>
                User Name
            </Title>
            <Subheading>
                user@gmail.com
            </Subheading>
            <Button onPress={()=> firebase.auth().signOut()}>Çıkış Yap</Button>

        </View>
    )
}