import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import layout from '../theme/layout';
import FormContent from '../components/FormContent';

const LABELS = ['Transaction Type',
    'Transaction Status',
    'Transaction Amount',
    'Acount Number',
    'Transaction Ref',
    'Transaction Date',
    'Description'
]


function FormScreen() {
    const isDarkMode = useColorScheme() === 'dark';


    const [agent, setAgent] = useState("");
    const [accountNumber, setAccountNumber] = useState("")
    const [transactionStatus, setTransactionStatus] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionReference, setTransactionReference] = useState("");
    const [transactionDate, settransactionDate] = useState("");
    const [description, setDescription] = useState("");

    return (
        <View
            style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>


            <FormContent label={LABELS[0]} value={agent} onChange={e => setAgent(e.target.value)} />
            <FormContent label={LABELS[1]} value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
            <View style={{ width: '60%', alignSelf: 'center', padding: layout.padding.large, borderRadius: layout.radius.regular}}>
       
      <Button
        
        title="Print"
        onPress={() => Alert.alert('Printing the receipt now... Press ok to close this dialog')}
      />
    </View>
        </View>
    );

}

const styles = StyleSheet.create({

});
export default FormScreen;