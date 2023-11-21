import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { useSelector } from 'react-redux';

export default function InfoCard () {
    const userName = useSelector((State) => State.auth.userName)
    const logged = useSelector((state) => state.auth.loginState)

    console.log('logged : ', logged)

   

    return(
        <View style={styles.container}>
            {
                logged ? (
                    <View style={styles.textContainer}>
                        <Text style={styles.displayNameText}>{userName}님</Text>
                        <Text style={styles.displayNameText}>반갑습니다.</Text>
                    </View>
                ) : (
                    <View style={styles.textContainer}>
                        <Text style={styles.displayNameText}>로그인 후</Text>
                        <Text style={styles.displayNameText}>이용 가능합니다.</Text>
                    </View>
                )
            }
        
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        borderWidth : 1,
        height  : hp('25%'),
        width : wp('95%'),
        alignSelf : 'center',
        borderRadius : 5,
        elevation : 3,
        backgroundColor : "black",
        opacity : 0.7,
        justifyContent : 'center',
        alignItems : 'center'
    },

    displayNameText : {
        color : 'white',
        fontSize : wp('6')
    },

    textContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 1,
        borderColor : 'white',
        height : hp('20%'),
        width : wp('80%')
    }

})