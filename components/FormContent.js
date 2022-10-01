import React, { useEffect, useState }  from "react";
import { View  } from "react-native";
import { TextInput, Text, RadioButton, Divider } from 'react-native-paper';
import layout from "../theme/layout";

const FormContent = ({label, value, passData, options = null, isDivider,  isDisabled}) => {
    console.log("🚀 ~ file: FormContent.js ~ line 7 ~ FormContent ~ isDisabled", isDisabled);

    if(isDivider) {
        return <Divider style={{ marginVertical: 2*layout.padding.large}} bold/>
    } else if(options !== null) {
        return (
            <View style={{ paddingVertical: layout.padding.large, flexDirection: 'column', width: '100%', }}>
                <Text style={{ paddingBottom: layout.padding.small }}>{label}</Text>
                <RadioButton.Group onValueChange={passData} value={value}>
                    <View style={{ flex: 1, flexDirection: 'row', width: '100%'}}>
                        {options.map((option, index)=><View key={'button' + index}style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value={option} disabled={isDisabled} theme={{  colors: { onSurfaceDisabled: '#c8a265' }}}/>
                            <Text>{option}</Text>
                        </View>)}
                    </View>
                </RadioButton.Group> 
            </View>
        );
    } else {
        return (
            <View style={{ paddingVertical: layout.padding.large, flexDirection: 'column', width: '100%', }}>
                <TextInput mode="outlined" label={label} value={value} onChangeText={passData} disabled={isDisabled} style={isDisabled? { margin:  -10 } : {}} />
            </View>
        );
    }


}

export default FormContent;