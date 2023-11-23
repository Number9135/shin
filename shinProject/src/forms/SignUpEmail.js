import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { auth,firebase_db } from '../../firebaseConfig';

export default function SignUpEmail({isEmail, setIsEmail, setEditableNick}){
    const [ isFocus, setIsFocus ] = useState(null);
    const [ msg, setMsg ] = useState(null)

    const duplicationEmail = async(theEmail) => {
        const emailRegex = new RegExp('^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$')
        try{
            await firebase_db.ref('users').orderByChild('profile/UserEmail')
            .equalTo(theEmail)
            .once('value')
            .then((snapshot)=>{
                if(theEmail.match(emailRegex)){
                    if(snapshot.exists()){
                        setMsg('existEmail')
                    }else{
                        setMsg('noExistEmail')
                        setEditableNick(true)
                    }
                }else{
                    setMsg('errEmailRegex')
                }
            })
        }catch{
            setMsg('err')
            console.log('오류')
        }
    }


    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
            <TextInput
                style={[styles.inputStyle, isFocus === 'email' && {borderColor:'black'}]}
                onFocus={()=>setIsFocus('email')}
                onBlur={()=>setIsFocus(null)}
                value={isEmail}
                placeholder='이메일을 입력하세요.'
                onChangeText={setIsEmail}
                
            />
            <TouchableOpacity onPress={()=>duplicationEmail(isEmail)}
                style={styles.duplicationButtonStyle}
            >
                <Text style={styles.buttonText}>중복확인</Text>
            </TouchableOpacity>
            
            </View>
            {
                msg === 'existEmail' && (
                    <Text style={[styles.msgText, {color:'red'}]}>이미 존재하는 이메일입니다.</Text>
                )
            }
            {
                msg === 'noExistEmail' && (
                    <Text style={styles.msgText}>사용 가능한 이메일입니다.</Text>
                )
            }
            {
                msg === 'errEmailRegex' && (
                    <Text style={[styles.msgText, {color:'blue'}]}>잘못된 이메일 형식입니다.</Text>
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
        width : wp('65%'),
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