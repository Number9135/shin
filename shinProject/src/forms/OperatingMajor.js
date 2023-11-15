import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { Ionicons, AntDesign, Entypo   } from '@expo/vector-icons';
import { firebase_db } from '../../firebaseConfig';

const OperatingMajor = (props) => {
    const [ isEdit, setIsEdit ] = useState(false);
    const [ isMajor, setIsMajor ] = useState(`${props.major}`);
    const [ isFloor , setIsFloor] = useState(`${props.floor}`);
    const [ isMajorEdit, setIsMajorEdit ] = useState(null);
    const [ isMsg, setIsMsg ] = useState(null);

    const changeFloorHandler = () => {
        setIsFloor((prevFloor) => prevFloor === '6층' ? '4층' : '6층')
    }

    const updateMajorHnadler = async() => {
        try{
            await firebase_db.ref('userInfo/' + props.dataId)
            .update({
                Major : isMajor,
                Floor : isFloor
            }).then(()=>{
                setIsEdit(false)
            })
        }catch{
            setIsMsg('오류')
        }
    }
  
 

  return (
    <View>
      {isEdit ? (
        <View style={styles.infoCoverContainer}>
          <Entypo name="cross" size={wp("6%")} color="gray" />
          <View style={styles.infoContainer}>

       
          
                <TouchableOpacity onPress={()=>setIsMajorEdit(true)}
            style={styles.buttonStyle}>
                <Text style={styles.textFont}>{isMajor}</Text>
            </TouchableOpacity>
            

            <TouchableOpacity onPress={changeFloorHandler}
            style={styles.buttonStyle}>
                <Text style={styles.textFont}>{isFloor}</Text>
            </TouchableOpacity>
            
          </View>
          <TouchableOpacity onPress={updateMajorHnadler}
          >
            <AntDesign name="plus" size={wp("6%")} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.infoCoverContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.textFont}>
              {isMajor} ({isFloor})
            </Text>
          </View>
          <TouchableOpacity onPress={() => setIsEdit(true)}>
            <Ionicons name="pencil-outline" size={wp("5%")} color="black" />
          </TouchableOpacity>
        </View>
      )}
      {
        isMajorEdit && (
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{setIsMajor('PT')
                setIsMajorEdit(false)}}
            style={styles.buttonStyle}>
                <Text style={styles.textFont}>PT</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setIsMajor('OT')
                setIsMajorEdit(false)}}
            style={styles.buttonStyle}>
                <Text style={styles.textFont}>OT</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setIsMajor('ST')
                setIsMajorEdit(false)}}
            style={styles.buttonStyle}>
                <Text style={styles.textFont}>ST</Text>
            </TouchableOpacity>
            </View>
        )
      }
      {
        isMsg === '오류' && (
            <Text style={[styles.textFont, {color:'blue'}]}>잠시 후 다시 시도해 주십시오.</Text>
        )
      }
    </View>
  );
}

export default OperatingMajor

const styles = StyleSheet.create({
    textFont : {
        fontSize : wp('4.5%')
    },

    infoContainer : {
        borderBottomWidth : 2,
        borderColor : 'darkgray',
        height : hp('8%'),
        width : wp('70%'),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        
    },

    infoCoverContainer : {
        width : wp('70%'), 
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