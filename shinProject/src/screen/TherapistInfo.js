import { StyleSheet, Text, View, ScrollView  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { firebase_db } from '../../firebaseConfig';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';


const TherapistInfo = () => {

    const [fetchData, setFetchData] = useState([]);
    const [isSearch, setIsSearch] = useState('');

    useEffect(()=>{
            firebase_db.ref('userInfo').once('value')
            .then((snapshot)=>{
                let data = snapshot.val()
                setFetchData(data)
            })
    }, [fetchData])

  return (
    <View style={styles.container}>
        <View style={styles.barContainer}>
            <View style={styles.menuContainer}>
            <TouchableOpacity
                style={styles.buttonStyle}>
                <Text style={styles.menuText}>전 체</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}>
                <Text style={styles.menuText}>입 사</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}>
                <Text style={styles.menuText}>직 종</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.inputStyle}
                    value={isSearch}
                    onChangeText={setIsSearch}
                />
                <TouchableOpacity>
                    <EvilIcons name="search" size={wp('8%')} color="black" />
                </TouchableOpacity>
            </View>

        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
      {
        Object.keys(fetchData).map((key)=>{
            return(
                <TouchableOpacity key={key} style={styles.mapContainer}>
                    <View style={styles.nameContainer}>
                    <Text style={styles.textFont}>{fetchData[key].Name}</Text>
                    </View>
                    <View style={styles.joinDateContainer}>
                    <Text style={styles.textFont}>{fetchData[key].JoinDate}</Text>
                    </View>
                    <View style={styles.majorContainer}>
                    <Text style={styles.textFont}>{fetchData[key].Major}</Text>

                    </View>
                </TouchableOpacity>
            )
        })
      }
      </ScrollView>
    </View>
  )
}

export default TherapistInfo

const styles = StyleSheet.create({
    container : {
        flex : 1,

    },

    mapContainer : {
        height : hp('10%'),
        width : wp('98%'),
        alignSelf : 'center',
        marginVertical :3,
        borderRadius : 5,
        elevation : 5,
        backgroundColor : 'ghostwhite',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    },

    nameContainer : {
        height : hp('9%'),
        width : wp('35%'),
        alignItems : 'center',
        justifyContent : 'center'
    },

    joinDateContainer : {
        height : hp('9%'),
        width : wp('40%'),
        alignItems : 'center',
        justifyContent : 'center'
    },

    majorContainer : {
        height : hp('9%'),
        width : wp('20%'),
        alignItems : 'center',
        justifyContent : 'center'
    },

    textFont : {
        fontSize : wp('4.5%')
    },

    barContainer : {
        borderBottomWidth : 1,
        borderColor : 'darkgray',
        height : hp('10%'),
        marginBottom : 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent :'space-around'

    },

    menuContainer : {
        height : hp('8%'),
        width : wp('58'),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent :'space-around',

    },

    buttonStyle : {
        height : hp('7%'),
        width : wp('18%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
        elevation : 3,
        backgroundColor : 'ghostwhite',

    },

    menuText : {
        fontSize : wp('4.5%')
    },

    inputStyle : {
        height : hp('7%'),
        width : wp('30%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
        elevation : 3,
        backgroundColor : 'ghostwhite',
        paddingLeft : 10,

    },

    searchContainer : {
        height : hp('8%'),
        width : wp('42%'),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent :'space-around',
        flexDirection : 'row'
    }
})