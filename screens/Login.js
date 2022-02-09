import React, {useState} from "react";
import {Text,View,} from "react-native";
import {TextInput, Button, Subheading} from "react-native-paper"
import firebase from "firebase/compat";
import {useNavigation} from "@react-navigation/native";


export default function SignUp(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const  [error,setError]=useState('');

    const navigation=useNavigation();

    const login=async ()=>{
        setIsLoading(true)
        try {
            await firebase.auth().signInWithEmailAndPassword(email,password);

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
                        onPress={()=> {navigation.navigate("SignUp")}}
                        loading={isLoading}
                >Kayıt Ol</Button>
                <Button mode={"contained"}
                        onPress={()=> login()}
                        loading={isLoading}
                >Giriş Yap</Button>

            </View>



        </View>
    )
}