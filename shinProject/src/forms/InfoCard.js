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
        height  : hp('12%'),
        width : wp('95%'),
        alignSelf : 'center',
        borderRadius : 5,
        elevation : 3,
        opacity : 0.7,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 20,
        backgroundColor : 'white'
    },

    displayNameText : {
        color : 'black',
        fontSize : wp('5%')
    },

    textContainer : {
        justifyContent : 'center',
        borderWidth : 1,
        borderColor : 'white',
        height : hp('9%'),
        width : wp('90%')
    }

})