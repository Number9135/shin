import React from "react";
import { createDrawerNavigator, DrawerToggleButton } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import { Image, View, StyleSheet, Text } from "react-native";
import MainScreen from "../main/MainScreen";
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import DrawerContent from "../forms/DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const logo = {
    uri : require('../../assets/logoImage.jpg')
}
  return (
    <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props}/>}
        screenOptions={{
          headerStyle : {backgroundColor : 'white'},
          headerLeft : false,
          headerRight : () => <DrawerToggleButton/>,
          drawerPosition : 'right',
            headerShown : true,
            height: hp('11%'),
            headerTitle : (props) => (
                <View style={styles.logoContainer}>
                    <Image style={styles.logoStyle} resizeMode='contain' source={logo.uri}/>
                    <Text style={styles.logoText}>통합관리 시스템</Text>
                </View>
            )
        }}
        initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={TabNavigator} options={{drawerLabel: 'HOME',}} />
      {/* <Drawer.Screen name="About" component={MainScreen} options={{drawerLabel: 'ABOUT'}} /> */}
    </Drawer.Navigator>
   
  );
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
  },

  logoContainer : {
    width : wp('45%'),
    flexDirection : 'row',
    alignItems : 'center',

  },

  logoText : {
    fontSize : wp('4%'),
    marginLeft : 10,
  }

});

export default DrawerNavigator;