import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";


export default function(){
    return(
        <View style={styles.container}>
            <TouchableOpacity
            style={[styles.buttonStyle, {backgroundColor:"blanchedalmond"}]}>
                <Text style={styles.buttonText}>기능1</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.buttonStyle, {backgroundColor:"mintcream"}]}>
                <Text style={styles.buttonText}>기능2</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.buttonStyle, {backgroundColor:"lightpink"}]}>
                <Text style={styles.buttonText}>기능3</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.buttonStyle, {backgroundColor:"thistle"}]}>
                <Text style={styles.buttonText}>기능4</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        height : hp('15%'),
        width : wp('95%'),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-around'

    },

    buttonStyle : {
        height : hp('8%'),
        width : wp('15%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
        elevation : 3,
    },

    buttonText : {
        fontSize : wp('4%')
    }
})