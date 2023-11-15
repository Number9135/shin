import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { firebase_db } from '../../firebaseConfig';
import SizeModal from './SizeModal';

const OperatingSize = (props) => {

    
    const [ isUpperSize, setIsUpperSize ] = useState(props.upperSize);
    const [ isLowerSize, setIsLowerSize ] = useState(props.lowerSize);
    const [ isCardigan, setIsCardigan ] = useState(props.cardigan);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ isMsg, setIsMsg ] = useState(null);

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false)
        setIsLowerSize(props.lowerSize)
        setIsUpperSize(props.upperSize)
        setIsCardigan(props.cardigan)
    }

    const updateClothSizeHandler = async() => {
        try{
            await firebase_db.ref('userInfo/' + props.dataId)
            .update({
                UpperSize : isUpperSize,
                LowerSize : isLowerSize,
                Cardigan : isCardigan
            }).then(()=>{
                setModalVisible(false)
            })
        }catch{
            <Text style={[styles.textFont,{color:'blue'}]}>잠시 후에 시도해 주십시오.</Text>
        }
    }

  return (
    <View>
      <View style={styles.infoCoverContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.textFont}>
            상의 {isUpperSize} | 하의 {isLowerSize} | 가디건 {isCardigan}
          </Text>
        </View>
        <SizeModal
          modalVisible={modalVisible}
          closeModal={closeModal}
          setIsCardigan={setIsCardigan}
          setIsLowerSize={setIsLowerSize}
          setIsUpperSize={setIsUpperSize}
          updateClothSizeHandler={updateClothSizeHandler}
        />
        <TouchableOpacity onPress={openModal}>
          <Ionicons name="pencil-outline" size={wp("5%")} color="black" />
        </TouchableOpacity>
      </View>
      {
        isMsg === '오류' && (
            <Text style={[styles.textFont, {color:'blue'}]}>잠시 후 다시 시도해 주십시오.</Text>
        )
      }
    </View>
  );
}

export default OperatingSize

const styles = StyleSheet.create({
    textFont : {
        fontSize : wp('4.5%')
    },

    infoContainer : {
        borderBottomWidth : 2,
        borderColor : 'darkgray',
        height : hp('8%'),
        width : wp('80%'),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        
    },

    infoCoverContainer : {
        width : wp('80%'), 
        height : hp('13%'),
        flexDirection:'row', 
        alignItems: 'center', 
        justifyContent:'space-around' 
    },

    inputStyle : {
        borderWidth : 1,
        width : wp('40%'),
        height : hp('6%'),
        textAlign : 'center'
    },

    buttonStyle : {
        borderWidth : 1,
        width : wp('15%'),
        height : hp('6%'),
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : 10,

    },

    cancelButton : {
        justifyContent : 'center',
        alignItems : 'center'
    }
})