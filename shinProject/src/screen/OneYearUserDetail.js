import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase_db } from '../../firebaseConfig';

const OneYearUserDetail = ({route}) => {
    const navigation = useNavigation();
    const {dataKey, name, sex, joinDate, major, floor, upperSize, lowerSize, cardigan, checkDate} = route.params

    const checkDateArr = checkDate.split("-");
    const newCheckDate = new Date(checkDateArr[0], checkDateArr[1]-1, checkDateArr[2]);
    const oneYearPlus = new Date(newCheckDate.getFullYear()+1, newCheckDate.getMonth(), newCheckDate.getDate())
    const theYear = newCheckDate.getFullYear()+1
    const theMonth = newCheckDate.getMonth()+1
    const theDate = newCheckDate.getDate()
    const oneYearArr = [theYear, theMonth, theDate]
    

    const deletAlert = () => {
        Alert.alert('정말로 삭제하시겠습니까?', '삭제 후 데이터는 복구되지 않습니다.', [
          {
            text : "삭제",
            onPress : () => { updateDateHandler()
            navigation.goBack()
        }
          },
          {
            text : "취소",
           
          }
        ])
      }

      const updateDateHandler = async() => {
        try{
          let updates = {};
          updates['userInfo/' + dataKey + '/CheckDate'] = `${oneYearArr[0]} - ${oneYearArr[1]} - ${oneYearArr[2]}`;
          updates['oneYearUser/' + dataKey] = null;
          firebase_db.ref().update(updates);
        }catch{
            console.log('err')
        }
      }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>신청 예정자 정보</Text>
      <View style={styles.cateContainer}>
        <Text style={styles.descText}>{name} ({sex})</Text>
      </View>

      <View style={styles.cateContainer}>
        <Text style={styles.descText}>{joinDate}</Text>
      </View>

      <View style={styles.cateContainer}>
        <Text style={styles.descText}>{major} ({floor})</Text>
      </View>

      <View style={styles.cateContainer}>
        <Text style={{fontSize:wp('5%')}}>상의{upperSize} | 하의{lowerSize} | 가디건{cardigan}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={deletAlert}
            style={[styles.buttonStyle, {backgroundColor:'yellow'}]}>
            <Text style={styles.buttonText}>확인하고 삭제하기</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.goBack()}}
           style={[styles.buttonStyle, {backgroundColor:'darkgray'}]}>
            <Text style={styles.buttonText}>돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OneYearUserDetail

const styles = StyleSheet.create({
    container : {
        borderWidth : 1,
        flex : 1,
        alignItems : 'center'
    },

    headerText : {
        fontSize : wp('6%'),
        marginVertical : 20,
    },

    descText : {
        fontSize : wp('6%'),
    },

    cateContainer : {
        borderBottomWidth : 1,
        height : hp('10%'),
        width : wp('85%'),
        justifyContent : 'center',
        alignItems : 'center',
        marginVertical : 5,
    },

    buttonContainer : {
        height : hp('20%'),
        width : wp('85%'),
        justifyContent : 'space-around',
        alignItems : 'center'
    },

    buttonStyle : {
        height : hp('8%'),
        justifyContent : 'center',
        alignItems : 'center',
        width : wp('85%'),
        borderRadius : 5,
        elevation : 3,
        opacity : 0.7

    },

    buttonText : {
        fontSize : wp('4%')
    }
})