import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { Drawer, Avatar, Title, Caption, Image } from 'react-native-paper'
import { DrawerContentScrollView, } from '@react-navigation/drawer';
import { SimpleLineIcons, MaterialIcons  } from '@expo/vector-icons';
import { useNavigation, params } from '@react-navigation/core';

const DrawerContent = ({props}) => {

const navigation = useNavigation();

const [loggedIn, setLoggedIn] = useState(false);



  return (
    <View style={styles.container}>
       
        <DrawerContentScrollView contentContainerStyle={styles.drawerContainer} {...props}>
            <View style={styles.profileContainer}>
                <Avatar.Image
                    
                    size={wp('15')}
                />
                <View style={{paddingLeft:10,}}>
                <Text style={{fontSize:wp('4%'), fontWeight:'500'}}> 님</Text>
                <Text>반갑습니다.</Text>
                </View> 
            </View>
            <View style={styles.menuContainer}>
                <Text style={styles.menuTitle}>맛 집</Text>
                    <TouchableOpacity
                        style={styles.menuButton}>
                        <Text style={styles.menuText}>음식</Text>
                        <SimpleLineIcons name="arrow-right" size={wp('3%')} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuButton}>
                        <Text style={styles.menuText}>술집</Text>
                        <SimpleLineIcons name="arrow-right" size={wp('3%')} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuButton}>
                        <Text style={styles.menuText}>까페&디저트</Text>
                        <SimpleLineIcons name="arrow-right" size={wp('3%')} color="black" />
                    </TouchableOpacity>
            </View>

            <View style={styles.menuContainer}>
                <Text style={styles.menuTitle}>멋 집</Text>
                    <TouchableOpacity style={styles.menuButton}>
                        <Text style={styles.menuText}>캠핑</Text>
                        <SimpleLineIcons name="arrow-right" size={wp('3%')} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuButton}>
                        <Text style={styles.menuText}>관광</Text>
                        <SimpleLineIcons name="arrow-right" size={wp('3%')} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuButton}>
                        <Text style={styles.menuText}>까페&디저트</Text>
                        <SimpleLineIcons name="arrow-right" size={wp('3%')} color="black" />
                    </TouchableOpacity>
            </View>

            <View style={styles.myContainer}>
                <Text style={styles.menuTitle}>내정보</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate('마이페이지')}}
                    style={styles.menuButton}>
                        <Text style={styles.menuText}>마이페이지</Text>
                        <SimpleLineIcons name="arrow-right" size={wp('3%')} color="black" />
                    </TouchableOpacity>
            </View>
           
        </DrawerContentScrollView>
        
        <View style={{borderTopWidth:1, width:wp('60%'), height:hp('6%'),}}>
           
        </View>
    </View>
  )
}

export default DrawerContent

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'ghostwhite',
        alignItems : 'center'
    },

    drawerContainer : {
        alignItems : 'center'
    },

    profileContainer : {
        borderBottomWidth  : 1,
        borderColor : 'gray',
        height : hp('12%'),
        width : wp('60%'),
        alignItems : 'center',
        flexDirection : 'row'
    },

    menuContainer : {
        borderWidth : 0,
        height : hp('25%'),
        width : wp('60%'),
        marginTop : 10,
        justifyContent : 'space-around',
        borderRadius : 10,
        elevation : 2,
        backgroundColor : 'white'
    },

    myContainer : {
        borderWidth : 0,
        height : hp('15%'),
        width : wp('60%'),
        marginTop : 10,
        justifyContent : 'space-around',
        borderRadius : 10,
        elevation : 2,
        backgroundColor : 'white'
    },

    menuTitle : {
        fontSize : wp('4%'),
        fontWeight : '600',
        paddingLeft : 10,
        borderBottomWidth : 0.8,
        width : wp('50%'),
        borderColor : 'gray',
        paddingBottom : 5,

    },

    menuButton : {
        flexDirection : 'row',
        borderWidth : 0,
        height : hp('3%'),
        width : wp('50%'),
        alignItems : 'center',
        justifyContent : 'space-between'
    },

    menuText : {
        fontSize : wp('3%'),
        paddingLeft : 10,
    },

    loginButton : {
        borderWidth : 0,
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : 5,
        justifyContent : 'flex-end'

    },

    loginText : {
        fontSize : wp('3%'),
        marginRight : 10,
    }
})