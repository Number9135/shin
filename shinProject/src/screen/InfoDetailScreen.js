import { StyleSheet, Text, View, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { TouchableOpacity } from 'react-native';
import OperatingName from '../forms/OperatingName';
import OperatingDate from '../forms/OperatingDate';
import { Ionicons } from '@expo/vector-icons';
import OperatingMajor from '../forms/OperatingMajor';
import OperatingSize from '../forms/OperatingSize';
import { firebase_db } from '../../firebaseConfig';


const InfoDetailScreen = ({route}) => {
    const navigation = useNavigation();
    const [ isEdit, setIsEdit ] = useState(null);
    const {dataId, name, sex, joinDate, major, floor, upperSize, lowerSize, cardigan} = route.params
    const [ isSex, setIsSex ] = useState(sex);

    const deletAlert = () => {
      Alert.alert('정말로 삭제하시겠습니까?', '삭제 후 데이터는 복구되지 않습니다.', [
        {
          text : "삭제",
          onPress : () => { removeHandler()
          navigation.goBack()}
        },
        {
          text : "취소",
         
        }
      ])
    }

    const removeHandler = async() => {
      try{
        await firebase_db.ref('userInfo/' + dataId).remove()
      }catch{
        console.log('데이터 삭제 에러')
      }
    }



  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>치료사 정보</Text>

    <View style={styles.operatingContainer}>
      <OperatingName dataId={dataId} name={name} sex={sex}/>

      <OperatingDate dataId={dataId} joinDate={joinDate}/>
      
      <OperatingMajor dataId={dataId} major={major} floor={floor}/>

      <OperatingSize dataId={dataId} upperSize={upperSize} lowerSize={lowerSize} cardigan={cardigan}/>
  
      </View>

      

      <View style={styles.sumbitContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButtonStyle}
        >
          <Text style={styles.textFont}>돌아가기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={deletAlert}
          style={styles.deletButton}
        >
          <Text style={[styles.textFont, {color:'blue'}]}>데이터 삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default InfoDetailScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center'
    },

    headerText : {
        fontSize : wp('6%'),
        marginVertical : 20,
    },


    textFont : {
        fontSize : wp('4.5%')
    },



    sumbitContainer : {
        height : hp('15%'),
        width : wp('85%'),
        marginTop : 5,
        justifyContent : 'center',
        alignItems : 'center',
    },

    goBackButtonStyle : {
        height : hp('8%'),
        width : wp('85%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
        elevation : 3,
        backgroundColor : 'yellow',
        opacity : 0.7
    },

    buttonStyle : {
        borderWidth : 1,
        height : hp('5%'),
        width : wp('15%'),
        justifyContent : 'center',
        alignItems : 'center'
    },

    deletButton : {
      marginTop : 10,
    },

    operatingContainer : {
      justifyContent : 'center',
      alignItems : 'center',
      height : hp('50%'),
      width : wp('85%')
    }
})