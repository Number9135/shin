import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { firebase_db } from '../../firebaseConfig';


const OperatingDate = (props) => {

    const [ isEdit, setIsEdit ] = useState(false);
    const [ isJoinDate, setIsJoinDate ] = useState(props.joinDate);
    const [ isMsg, setIsMsg ] = useState(null);
    const [ isYear, setIsYear ] = useState('');
    const [ isMonth, setIsMonth ] = useState('');
    const [ isDay, setIsDay ] = useState('');

    const updateJoinDate = () => {
        try{
            if(isYear.length === 4 && isMonth.length > 0 && isDay.length >0){
                firebase_db.ref('userInfo/' + props.dataId)
                .update({
                    JoinDate : `${isYear} - ${isMonth} - ${isDay}`,
                    CheckDate : `${isYear} - ${isMonth} - ${isDay}`,
                   
                }).then(()=>{
                  console.log(props.dataId)
                setIsEdit(false)
                setIsMsg(null)
                setIsJoinDate(`${isYear} - ${isMonth} - ${isDay}`)
                })
                
            }else{
                setIsMsg('양식 불일치')
            }
        }catch{
            setIsMsg('오류')
        }
    }

  return (
    <View>
      {isEdit ? (
        <View style={styles.infoCoverContainer}>
          <TouchableOpacity
            onPress={() => setIsEdit(false)}
            style={styles.cancelButton}
          >
            <Entypo name="cross" size={wp("6%")} color="gray" />
          </TouchableOpacity>


          <View style={styles.infoContainer}>
            <TextInput
            style={styles.inputStyle}
            value={isYear}
            maxLength={4}
            onChangeText={setIsYear}/>

            <Text style={styles.textFont}> - </Text>

            <TextInput
            style={styles.inputStyle}
            value={isMonth}
            maxLength={2}
            onChangeText={setIsMonth}/>

<Text style={styles.textFont}> - </Text>

<TextInput
            style={styles.inputStyle}
            value={isDay}
            maxLength={2}
            onChangeText={setIsDay}/>
          </View>


          <TouchableOpacity onPress={updateJoinDate}
          >
            <AntDesign name="plus" size={wp("6%")} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.infoCoverContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.textFont}>{isJoinDate}</Text>
          </View>
          <TouchableOpacity onPress={() => setIsEdit(true)}>
            <Ionicons name="pencil-outline" size={wp("5%")} color="black" />
          </TouchableOpacity>
        </View>
      )}
      {
        isMsg === '양식 불일치' && (
            <Text style={[styles.textFont, {color:'red'}]}>양식이 일치하지 않습니다.</Text>
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

export default OperatingDate

const styles = StyleSheet.create({
  textFont: {
    fontSize: wp("4.5%"),
  },

  infoContainer: {
    borderBottomWidth: 2,
    borderColor: "darkgray",
    height: hp("8%"),
    width: wp("70%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  infoCoverContainer: {
    width: wp("70%"),
    height: hp("13%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  inputStyle: {
    borderWidth: 1,
    width: wp("15%"),
    height: hp("5%"),
    textAlign: "center",
  },

  sexButton: {
    borderWidth: 1,
    width: wp("15%"),
    height: hp("6%"),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});