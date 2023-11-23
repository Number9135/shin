import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import { auth, firebase_db } from '../../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/AuthSlice';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import InfoCard from '../forms/InfoCard';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import MenuCard from '../forms/MenuCard';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const MainScreen = () => {
  const navigation =useNavigation();
  const dispatch = useDispatch();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  let isNotificationScheduled = false;
  const [ isData, setIsData ] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

    useEffect(()=>{
      firebase_db.ref('userInfo').on('value', (snapshot)=>{
        const data = snapshot.val();
        Object.keys(data).forEach(key => {
          const checkDate = data[key].CheckDate;
          console.log('Check', checkDate)
          const currentDate = new Date();
          const checkDateArr = checkDate.split("-");
          const newCheckDate = new Date(checkDateArr[0], checkDateArr[1]-1, checkDateArr[2]);
          const oneYearLater = new Date(newCheckDate.getFullYear()+1, newCheckDate.getMonth(), newCheckDate.getDate());
          const compareDate = moment(oneYearLater).diff(currentDate, 'days');
          
          if(compareDate === 7 && !isNotificationScheduled){
            firebase_db.ref('oneYearUser').child(key).update(data[key]);
            schedulePushNotification();
            isNotificationScheduled = true;
            setIsData(true)
          } else {
            console.log('아직 대상자가 없습니다.');
            setIsData(false)
          }
        });
      });
    }, []);
    
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
          if(user){
          firebase_db.ref('users/' + auth.currentUser.uid + '/profile')
          .once('value').then((snapshot)=>{
            let data = snapshot.val();
            let userData = {
              isName : data.UserName,
              isEmail : data.UserEmail,
              isPassword : data.Password,

            }
            console.log('userData :', userData)
            dispatch(loginSuccess({
                userName : userData.isName,
                userEmail : userData.isEmail,
                password : userData.isPassword,
                loginState : true,
            }))
          })
        }else{
          console.log('로그아웃')
            dispatch(loginSuccess({
              userName : '',
              userEmail : '',
              password : '',
              loginState : false,
            }))
        }
      })
      })


  return (
    <View style={styles.container}>
      <Image style={styles.imgStyle} resizeMode='cover' source={require('../../assets/headerImg.jpg')}/>
      <InfoCard/>
     <View style={[styles.existContainer, isData ? {backgroundColor:"cornsilk"}:{backgroundColor:"darkgray"}]}>
        {
          isData ? (
            <Text style={styles.fontText}>현재 신청예정자가 있습니다.</Text>
          ) : (
            <Text style={styles.fontText}>현재 신청예정자가 없습니다.</Text>
          )
        }
     </View>
     <MenuCard/>
    </View>
  )
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "치료복 신청예정자가 있습니다.",
      body: '지금 탭하여 확인 해 보세요.',
      
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default MainScreen

const styles = StyleSheet.create({
  container : {
    alignItems : 'center'
  },

  existContainer : {
    height : hp('8%'),
    width : wp('95%'),
    marginVertical : 20,
    borderRadius : 5, 
    elevation : 3,
    justifyContent : 'center',
    alignItems  : 'center'
  },

  fontText : {
    fontSize : wp('4%')
  },

  imgStyle : {
    height : hp('25%'),
    width : wp('100%'),
    borderBottomRightRadius : 30,
    borderBottomLeftRadius : 30,
  }
})
