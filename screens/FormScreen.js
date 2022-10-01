import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import layout from '../theme/layout';
import FormContent from '../components/FormContent';
import {Button, Text} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

function FormScreen({ smsInfo = 
    {   
        type: null, 
        status: null, 
        amount: null, 
        account: null, 
        ref: null,
        date: null 
    }, onFormComplete 
}) {
  const [branch, setBranch] = useState('');
  const [company, setCompany] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentId, setAgentId] = useState('');
  const [transactionType, setTransactionType] = useState(smsInfo.type);
  const [transactionStatus, setTransactionStatus] = useState(smsInfo.status);
  const [accountNumber, setAccountNumber] = useState(smsInfo.account);
  const [accountName, setAccountName] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(smsInfo.amount);
  const [transactionReference, setTransactionReference] = useState(smsInfo.ref);
  const [transactionDateTime, setTransactionDateTime] = useState(smsInfo.date);
  const [depositorName, setDepositorName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [errorString, setErrorString] = useState('');

  const subFuncBranch = text => setBranch(text);
  const subFuncCompany= text => setCompany(text);
  const subFuncAgentName = text => setAgentName(text);
  const subFuncAgentId = text => setAgentId(text);
  const subFuncTransactionType = text => setTransactionType(text);
  const subFuncTransactionStatus = text => setTransactionStatus(text);
  const subFuncAccountNumber = text => setAccountNumber(text);
  const subFuncAccountName = text => setAccountName(text);
  const subFuncTransactionAmount = text => setTransactionAmount(text);
  const subFuncTransactionReference = text => setTransactionReference(text);
  const subFuncTransactionDateTime = text => setTransactionDateTime(text);
  // const subFuncDepositorName = text => setDepositorName(text);
  // const subFuncDescription = text => setDescription(text);

  var FORM_CONTENT_OBJ = [
    {
      label: 'Branch Name', 
      value: branch, 
      func: text => subFuncBranch(text)
    },
    {
      label: 'Company Name', 
      value: company, 
      func: text => subFuncCompany(text)
    },
    {
      label: 'Agent Name',
      value: agentName,
      func: text => subFuncAgentName(text),
    },
    {
      label: 'Agent ID', 
      value: agentId, 
      func: text => subFuncAgentId(text)
    },
    {
      label: 'Transaction Type',
      value: transactionType,
      func: text => subFuncTransactionType(text),
      options: ['Deposit', 'Withdrawal'],
      isDisabled: true
    },
    {
      label: 'Transaction Status',
      value: transactionStatus,
      func: text => subFuncTransactionStatus(text),
      options: ['Successful', 'Failed'],
      isDisabled: true
    },
    {isDivider: true},
    {
      label: 'Account Number',
      value: accountNumber,
      func: text => subFuncAccountNumber(text),
      isDisabled: true
    },
    // {
    //   label: 'Account Name',
    //   value: accountName,
    //   func: text => subFuncAccountName(text),
    // },
    {
      label: 'Transaction Amount',
      value: transactionAmount,
      func: text => subFuncTransactionAmount(text),
      isDisabled: true
    },
    {
      label: 'Transaction Ref',
      value: transactionReference,
      func: text => subFuncTransactionReference(text),
      isDisabled: true
    },
    {
      label: 'Transaction Date',
      value: transactionDateTime,
      func: text => subFuncTransactionDateTime(text),
      isDisabled: true
    },
    {isDivider: true},
    // {
    //   label: 'Depositor Name',
    //   value: depositorName,
    //   func: text => subFuncDepositorName(text),
    // },
    // {
    //   label: 'Description',
    //   value: description,
    //   func: text => subFuncDescription(text),
    // },
    // {isDivider: true},
  ];

  const errorTextIndex = {
    branch: 'Branch',
    company: 'Company',
    agentName: 'Agent Name',
    agentId: 'Agent ID',
    transactionType: 'Transaction Type',
    transactionStatus: 'Transaction Status',
    accountNumber: 'Account Number',
    // accountName: 'Account Name',
    transactionAmount: 'Transaction Amount',
    transactionReference: 'Transaction Reference',
    transactionDateTime: 'Transaction Date & Time',
    // depositorName: 'Depositor Name',
    // description: 'Description',
    imageUri: 'Receipt Logo',
  };

  const validateBeforePrint = () => {
    setErrorString('');
    const errors = [];
    console.log('tadaaa');
    const dataGathered = {
      branch,
      company,
      agentName,
      agentId,
      transactionType,
      transactionStatus,
      accountNumber,
      // accountName,
      transactionAmount,
      transactionReference,
      transactionDateTime,
      // depositorName,
      // description,
      imageUri,
    };

    for (const [key, value] of Object.entries(dataGathered)) {
      if (!value) {
        errors.push(`${errorTextIndex[key]} cannot be empty`);
      }
    }

    if (errors.length === 0) {
        onFormComplete(dataGathered);
    } else {
      setErrorString(errors.join('\r\n'));
    }
  };

  const onUploadImagePress = () => {
    launchImageLibrary({mediaType: 'photo'}, resObject => {
      setImageUri(resObject.uri);
    });
  };

  return (
    <View
      style={{backgroundColor: 'transparent', padding: layout.padding.large}}>
      {!!imageUri ? (
        <TouchableOpacity onPress={onUploadImagePress}>
          <Image
            source={{uri: imageUri}}
            style={{
              width: '80%',
              aspectRatio: 1,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      ) : (
        <Button
          icon="file-image"
          mode="contained"
          onPress={onUploadImagePress}
          style={{marginTop: layout.padding.large}}>
          Upload Receipt Image
        </Button>
      )}
      {FORM_CONTENT_OBJ.map((element, index) => {
        return (
          <FormContent
            key={index}
            label={element.label}
            value={element.value}
            passData={element['func']}
            isDivider={element.isDivider}
            options={element.options}
            isDisabled={element.isDisabled}
          />
        );
      })}
      <Text variant="bodySmall" style={{ color: 'red', marginBottom: layout.padding.large}} >
        {errorString}
     </Text>
      <Button
        icon="printer"
        mode="contained"
        onPress={validateBeforePrint}
        style={{ marginBottom: layout.padding.large }}
    >
        Print
      </Button>
    </View>
  );
}
export default FormScreen;
