import { StyleSheet, Text, View, Image } from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import { auth, firebase_db } from '../../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/AuthSlice';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';





const MainScreen = () => {
  const navigation =useNavigation();
  const dispatch = useDispatch();

 

    useEffect(()=>{
      firebase_db.ref('userInfo').on('value', (snapshot)=>{
        const data = snapshot.val();
        Object.keys(data).forEach(key => {
          const checkDate = data[key].CheckDate;
          console.log('Check',checkDate)
          const currentDate = new Date();
          const checkDateArr = checkDate.split("-");
          const newCheckDate = new Date(checkDateArr[0], checkDateArr[1]-1, checkDateArr[2]);
          const oneYearLater = new Date(newCheckDate.getFullYear()+1, newCheckDate.getMonth(), newCheckDate.getDate());
          const compareDate = moment(oneYearLater).diff(currentDate, 'days');
          
          if(compareDate === 7){
            firebase_db.ref('oneYearUser').child(key).update(data[key]);
          
    
          } else {
            console.log('아직 대상자가 없습니다.');
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
    <View>
     
       
        <TouchableOpacity onPress={()=>navigation.navigate('테스트')}>
          <Text>Click Me!</Text>
        </TouchableOpacity>
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({})
