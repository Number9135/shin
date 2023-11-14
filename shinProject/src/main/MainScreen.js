import { StyleSheet, Text, View, Image } from 'react-native';
import React, {useEffect} from 'react';
import { auth, firebase_db } from '../../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/AuthSlice';
import { TouchableOpacity } from 'react-native';


const MainScreen = () => {
    const dispatch = useDispatch();

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

      const signOut = () => {
        auth.signOut()
      }

      const manClothSize = 
      {
      "manClothSize" : 'https://firebasestorage.googleapis.com/v0/b/shinproje.appspot.com/o/%EB%82%A8%EC%9E%90.jpg?alt=media&token=19042eac-0cc3-4660-8005-cdbec41d4f38'
  }

  return (
    <View>
     
      <TouchableOpacity onPress={signOut}>
        <Image source={{uri:manClothSize.manClothSize}}/>
      </TouchableOpacity>
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({})
