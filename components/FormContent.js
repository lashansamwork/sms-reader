import React from "react";
import { View, Text, TextInput } from "react-native";
import layout from "../theme/layout";

const FormContent = ({label, onChange, value }) => {
    return (
        <View
            style={{
                padding: layout.padding.medium,
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}>
            <Text >{label}</Text>
            <TextInput value={value} onChange={onChange} style={{ width: '60%', borderWidth: 1, borderRadius: layout.radius.regular }} />
        </View>
    );
}

export default FormContent;