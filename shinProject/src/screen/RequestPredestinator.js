import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { firebase_db } from '../../firebaseConfig';
import moment from 'moment';
import { ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';




const RequestPredestinator = () => {
  const navigation = useNavigation();
  const [ fetchData, setFetchData ] = useState([]);
  const [ isUser, setIsUser ] = useState(null);
 

  useEffect(()=> {
    try{
      firebase_db.ref('oneYearUser').on('value', (snapshot)=>{
        let data = snapshot.val();
            setFetchData(data)
      })
    }catch{
      console.log('err')
      setIsUser('예정자없음')
    }
  }, [])

  


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <Text style={styles.headerFont}>신청예정자</Text>
      {
        Object.entries(fetchData).map(([dataKey, value]) => {
          return(
            <TouchableOpacity onPress={()=>{navigation.navigate('예정자상세페이지', {
              dataKey : dataKey,
              name : value.Name,
              checkDate : value.CheckDate,
              sex : value.Sex,
              joinDate : value.JoinDate,
              major : value.Major,
              floor : value.Floor,
              upperSize : value.UpperSize,
              lowerSize : value.LowerSize,
              cardigan : value.Cardigan,
            })}}
              style={styles.buttonCard}
              key={dataKey}>
              <Text style={styles.descFont}>{value.Name}</Text>
              <Text style={styles.descFont}>{value.JoinDate}</Text>
              <Text style={styles.descFont}>{value.Major}</Text>
            </TouchableOpacity>
          )
        })
      }
      {
        isUser === '예정자없음' && (
          <Text style={styles.noUserText}>현재 신청예정자는 없습니다.</Text>
        )
      }
    </View>
    </ScrollView>
  )
}

export default RequestPredestinator

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center'
  },

  headerFont : {
    fontSize : wp('6%'),
    marginVertical : 15,
  },

  descFont : {
    fontSize : wp('5%')
  },

  buttonCard : {
    borderWidth : 1,
    height : hp('10%'),
    width : wp('95%'),
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    padding : (0, 20, 0, 20),
    marginVertical : 5,
    borderRadius : 5,
  },

  noUserText : {
    fontSize : wp('6%'),
    textAlign : 'center',
    textAlignVertical : 'center'
  }
})