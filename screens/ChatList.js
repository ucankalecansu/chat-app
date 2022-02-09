import React,{useState} from "react";
import {Text,View} from "react-native";
import {List, Avatar,Button, Divider, FAB,Portal,Dialog} from "react-native-paper";
import {TextInput} from "react-native-paper";

export default function ChatList(){
    const [isDialogVisible,setIsDialogVisible]=useState(false);
    return(
       <View style={{flex:1}}>
           <List.Item
           title={"User Name"}
           description={"Hi,I will be waiting for you"}
           left={()=><Avatar.Text label={"UN"} size={56} />}
           />
           <Divider inset/>

           <Portal>
               <Dialog visible={isDialogVisible} onDismiss={()=> setIsDialogVisible(false)}>
                   <Dialog.Title>New Chat</Dialog.Title>
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