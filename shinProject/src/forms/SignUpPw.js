import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { auth,firebase_db } from '../../firebaseConfig';

export default function SignUpPw({isPassword, setIsPassword, editablePw, setEditableComparePw}){
    const [ isFocus, setIsFocus ] = useState(null);
    const [ msg, setMsg ] = useState(null);
  

    useEffect(()=>{
        const pwRegex = new RegExp('^[a-z0-9*!]{6,}$|^$');
        if(isPassword.match(pwRegex)){
            setMsg('possible')
            setEditableComparePw(true)
        }else{
            setMsg('impossible')
        }
    }, [isPassword])


    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
            <TextInput
                style={[styles.inputStyle, isFocus === 'password' && {borderColor:'black'}, editablePw === false && {backgroundColor:'darkgray'}]}
                placeholder='비밀번호를 입력하세요.(영문, 숫자 혼합 6자리 이상)'
                onFocus={()=>setIsFocus('password')}
                onBlur={()=>setIsFocus(null)}
                secureTextEntry={true}
                value={isPassword}
                editable={editablePw}
                onChangeText={setIsPassword}
            />
            </View>
            {
              isPassword.length > 0 && msg === 'possible' && (
                    <Text style={styles.buttonText}>사용가능합니다.</Text>
                )
            }
            {
                msg === 'impossible' && (
                    <Text style={[styles.buttonText, {color:'red'}]}>잘못된 양식입니다.</Text>
                )
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        height : hp('13%'),
        width : wp('95%'),
        justifyContent : 'space-around',
        alignItems : 'center'

    },

    inputStyle : {
        borderWidth : 1,
        height : hp('7%'),
        width : wp('90%'),
        borderRadius : 5,
        borderColor : 'gray',
        paddingLeft : 10,
        fontSize : wp('4%')
    },

    inputContainer : {
        flexDirection : 'row',
        height : hp('8%'),
        width : wp('95%'),
        justifyContent : 'space-around'
    },

    duplicationButtonStyle : {
        borderWidth : 1,
        height : hp('7%'),
        width : wp('20%'),
        borderRadius : 5,
        justifyContent : 'center',
        alignItems : 'center'
    },

    buttonText : {
        fontSize : wp('4%')
    },

    msgText : {
        fontSize : wp('3.5%')
    }
})