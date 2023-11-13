import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, {useState, useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { auth, firebase_db } from '../../firebaseConfig';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/AuthSlice';
import { Alert } from 'react-native';
import OperatingPssword from '../forms/OperatingPssword';


const UpdateInfo = () => {

    const [isDisplayName, setIsDisplayName] = useState('');
    const [isMsg, setIsMsg] = useState(null);
    const dispatch = useDispatch();
    const userEmail = useSelector((state)=>state.auth.userEmail);
    const password = useSelector((state)=>state.auth.password);
    const [disabled, setDisabled] = useState(true);

    const alram = () => {Alert.alert('', '닉네임 변경이 완료되었습니다.', [{
        text : "닫기"
    }])}

    useEffect(()=>{
        try{
        firebase_db.ref('users').orderByChild('profile/UserName').equalTo(isDisplayName)
        .once('value').then((snapshot)=>{
            if(snapshot.exists()){
                setIsMsg('닉네임 중복')
            }else{
                setIsMsg('닉네임 가능')
            }
        })
        }catch{
            console.log('err')
            
        }
        }, [isDisplayName])

        useEffect(()=>{
            if(isDisplayName.length === 0 || isMsg === '닉네임 중복'){
                setDisabled(true)
            }else{
                setDisabled(false)
            }
        }, [isDisplayName])

        const changeDisplayName = async() => {
            try{
                await firebase_db.ref('users/' + auth.currentUser.uid + '/profile')
                .update({
                    UserName : isDisplayName,
                }).then(()=>{
                    dispatch(loginSuccess({
                        userName : isDisplayName,
                        userEmail : userEmail,
                        password : password,
                        loginState : true,
                    }))
                })
            
            }catch{
                console.log('err')
            }
        }
  

  return (
    <ScrollView>
    <View style={styles.container}>
        <Text style={styles.headerText}>개인정보 수정</Text>
      <View style={styles.displayContainer}>
        <View style={styles.infoCard}>
        <Text style={styles.textFont}>닉네임 변경</Text>
        <TextInput 
        style={styles.inputStyle}
        value={isDisplayName}
        fontSize={wp('4%')}
        onChangeText={setIsDisplayName}
        />
        </View>
        <TouchableOpacity onPress={()=>{changeDisplayName()
        alram()}}
        disabled={disabled}
            style={[styles.buttonStyle, {backgroundColor:disabled?'gray':'white'}]}>
            <Text style={styles.textFont}>변경하기</Text>
        </TouchableOpacity>
        
      </View>
      {
            isMsg === '닉네임 중복' && isDisplayName.length > 0 && (
                <Text style={[styles.msgText,{color:'red'}]}>이미 존재하는 닉네임입니다.</Text>
            )
        }
    </View>

    <OperatingPssword/>
    </ScrollView>
  )
}

export default UpdateInfo

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },

    headerText : {
        fontSize : wp('6%'),
        textAlign : 'center',
        marginVertical : 20,
    },

    displayContainer : {
        borderWidth : 1,
        height : hp('10%'),
        width : wp('95%'),
        alignSelf : 'center',
        borderRadius : 5,
        elevation : 5,
        backgroundColor : 'white',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-around'
    },

    inputStyle : {
        borderWidth : 1,
        height : hp('5%'),
        width : wp('45%'),
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
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },

    msgText : {
        fontSize : wp('3.5%'),
        margin : (5, 0, 0, 10),
    }
})