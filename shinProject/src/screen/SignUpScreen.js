import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import {auth, firebase_db} from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import SignUpEmail from '../forms/SignUpEmail';
import SignUpNick from '../forms/SignUpNick';
import SignUpPw from '../forms/SignUpPw';
import SignUpComparePw from '../forms/SignUpComparePw';


const SignUpScreen = () => {
    const navigation = useNavigation();
    const [ isFocus, setIsFocus ] = useState(null)
    const [ isEmail, setIsEmail ] = useState('');
    const [ isNick, setIsNick ] = useState('');
    const [ isPassword, setIsPassword ] = useState('');
    const [ isComparePw, setIsComparePw ] = useState('');
    const [ editableNick, setEditableNick ] = useState(false);
    const [ editablePw, setEditablePw ] = useState(false);
    const [ editableComparePw, setEditableComparePw ] = useState(false);
    const currentTime = new Date();
    const isDate = {
        yaer : currentTime.getFullYear(),
        month : currentTime.getMonth() + 1,
        day : currentTime.getDay(),
        hour : currentTime.getHours(),
        minute : currentTime.getMinutes(),
        second : currentTime.getSeconds(),
       }
     
       const createDate = 
        isDate.yaer + '-' +isDate.month + '-' + isDate.day + '-' + isDate.hour + '-' + isDate.minute + '-' + isDate.second

    
    const createAccount = async() => {
        try{
            if(isPassword === isComparePw && editableNick && editablePw){
                await auth.createUserWithEmailAndPassword(isEmail, isPassword)
                    .then(() => {
                        auth.currentUser.updateProfile({
                            displayName : isNick,
                        })
                    }).then(()=>{
                        firebase_db.ref('users/' + auth.currentUser.uid + '/profile').set({
                            UserName : isNick,
                            UserEmail : isEmail,
                            Password : isPassword,
                            CreateDate : createDate
                        })
                    }).then(()=>{
                        console.log('계정 생성 완료')
                        navigation.navigate('메인페이지')
                    })
                }
        }catch{
            console.log('err')
        }
      }




    
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Sign Up</Text>
            </View>
            <View style={styles.inputContainer}>
                <SignUpEmail setEditableNick={setEditableNick} isFocus={isFocus} setIsFocus={setIsFocus} isEmail={isEmail} setIsEmail={setIsEmail} />
                <SignUpNick setEditablePw={setEditablePw} editableNick={editableNick} isFocus={isFocus} setIsFocus={setIsFocus} isNick={isNick} setIsNick={setIsNick} />
                <SignUpPw setEditableComparePw={setEditableComparePw} editablePw={editablePw} isFocus={isFocus} setIsFocus={setIsFocus} isPassword={isPassword} setIsPassword={setIsPassword} />
                <SignUpComparePw editableComparePw={editableComparePw} isPassword={isPassword} isComparePw={isComparePw} setIsComparePw={setIsComparePw} />
            </View>
            <View style={styles.submitContainer}>
                <TouchableOpacity onPress={createAccount}
                    style={[styles.buttonStyle]}>
                    <Text style={styles.textFont}>회원가입</Text>
                </TouchableOpacity>
                <View style={styles.subButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.textFont}>취소하고 돌아가기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </ScrollView>
    )
}

export default SignUpScreen


const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
        flex : 1,
    },

    headerContainer : {
        height : hp('10%'),
        width : wp('95%'),
        justifyContent : 'center',
        alignItems : 'center',
        marginVertical : 10,
    },

    headerText : {
        fontSize : wp('6%')
    },

    inputContainer : {
        height : hp('50%'),
        justifyContent : 'center',
        alignItems : 'center'
    },

    submitContainer : {
        width : wp('85%'),
        height : hp('20%'),
        marginTop : 20,
    },

    subButtonContainer : {
        height : hp('5%'),
        width : wp('85%'),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent :'center',
        marginTop : 10,
    },

    buttonStyle : {
        width : wp('85%'),
        height : hp('5%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
        backgroundColor : 'yellow',
        opacity : 0.8,
        elevation : 5,
    },
})
