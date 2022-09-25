import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import layout from '../theme/layout';
import FormContent from '../components/FormContent';




function FormScreen() {
    const isDarkMode = useColorScheme() === 'dark';

    const [branch, setBranch] = useState("");
    const [agentName, setAgentName] = useState("");
    const [agentId, setAgentId] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [transactionStatus, setTransactionStatus] = useState("");
    const [accountNumber, setAccountNumber] = useState("")
    const [accountName, setAccountName] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionReference, setTransactionReference] = useState("");
    const [transactionDateTime, setTransactionDateTime] = useState("");
    const [depositorName, setDepositorName] = useState("");
    const [description, setDescription] = useState(""); 

    const subFuncBranch = text => setBranch(text);
    const subFuncAgentName = text => setAgentName(text);
    const subFuncAgentId = text => setAgentId(text);
    const subFuncTransactionType = text => setTransactionType(text);
    const subFuncTransactionStatus = text => setTransactionStatus(text);
    const subFuncAccountNumber = text => setAccountNumber(text);
    const subFuncAccountName = text =>setAccountName(text);
    const subFuncTransactionAmount = text => setTransactionAmount(text);
    const subFuncTransactionReference = text => setTransactionReference(text);
    const subFuncTransactionDateTime = text => setTransactionDateTime(text);
    const subFuncDepositorName = text => setDepositorName(text);
    const subFuncDescription = text => setDescription(text);

    
    var FORM_CONTENT_OBJ = [
        { label: 'Branch Name', value: branch, 'func': text => subFuncBranch(text)},
        { label: 'Agent Name', value: agentName, 'func': text => subFuncAgentName(text)},
        { label: 'Agent ID', value: agentId, 'func': text => subFuncAgentId(text)},
        { label: 'Transaction Type', value: transactionType, 'func': text => subFuncTransactionType(text)  },
        { label: 'Transaction Status', value: transactionStatus, 'func': text => subFuncTransactionStatus(text) },
        { label: 'Acount Number', value: accountNumber, 'func': text => subFuncAccountNumber(text) },
        { label: 'Account Name', value: accountName, 'func': text => subFuncAccountName(text) },
        { label: 'Transaction Amount', value: transactionAmount, 'func': text => subFuncTransactionAmount(text) },
        { label: 'Transaction Ref', value: transactionReference, 'func': text => subFuncTransactionReference(text) },
        { label: 'Transaction Date', value: transactionDateTime, 'func': text => subFuncTransactionDateTime(text) },
        { label: 'Depositor Name', value: depositorName, 'func': text => subFuncDepositorName(text) },
        { label: 'Description', value: description, 'func': text => subFuncDescription(text) }
    ]

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white, }}>
            {FORM_CONTENT_OBJ.map((element, index) => { return <FormContent key={index} label={element.label} value={element.value} passData={element['func']} /> })}
            <View style={{ width: '60%', alignSelf: 'center', padding: layout.padding.large, borderRadius: layout.radius.regular }}>
                <Button title="Print"
                    onPress={() => {
                        return (Alert.alert('Printing the receipt now... Press ok to close this dialog'));
                    }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});
export default FormScreen;