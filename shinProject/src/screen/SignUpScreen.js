import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import {auth, firebase_db} from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';


const SignUpScreen = () => {
    const navigation = useNavigation();
    const [isFocus, setIsFocus] = useState(null);
    const [isDuplication, setIsDuplication] = useState('');
    const [errMsg, setErrMsg] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [comparePw, setComparePw] = useState('');
    const [eiditableNick, setEditableNick] = useState(false);
    const [editablePw, setEditablePw] = useState(false);
    const [editableComparePw, setEditableComparePw] = useState(false);
    const [isPw, setIsPw] = useState(null);
    const currentTime = new Date();

    auth.onAuthStateChanged((user)=>{
        if(user){
            console.log('로그인')
        }else{
            console.log('로그아웃')
        }
    })

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
       console.log('isDate :', typeof(createDate))
    const emailDuplicationButton = async(inputEmail) => {
        const emailRegex = new RegExp('^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$')
        try{
            await firebase_db.ref('users').orderByChild('profile/UserEmail')
            .equalTo(inputEmail)
            .once('value')
            .then((snapshot)=>{
                console.log(snapshot)
                if(inputEmail.match(emailRegex)){
                    if(snapshot.exists()){
                        setIsDuplication('이메일 중복')
                        console.log('중복')
                    }else{
                        setIsDuplication('이메일 미중복')
                        setEditableNick(true)
                        console.log('미중복')
                    }
                }else{
                    setIsDuplication('잘못된 이메일 형식')
                    console.log('잘못된 형식')
                }
            })
        }catch{
            setErrMsg('중복확인 오류')
            console.log('오류')
        }
    }

    const NicknameDuplicationButton = async(n) => {
        const nicknameRegex = new RegExp('^[가-힣a-zA-Z0-9]+$')
        try{
            await firebase_db.ref('users')
                .orderByChild('profile/UserName')
                .equalTo(n)
                .once('value')
                .then((snapshot)=>{
                    let data = snapshot.val()
                    if(n.match(nicknameRegex)){
                        if(data.exists()){
                            setIsDuplication('닉네임 중복');
                            console.log('중복');
                            setEditableNick(false);
                        }else{
                            setIsDuplication('닉네임 미중복');
                            console.log('미중복');
                            setEditableNick(true);
                        }
                    }else{
                        setIsDuplication('잘못된 닉네임 형식');
                        console.log('잘못된 형식');
                    }
                })
           
        } catch(error) {
            setErrMsg('중복확인 오류');
            console.log('오류', error);
        }
    };
    

    
    useEffect(()=>{
        const pwRegex = new RegExp('^[a-z0-9]{6,}$');
        if(password.match(pwRegex)){
            setEditableComparePw(true)
            setIsDuplication('비번 가능')
            if(password === comparePw){
                setIsDuplication('비번 일치')
            }else{
                setIsDuplication('비번 불일치')
            }
            
        }else{
            setIsDuplication('잘못된 비번 양식')
        }
    })

      const createAccount = async() => {
        try{
            if(password === comparePw && eiditableNick && editablePw){
                await auth.createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        auth.currentUser.updateProfile({
                            displayName : nickname,
                        })
                    }).then(()=>{
                        firebase_db.ref('users/' + auth.currentUser.uid + '/profile').set({
                            UserName : nickname,
                            UserEmail : email,
                            Password : password,
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
      <Text style={styles.headerText}>Sign Up</Text>
      <View style={styles.signUpContainer}>
        <View style={styles.textInputContainer}>
            <TextInput
                style={[styles.textInputStyle, isFocus === '이메일' && {borderColor:'black'}]}
                placeholder='이메일을 입력하세요'
                value={email}
                fontSize={wp('3.5%')}
                onFocus={()=>setIsFocus('이메일')}
                onBlur={()=>setIsFocus(null)}
                onChangeText={setEmail}
            />
            <TouchableOpacity onPress={()=>emailDuplicationButton(email)}
            style={styles.duplicationButton}>
                <Text style={styles.textFont}>중복확인</Text>
            </TouchableOpacity>
        </View>
        {
            isDuplication === '이메일 중복' && (
                <Text style={[styles.textFont, {color:'red', marginLeft :10}]}>이미 사용중인 이메일입니다.</Text>
            )
        }
        {
            isDuplication === '이메일 미중복' && (
                <Text style={[styles.textFont, {marginLeft :10}]}>사용 가능한 이메일입니다.</Text>
            )
        }
        {
           isDuplication === '잘못된 이메일 형식' && (
                <Text style={[styles.textFont, {color:'blue', marginLeft :10}]}>잘못된 형식의 이메일입니다.</Text>
            )
        }
        <View style={styles.textInputContainer}>
            <TextInput
                style={[styles.textInputStyle, isFocus === '닉네임' && {borderColor:'black'}, {backgroundColor : eiditableNick ? "ghostwhite": 'gray'}]}
                placeholder='닉네임을 입력하세요 (특수문자 불가)'
                fontSize={wp('3.5%')}
                value={nickname}
                onFocus={()=>setIsFocus('닉네임')}
                onBlur={()=>setIsFocus(null)}
                onChangeText={setNickname}
                editable={eiditableNick}
            />
            <TouchableOpacity onPress={()=>NicknameDuplicationButton(nickname)}
            style={styles.duplicationButton}>
                <Text style={styles.textFont}>중복확인</Text>
            </TouchableOpacity>
        </View>
        {
            isDuplication === '닉네임 중복' && (
                <Text style={[styles.textFont, {color:'red', marginLeft :10}]}>이미 사용중인 닉네임입니다.</Text>
            )
        }
        {
            isDuplication === '닉네임 미중복' && (
                <Text style={[styles.textFont, {marginLeft :10}]}>사용 가능한 닉네임입니다.</Text>
            )
        }
        {
           isDuplication === '잘못된 닉네임 형식' && (
                <Text style={[styles.textFont, {color:'blue', marginLeft :10}]}>잘못된 형식의 닉네임입니다.</Text>
            )
        }

        <View style={styles.textInputContainer}>
            <TextInput
                style={[styles.textInputStyle, isFocus === '비번' && {borderColor:'black'}, {backgroundColor : editablePw ? "ghostwhite": 'gray'}]}
                placeholder='비밀번호를 입력하세요'
                fontSize={wp('3.5%')}
                value={password}
                secureTextEntry={true}
                onFocus={()=>setIsFocus('비번')}
                onBlur={()=>setIsFocus(null)}
                onChangeText={setPassword}
                editable={editablePw}
            />
        
        </View>
        {
                isDuplication === '비번 가능' && (
                    <Text style={[styles.textFont, {marginLeft:10,}]}>사용 가능한 비밀번호입니다.</Text>
                )
            }
           
            {
                errMsg === '비번 불가능' && (
                    <Text style={[styles.textFont, {color:'red', marginLeft:10,}]}>잘못된 비밀번호 양식입니다.</Text>
                )
            }

        <View style={styles.textInputContainer}>
            <TextInput
                style={[styles.textInputStyle, isFocus === '2차비번' && {borderColor:'black'}, {backgroundColor : editableComparePw ? "ghostwhite": 'gray'}]}
                placeholder='비밀번호를 한번 더 입력하세요'
                fontSize={wp('3.5%')}
                secureTextEntry={true}
                value={comparePw}
                onFocus={()=>setIsFocus('2차비번')}
                onBlur={()=>setIsFocus(null)}
                onChangeText={setComparePw}
                editable={editableComparePw}
            />
        </View>
        {
                isDuplication === '비번 일치' && (
                    <Text style={[styles.textFont, {marginLeft:10,}]}>비밀번호가 일치합니다.</Text>
                )
            }
            {
                isDuplication === '비번 불일치' && (
                    <Text style={[styles.textFont, {color:'red', marginLeft:10}]}>비밀번호가 일치하지 않습니다.</Text>
                )
            }
      </View>
      <View style={styles.submitContainer}>
        <TouchableOpacity onPress={createAccount}
            style={[styles.buttonStyle]}>
          <Text style={styles.textFont}>회원가입</Text>
        </TouchableOpacity>
        <View style={styles.subButtonContainer}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
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
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },

    headerText : {
        fontSize : wp('6%'),
        marginVertical : 20,
    },

    signUpContainer : {
        height : hp('45%'),
        width : wp('90%'),
        justifyContent : 'space-around',
        marginVertical : 10,


    },

    textInputStyle : {
        borderWidth : 1,
        width : wp('60%'),
        height  : hp('5%'),
        paddingLeft : 10,
        borderRadius : 5,
        borderColor : 'gray'
    },

    textInputContainer : {
        height : hp('7%'),
        width : wp('85%'),
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        alignSelf : 'center'
        
    },

    duplicationButton : {
        borderWidth : 1,
        width : wp('20%'),
        height : hp('5%'),
        borderRadius : 5, 
        justifyContent : 'center',
        alignItems : 'center'
    },

    textFont : {
        fontSize : wp('3.5%'),
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