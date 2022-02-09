import React,{useState,useEffect} from "react";
import {View} from "react-native";
import {List, Avatar,Button, Divider, FAB,Portal,Dialog} from "react-native-paper";
import {TextInput} from "react-native-paper";
import firebase from "firebase/compat";

export default function ChatList(){
    const [isDialogVisible,setIsDialogVisible]=useState(false);
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
            setName(user?.displayName ?? "")
            setEmail(user?.email ?? "")

        })
    },[])
    return(
       <View style={{flex:1}}>
           <List.Item
           title={name}
           description={"Hi,I will be waiting for you"}
           left={()=><Avatar.Text
               label={name.split(' ')
                   .reduce((prev,current)=>(prev + current[0]).toLocaleUpperCase(), '')}
               size={56} />}
           />
           <Divider inset/>

           <Portal>
               <Dialog visible={isDialogVisible} onDismiss={()=> setIsDialogVisible(false)}>
                   <Dialog.Title>Yeni Sohbet</Dialog.Title>
                   <Dialog.Content>
                       <TextInput label={"Konuşmak istediğiniz telefon numarasını giriniz."} />
                   </Dialog.Content>
                   <Dialog.Actions>
                       <Button onPress={() => setIsDialogVisible(false)}>İptal</Button>
                       <Button onPress={() => {}}>Kaydet</Button>
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