import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { auth,firebase_db } from '../../firebaseConfig';

export default function SignUpNick({isNick, setIsNick, editableNick, setEditablePw}){
    const [ isFocus, setIsFocus ] = useState(null);
    const [ msg, setMsg ] = useState(null)

    const duplicationNick = async(theNick) => {
        const nicknameRegex = new RegExp('^[가-힣a-zA-Z0-9]+$')
        try{
            await firebase_db.ref('users').orderByChild('profile/UserName')
            .equalTo(theNick)
            .once('value')
            .then((snapshot)=>{
                if(theNick.match(nicknameRegex)){
                    if(snapshot.exists()){
                        setMsg('existNick')
                    }else{
                        setMsg('noExistNick')
                        setEditablePw(true);
                    }
                }else{
                    setMsg('errNickRegex')
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
                style={[styles.inputStyle, isFocus === 'nick' && {borderColor:'black'}, editableNick === false && {backgroundColor:"darkgray"}]}
                onFocus={()=>setIsFocus('nick')}
                value={isNick}
                editable={editableNick}
                placeholder='닉네임을 입력하세요.'
                onBlur={()=>setIsFocus(null)}
                onChangeText={setIsNick}
                
            />
            <TouchableOpacity onPress={()=>duplicationNick(isNick)}
                style={styles.duplicationButtonStyle}
            >
                <Text style={styles.buttonText}>중복확인</Text>
            </TouchableOpacity>
            
            </View>
            {
                msg === 'existNick' && (
                    <Text style={[styles.msgText, {color:'red'}]}>이미 존재하는 닉네임입니다.</Text>
                )
            }
            {
                msg === 'noExistNick' && (
                    <Text style={styles.msgText}>사용 가능한 닉네임입니다.</Text>
                )
            }
            {
                msg === 'errNickRegex' && (
                    <Text style={[styles.msgText, {color:'blue'}]}>잘못된 닉네임 형식입니다.</Text>
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