import { StyleSheet, Text, View,TextInput } from 'react-native';
import React, { useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebaseConfig';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocus, setIsFocus] = useState(null);

    const loginHandler = async() => {
      await  auth.signInWithEmailAndPassword(email, password)
        .then((userCredential)=>{const user = userCredential.user})
        .then(()=>console.log("data : ", email, password))
        .then(()=>navigation.navigate("메인페이지"))
      }

      const signOut = () => {
        auth.signOut()
      }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Log In</Text>
      <View style={styles.loginContainer}>
        <TextInput
          style={[
            styles.textInputStyle,
            isFocus === "이메일" && { borderColor: "black" },
          ]}
          placeholder="이메일을 입력하세요"
          fontSize={wp("3.5%")}
          value={email}
          onChangeText={setEmail}
          onFocus={() => setIsFocus("이메일")}
          onBlur={() => setIsFocus(null)}
        />
        <TextInput
          style={[
            styles.textInputStyle,
            isFocus === "비밀번호" && { borderColor: "black" },
          ]}
          placeholder="비밀번호를 입력하세요"
          fontSize={wp("3.5%")}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setIsFocus("비밀번호")}
          onBlur={() => setIsFocus(null)}
        />
      </View>
      <View style={styles.submitContainer}>
        <TouchableOpacity onPress={loginHandler}
        style={[styles.buttonStyle]}>
          <Text>로그인</Text>
        </TouchableOpacity>
        <View style={styles.subButtonContainer}>
          <TouchableOpacity>
            <Text style={styles.textFont}>돌아가기</Text>
          </TouchableOpacity>

          <Text style={[styles.textFont, { marginHorizontal: 10 }]}>|</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("회원가입");
            }}
          >
            <Text style={[styles.textFont, { color: "blue" }]}>가입하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={signOut}
          >
            <Text style={[styles.textFont, { color: "blue" }]}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },

    headerText : {
        fontSize : wp('6%'),
        marginBottom : 20,
    },

    loginContainer : {
        height : hp('20%'),
        width : wp('80%'),
        marginVertical : 10,
        justifyContent : 'space-around'
    },

    textInputStyle : {
        borderWidth : 1,
        width : wp('80%'),
        height  : hp('5%'),
        paddingLeft : 10,
        borderRadius : 5,
        borderColor : 'gray'
    },

    

    buttonStyle : {
        width : wp('80%'),
        height : hp('5%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
        backgroundColor : 'yellow',
        opacity : 0.8,
        elevation : 5,
    },
    
    submitContainer : {
        width : wp('80%'),
        height : hp('20%'),
        marginTop : 20,
    },

    subButtonContainer : {
        height : hp('5%'),
        width : wp('80%'),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent :'center',
        marginTop : 10,
    },

    textFont : {
        fontSize : wp('3.5%')
    }
})