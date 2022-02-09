import React, {useState} from "react";
import {Text,View,} from "react-native";
import {TextInput, Button, Subheading} from "react-native-paper"
import firebase from "firebase/compat";
import {useNavigation} from "@react-navigation/native";


export default function SignUp(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const  [error,setError]=useState('');

    const navigation=useNavigation();

    const createAccount=async ()=>{
        setIsLoading(true)
        try {
            const response=await
                firebase.auth().createUserWithEmailAndPassword(email,password);

            await response.user.updateProfile({displayName:name});
            navigation.popToTop();

        }
        catch (e){
            setIsLoading(false);
            setError(e.message)
        }
    };

    return(
        <View>
            <TextInput
                placeholder={"Ad Soyad"}
                style={{margin:10}}
                value={name}
                onChangeText={text=>setName(text)}
            />
            <TextInput
                placeholder={"Email"}

                style={{margin:10}}
                value={email}
                onChangeText={text=>setEmail(text)}
            />
            <TextInput
                placeholder={"Şifre"}
                style={{margin:10}}
                value={password}
                onChangeText={text=>setPassword(text)}
                secureTextEntry
            />
            {
                !!error && (
                    <Subheading
                        style={{color:"red",textAlign:"center",
                            marginBottom:16}}>{error}</Subheading>
                )
            }

            <View
                style={{flexDirection:'row',
                    justifyContent:'space-around',
                    marginTop:16}}>
                <Button mode={"contained"}
                        onPress={()=> navigation.navigate("Login") }
                        loading={isLoading}
                >Giriş Yap</Button>
                <Button mode={"contained"}
                        onPress={()=> createAccount()}
                        loading={isLoading}
                >Kayıt Ol</Button>
            </View>



        </View>
    )
}