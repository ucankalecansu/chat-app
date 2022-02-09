import React, {useState, useEffect} from "react";
import {View} from "react-native";
import {List, Avatar,Button, Divider, FAB,Portal,Dialog} from "react-native-paper";
import {TextInput} from "react-native-paper";
import firebase from "firebase/compat";
import {useNavigation} from "@react-navigation/native";

export default function ChatList(){
    const [isDialogVisible,setIsDialogVisible]=useState(false);
    const [email,setEmail]=useState("");
    const [userEmail,setUserEmail]=useState("");
    const[isLoading,setIsLoading]=useState(false);
    const [chats,setChats]=useState([]);

    const navigation=useNavigation();


    useEffect(()=>{
       firebase.auth().onAuthStateChanged(user=> {
           setEmail(user?.email ?? "")

       })

    },[])

    const createChat=async ()=>{
        if(!email || !userEmail) return;
        setIsLoading(true);
       const response=await firebase.firestore().collection("chats").add({
            users:[email,userEmail]
        });
        setIsLoading(false);
        setIsDialogVisible(false);
        navigation.navigate("Chat", {chatId:response.id});
    };

    useEffect(()=>{
        return firebase.firestore()
            .collection("chats")
            .where('users','array-contains',email)
            .onSnapshot((querySnapshot)=>{
                setChats(querySnapshot.docs);

            })
    },[email])
    return(
       <View style={{flex:1}}>
           {chats.map((chat)=>(
               <React.Fragment>ß
                   <List.Item
                       title={chat.data().users.find(x=> x !==email )}
                       description={(chat.data().messages ?? [])[0]?.text ?? undefined}
                       left={()=><Avatar.Text
                           label={chat.data()
                               .users.find(x=> x !==email )
                               .split(' ').reduce((prev,current)=>(prev + current[0]).toLocaleUpperCase(),'')}
                           size={56} />}

                       onPress={()=>navigation.navigate("Chat",{chatId:chat.id})}
                   />
                   <Divider inset/>
               </React.Fragment>
           ))}


           <Portal>
               <Dialog visible={isDialogVisible} onDismiss={()=> setIsDialogVisible(false)}>
                   <Dialog.Title>Yeni Sohbet</Dialog.Title>
                   <Dialog.Content>
                       <TextInput
                           label={"Konuşmak istediğiniz telefon numarasını giriniz."}
                           value={userEmail}
                           onChangeText={(text)=>setUserEmail(text)}

                       />
                   </Dialog.Content>
                   <Dialog.Actions>
                       <Button onPress={() => setIsDialogVisible(false)}>İptal</Button>
                       <Button
                           onPress={() => createChat()}
                           loading={isLoading}
                       >Kaydet</Button>
                   </Dialog.Actions>

               </Dialog>
           </Portal>
           <FAB
               icon={"plus"}
               style={{position:'absolute',bottom:16, right:16}}
               onPress={()=>setIsDialogVisible(true)}
           />
       </View>
    )
}