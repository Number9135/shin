import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, AntDesign  } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { TextInput } from 'react-native';



const OperatingName = (props) => {
    const [ isEdit, setIsEdit ] = useState(false)
  return (
   <View>
        {
            isEdit ? (
                <View style={styles.infoCoverContainer}>
                <View style={styles.infoContainer}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={`${props.name}`}
                />
                <TouchableOpacity
                style={styles.sexButton}>
                    <Text>{props.sex}</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>setIsEdit('name')}
                 >
                <AntDesign name="plus" size={wp('6%')} color="black" />
                </TouchableOpacity>
              </View>
            ) : (
                <View style={styles.infoCoverContainer}>
                <View style={styles.infoContainer}>
                <Text style={styles.textFont}>{props.name} ({props.sex})</Text>
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
        marginVertical : 10,
        
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

    }
})