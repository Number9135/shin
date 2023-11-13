import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { Avatar } from 'react-native-paper';
import { MaterialIcons, Ionicons, Feather, MaterialCommunityIcons   } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { auth, firebase_db } from '../../firebaseConfig';
import { useSelector } from 'react-redux';


export default function MyPage() {

  const navigation = useNavigation();
  const [isAuth, setIsAuth] = useState(false);

  const displayName = useSelector((state)=>state.auth.userName)

  return (
  
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoText}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: wp("5%"), fontWeight: "600" }}>
            {displayName}님
            </Text>
            <Text style={{ fontSize: wp("4%"), marginLeft: 10 }}>
              마이페이지
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: wp("3%"), marginTop: 2 }}>
              나의 정보들을 한눈에! 나의 글들을 확인 해보세요.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.cateContainer}>
        <View style={[styles.cateMenu, { height: hp("20%"),}]}>
          <View style={styles.cateTitleContainer}>
            <Text style={styles.cateTitleText}>계정관리</Text>
          </View>
          <View
            style={{
              height: hp("13%"),
              alignItems: "center",
              marginTop: 5,
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity onPress={()=>{navigation.navigate('개인정보수정')}}
            style={styles.cateButtonStyle}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="ios-person-circle-outline"
                  size={wp("5%")}
                  color="black"
                />
                <Text style={styles.cateButtonText}>개인정보 수정</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={wp("5%")}
                color="black"
              />
            </TouchableOpacity>

         
            <TouchableOpacity style={styles.cateButtonStyle}>
              <View style={styles.iconContainer}>
                <Feather name="log-out" size={wp("5%")} color="black" />
                <Text style={styles.cateButtonText}>회원탈퇴</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={wp("5%")}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.cateMenu, { height: hp("31%") }]}>
          <View style={styles.cateTitleContainer}>
            <Text style={styles.cateTitleText}>업무관리</Text>
          </View>
          <View
            style={{
              height: hp("25%"),
              alignItems: "center",
              marginTop: 5,
              justifyContent: "space-around",
            }}
          >
            
          </View>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },

    infoContainer : {
        borderBottomWidth : 1,
        height : hp('20%'),
        width : wp('100%'),
        backgroundColor : "gainsboro",
        flexDirection : 'row',
        alignItems : 'center'
    },

    infoImage : {
        borderWidth : 1,
        backgroundColor : 'white',
        marginLeft : 10,
    },

    infoText : {
        marginLeft : 10,
    },


    
    cateContainer : {
        height : hp('61%'),
        justifyContent : 'space-around',
        alignItems : 'center'
    },

    cateMenu : {
        borderWidth : 0,
        borderRadius : 10,
        elevation : 10,
        backgroundColor : 'white',
        opacity : 0.8,
        width : wp('95%')
    },

    cateTitleContainer : {
        borderBottomWidth : 1,
        width : wp('90%'),
        height : hp('5%'),
        justifyContent : 'center',
        
    },

    cateTitleText : {
        marginLeft : 18,
        fontSize : wp('4.5%'),
        fontWeight : '600'
    },

    cateButtonStyle : {
        borderWidth : 0,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        height : hp('4%'),
        width : wp('85%')
    },

    cateButtonText : {
        fontSize : wp('4%'),
        marginLeft : 10,
    },

    iconContainer : {
        flexDirection : 'row',
        justifyContent : 'center'
    }
})