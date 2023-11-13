import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, {useState, useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { auth, firebase_db } from '../../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';

const OperatingPssword = () => {
    
    const [isPassword, setIsPassword ]= useState('');
    const [comparePw, setComparePw ] = useState('');
    const [isMsg, setIsMsg] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const userEmail = useSelector((state)=>state.auth.userEmail);
    const userName = useSelector((state)=>state.auth.userName);

    const alram = () => {Alert.alert('', '비밀번호가 변경되었습니다.', [{
        text : "닫기"
    }])}

    useEffect(()=>{
        const pwRegex = new RegExp('^[a-zA-Z0-9]{6,}$|^$');
        if(isPassword.match(pwRegex)){
            setIsMsg('비번 가능')
            if(isPassword === comparePw){
                setIsMsg('비번 일치')
            }else{
                setIsMsg('비번 불일치')
            }
            
        }else{
            setIsMsg('잘못된 비번 양식')
        }
}, [isPassword, comparePw])

useEffect(()=>{
    if(isPassword.length === 0 || isMsg === '비번 불일치' || isMsg === '잘못된 비번 양식'){
        setDisabled(true)
    }else{
        setDisabled(false)
    }
})

const updatePassword = async() => {
    try{
        await firebase_db.ref('users/' + auth.currentUser.uid + '/profile')
        .update({
            Password : isPassword,
        }).then(()=>{
            dispatch(loginSuccess({
                userName : userName,
                userEmail : userEmail,
                password : isPassword,
                loginState : true,
            }))
        })
    }catch{
        console.log('err')
    }
}




  return (
    <View style={styles.passwordContainer}>

        <Text style={styles.textFont}>비밀번호 변경</Text>
        <Text style={styles.textFont}>영문, 숫자를 포함한 6자리 이상만 가능.</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.textFont}>1차 비밀번호</Text>
          <TextInput
            style={styles.inputStyle}
            value={isPassword}
            fontSize={wp("4%")}
            onChangeText={setIsPassword}
          />
        </View>
        {
            isMsg === '잘못된 비번 양식'  && (
                <Text style={[styles.msgText,{color:'red'}]}>잘못된 비밀번호 양식입니다.</Text>
            )
        }
        
    
        <View style={styles.inputContainer}>
          <Text style={styles.textFont}>2차 비밀번호</Text>
          <TextInput
            style={styles.inputStyle}
            value={comparePw}
            fontSize={wp("4%")}
            onChangeText={setComparePw}
          />
        </View>
        {
            isMsg === '비번 불일치' && comparePw.length > 0 && (
                <Text style={[styles.msgText,{color:'red'}]}>비밀번호가 일치하지 않습니다.</Text>
            )
        }
     
      <TouchableOpacity onPress={()=>{updatePassword()
      alram()}}
        disabled={disabled}
        style={[
          styles.buttonStyle,
          { backgroundColor: disabled ? "gray" : "white" },
        ]}
      >
        <Text style={styles.textFont}>변경하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default OperatingPssword

const styles = StyleSheet.create({

    passwordContainer : {
        borderWidth : 1,
        height : hp('35%'),
        width : wp('95%'),
        alignSelf : 'center',
        borderRadius : 5,
        elevation : 5,
        backgroundColor : 'white',
        alignItems : 'center',
        justifyContent : 'space-around',
        marginVertical : 20,
    },

    inputStyle : {
        borderWidth : 1,
        height : hp('5%'),
        width : wp('50%'),
        borderRadius : 5,
        paddingLeft : 10,

    },

    buttonStyle : {
        borderWidth : 1,
        height : hp('5%'),
        width : wp('20%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
    },

    textFont : {
        fontSize : wp('4%')
    },

    infoCard : {
        height : hp('6%'),
        width : wp('70%'),
        alignItems : 'center',
        justifyContent : 'space-between',
        borderWidth : 1,
    },

    msgText : {
        fontSize : wp('3.5%'),
        margin : (5, 0, 0, 10),
    },

    inputContainer : {
        flexDirection : 'row',
        height : hp('5%'),
        width : wp('80%'),
        alignItems : 'center',
        justifyContent : 'space-between',
    }
})