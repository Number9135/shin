import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { auth,firebase_db } from '../../firebaseConfig';

export default function SignUpComparePw({isPassword, isComparePw, setIsComparePw, editableComparePw}){
    const [ isFocus, setIsFocus ] = useState(null);
    const [ msg, setMsg ] = useState(null);
  

    useEffect(()=>{
        if(isPassword === isComparePw){
            setMsg('match')
        }else{
            setMsg('disMatch')
        }
    }, [isPassword, isComparePw])


    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.inputStyle, isFocus === 'comparePw' && { borderColor: 'black' }, editableComparePw === false && { backgroundColor: 'darkgray' }]}
                    placeholder='비밀번호를 재입력하세요.'
                    onFocus={() => setIsFocus('comparePw')}
                    onBlur={() => setIsFocus(null)}
                    value={isComparePw}
                    secureTextEntry={true}
                    editable={editableComparePw}
                    onChangeText={setIsComparePw}
                />
            </View>
            {
                isPassword.length > 0 && msg === 'match' && (
                    <Text style={styles.buttonText}>비밀번호가 일치합니다.</Text>
                )
            }
            {
                msg === 'disMatch' && (
                    <Text style={[styles.buttonText, {color:'red'}]}>비밀번호가 일치하지 않습니다.</Text>
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