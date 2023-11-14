import React, { useEffect, useState } from 'react';  //설치한 스택 네비게이션 라이브러리 삽입
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../main/MainScreen';
import { Image, TouchableOpacity, View, Text, PixelRatio, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import DrawerContent from '../forms/DrawerContent';
import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';
import WriteScreen from '../screen/WriteScreen';
import ClothSize from '../forms/ClothSize';
import MyPage from '../screen/MyPage';
import UpdateInfo from '../screen/UpdateInfo';
import TherapistInfo from '../screen/TherapistInfo';
import SendingMsg from '../screen/SendingMsg';
import InfoDetailScreen from '../screen/InfoDetailScreen';


const Stack = createStackNavigator();

const StackNavigator = () =>{

    const navigation = useNavigation(); 

    const logo = {
      uri :  require('../../assets/logoImage.jpg')
    }

        
    
    return (
        <Stack.Navigator
            screenOptions={{
                
                headerLeft : null,
                headerStyle: {
                    backgroundColor: "white",
                    borderBottomColor: "white",
                    shadowColor: "white",
                    height: hp('11%'),
                
                },
                headerTitle : (props) => (
             
                    <Image style={styles.logoStyle} resizeMode='contain' source={logo.uri}/>
                  
                    
                ),
                headerTintColor: "black",
                headerBackTitleVisible: false,
            }}>

            {/* component={} 안에 페이지로 만들 컴포넌트를 넣음. 컴포넌트에 페이지 기능을 부여하는 코드*/}
            <Stack.Screen name="메인페이지" component={MainScreen} options={{headerShown:false}} />
            <Stack.Screen name="추가" component={WriteScreen} options={{headerShown:false}} />
            <Stack.Screen name="로그인" component={LoginScreen} options={{headerShown:false}} />
            <Stack.Screen name="회원가입" component={SignUpScreen} options={{headerShown:false}} />
            
            <Stack.Screen name="사이즈" component={ClothSize} options={{headerShown:false}} />
            <Stack.Screen name="tab_마이페이지" component={MyPage} options={{headerShown:false}} />
            <Stack.Screen name="개인정보수정" component={UpdateInfo} options={{headerShown:false}} />
            <Stack.Screen name="치료사 정보" component={TherapistInfo} options={{headerShown:false}} />
            <Stack.Screen name="메세지" component={SendingMsg} options={{headerShown:false}} />
            <Stack.Screen name="상세페이지" component={InfoDetailScreen} options={{headerShown:false}} />

            

            

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    logoStyle : {
        height:hp('6%'), 
        width:wp('13%'),
        borderRadius : 10,
    },

    headerStyleContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between'
    }

});

//만든 스택 네비게이터를 외부에서 사용하기위해 export로 함수를 내보냄
export default StackNavigator; 
