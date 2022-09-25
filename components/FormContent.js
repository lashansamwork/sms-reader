import React, { useEffect, useState }  from "react";
import { View, Text, TextInput } from "react-native";
import layout from "../theme/layout";

const FormContent = ({label, value, passData}) => {
    
    const[textofInput, setTextofInput] = useState("")

    // const changeHandler = text => {
    //     setTextofInput(text)
    //     passData(textofInput)
    //     console.log(text)
    // };
 

    

    return (
        <View style={{ padding: layout.padding.medium, flexDirection: 'column', alignItems: 'center', width: '100%', }}>
            <Text >{label}</Text>
            <TextInput value={value} onChangeText={passData} style={{ width: '60%', borderWidth: 1, borderRadius: layout.radius.regular }} />
        </View>
    );
}

export default FormContent;