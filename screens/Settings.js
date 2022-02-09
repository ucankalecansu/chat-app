import React, {useEffect, useState} from "react";
import {Text,View} from "react-native";
import {Avatar, Title, Subheading, Button} from "react-native-paper";
import firebase from "firebase/compat";


export default function Settings(){

    const[name,setName]=useState("");
    const[email,setEmail]=useState("");

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
            setName(user?.displayName ?? "")
            setEmail(user?.email ?? "")

        })
    },[])


    return(
        <View style={{alignItems:"center",marginTop:16}}>
            <Avatar.Text label={name.split(' ')
                .reduce((prev,current)=>(prev + current[0]).toLocaleUpperCase(), '')} />
            <Title>
                {name}
            </Title>
            <Subheading>
                {email}
            </Subheading>
            <Button onPress={()=> firebase.auth().signOut()}>Çıkış Yap</Button>

        </View>
    )
}