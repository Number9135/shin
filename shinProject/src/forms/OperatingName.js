import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons, AntDesign, Entypo   } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { TextInput } from 'react-native';
import { auth, firebase_db } from '../../firebaseConfig';


const OperatingName = (props) => {
    const [ isEdit, setIsEdit ] = useState(false);
    const [ sex, setSex ] = useState(`${props.sex}`);
    const [ name , setName] = useState(`${props.name}`);

    const updateHandler = async() => {
         if(name.length > 0){
            await firebase_db.ref('userInfo/' + props.dataId)
            .update({
                Name : name,
                Sex : sex,
            }).then(()=>{
                setIsEdit(false)
                console.log('성공')
            })
         }else{
            console.log('업데이트 에러')
         }
    }


    const sexHandler = () => {
       setSex((prevSex) => prevSex === '남' ? '여' : '남')
    }

   
 


  return (
   <View>
        {
            isEdit ? (
                <View style={styles.infoCoverContainer}>
                    <TouchableOpacity onPress={()=>setIsEdit(false)}
                    style={styles.cancelButton}>
                    <Entypo name="cross" size={wp('6%')} color="gray" />
                    </TouchableOpacity>
                <View style={styles.infoContainer}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={`${props.name}`}
                    value={name}
                    onChangeText={setName}
                    
                />
                <TouchableOpacity onPress={sexHandler}
                style={styles.sexButton}>
                    <Text>{sex}</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={updateHandler}
                 >
                <AntDesign name="plus" size={wp('6%')} color="black" />
                </TouchableOpacity>
              </View>
            ) : (
                <View style={styles.infoCoverContainer}>
                <View style={styles.infoContainer}>
                <Text style={styles.textFont}>{name} ({sex})</Text>
                </View>
                <TouchableOpacity onPress={()=>setIsEdit(true)}
                 >
                <Ionicons name="pencil-outline" size={wp('5%')} color="black" />
                </TouchableOpacity>
              </View> 
            )
        }
       </View>
  )
}

export default OperatingName

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

    sexButton : {
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