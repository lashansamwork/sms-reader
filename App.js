/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  PermissionsAndroid,
  View,
  Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Appbar, Text, ActivityIndicator} from 'react-native-paper';
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import FormScreen from './screens/FormScreen';
import * as Progress from 'react-native-progress';
import RNPrint from 'react-native-print';
import SmsListener from 'react-native-android-sms-listener';
import layout from './theme/layout';
TOP_APPBAR_HEIGHT = 80;

const App = () => {
  const {top} = useSafeAreaInsets();
  const [receipt, setReceipt] = useState({});
  const [loading, setLoading] = useState(false); 
  let SmsListenerSub = null;

  async function getPermission() {
    const readPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'Receive SMS',
        message: 'Need access to receive sms, to get receipt info',
      },
    );

    const receivePermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      {
        title: 'Receive SMS',
        message: 'Need access to receive sms, to get receipt info',
      },
    );

    return [readPermission, receivePermission];
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function extractSms(message) {
    try {
      const setReceiptObject = {};
      if (message.includes('withdrawal')) {
        const splitMessage = message.split(' ');
        setReceiptObject.type = 'Withdrawal';
        setReceiptObject.status = capitalizeFirstLetter(
          splitMessage[2].slice(0, -1),
        );
        setReceiptObject.amount = splitMessage[5];
        setReceiptObject.account = splitMessage[8].slice(0, -1);
        setReceiptObject.ref = splitMessage[10].slice(0, -1);
        setReceiptObject.date = splitMessage[11].slice(0, -1);
        setReceipt(setReceiptObject);
        setTimeout(()=>{
          setLoading(false);
        }, 500)
      } else if (message.includes('deposited')) {
        const splitMessage = message.split(' ');
        setReceiptObject.type = 'Deposit';
        setReceiptObject.status = capitalizeFirstLetter(splitMessage[2]);
        setReceiptObject.amount = splitMessage[1];
        setReceiptObject.account = splitMessage[7];
        setReceiptObject.ref = splitMessage[21];
        setReceiptObject.date = splitMessage[11];
        setReceipt(setReceiptObject);
        setTimeout(()=>{
          setLoading(false);
        }, 500)
      }
    } catch (error) {
      console.log('🚀 ~ file: App.js ~ line 96 ~ extractSms ~ error', error);
    }
  }

  async function listenSms() {
    try {
      const resp = await getPermission();
      return SmsListener.addListener(message => {
        setLoading(true);
        extractSms(message.body);
      });
    } catch (err) {
      console.log('*****************************2', err);
    }
  }

  const printHTML = async (receiptData) => {
    const html = generateReceiptHTML(receiptData);
    const res = await RNPrint.print({
      html: html,
    });
  };

  const generateReceiptHTML = (receiptData) => {
    const {
      transactionType, 
      transactionStatus, 
      transactionAmount, 
      accountNumber, 
      transactionReference, 
      transactionDateTime, 
      imageUri,
      // description,
      // depositorName,
      branch,
      company,
      agentName,
      agentId,
      // accountName
    } = receiptData;

    console.log(
      '🚀 ~ file: App.js ~ line 192 ~ generateReceiptHTML ~ receipt',
      receipt,
    );

    const htmlString = `<p style="text-align: center;"><img style="object-fit: contain;" src="${imageUri}" alt="" width="173" height="173" /></p>
        <p style="text-align: center;">${branch}</p>
        <p style="text-align: center;">${agentName}</p>
        <p style="text-align: center;">Agent ID: ${agentId}</p>
        <div style="background-color: black;">
        <h2 style="text-align: center; color: white;">RECEIPT</h2>
        </div>
        <div>&nbsp;Transaction Type</div>
        <div>&nbsp;</div>
        <div style="border: 1px black solid;">
        <h2 style="text-align: center; margin: 5px;">${transactionType}</h2>
        </div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>Transaction Status</div>
        <div>&nbsp;</div>
        <div style="border: 1px black solid;">
        <h2 style="text-align: center; margin: 5px;">${transactionStatus}</h2>
        </div>
        <div>&nbsp;</div>
        <div>&nbsp;
        <table style="height: 54px;" width="100%">
        <tbody>
        <tr>
        <td style="width: 50%;">
        <p>Account Number:</p>
        <p>Amount:</p>
        <p>Reference:</p>
        <p>Time:</p>
        <p>&nbsp;</p>
        </td>
        <td style="width: 50%;">
        <p style="text-align: right;">${accountNumber}</p>
        <p style="text-align: right;">TZS ${transactionAmount}</p>
        <p style="text-align: right;">${transactionReference}</p>
        <p style="text-align: right;">${transactionDateTime}</p>
        <p style="text-align: right;">&nbsp;</p>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="background-color: black; height: 2px;">&nbsp;</div>
        <p style="text-align: center;"><strong>THANK YOU FOR USING ${company}</strong></p>
        <p style="text-align: center;">AGENCY HELPDESK: 0800002002</p>`;

    return htmlString;
  };

  useEffect(() => {
    listenSms().then(sub => {
      SmsListenerSub = sub;
    });
    return () => {
      if (SmsListenerSub) {
        SmsListenerSub.remove();
      }
    };
  }, []);

  // const onFormComplete = () => {
  //   const html = generateReceiptHTML()
  // }

  return (
    <SafeAreaView style={{backgroundColor: '#0c0d0c', flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Appbar.Header safeAreaInsets={{ top: top +  layout.padding.large }} style={{ height: TOP_APPBAR_HEIGHT + top }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text variant="headlineSmall">TROVELENT RECEIPT PRINTER</Text>
        </View>
      </Appbar.Header>
      <KeyboardAwareScrollView>
        <View style={{ paddingTop: layout.padding.large, alignItems: 'center' }}>
          <Image
            style={{ width: '80%',
            height: undefined,
            aspectRatio: 681/434, resizeMode: 'contain', marginBottom: 2*layout.padding.large}}
            source={require('./theme/images/logo.png')}
          />
          <Progress.Bar 
            width={200} 
            indeterminate={true} 
            animated={true} 
            color={'#c8a265'}
            height={10}
            useNativeDriver={true}
            animationType={'timing'}
          />
          <Text variant="bodySmall" style={{ paddingTop: layout.padding.small }}>Listening to SMS Messages</Text>
        </View>
        {loading? <ActivityIndicator animating={true}/> :
          <FormScreen smsInfo={receipt} onFormComplete={printHTML}/>
        }
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
