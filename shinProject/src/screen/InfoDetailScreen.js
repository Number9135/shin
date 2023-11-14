import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OperatingName from '../forms/OperatingName';

const InfoDetailScreen = ({route}) => {
    const navigation = useNavigation();
    const [ isEdit, setIsEdit ] = useState(null);
    const {name, sex, joinDate, major, floor, upperSize, lowerSize, cardigan} = route.params

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
        style={styles.buttonStyle}>
            <Text style={styles.textFont}>삭제</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>치료사 정보</Text>
        <TouchableOpacity
        style={styles.buttonStyle}>
            <Text style={styles.textFont}>수정</Text>
        </TouchableOpacity>
      </View>
      <OperatingName name={name} sex={sex}/>

      <View style={styles.infoCoverContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.textFont}>{joinDate}</Text>
      </View>
      <TouchableOpacity >
        <Ionicons name="pencil-outline" size={wp('5%')} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoCoverContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.textFont}>
          {major} ({floor})
        </Text>
      </View>
      <TouchableOpacity >
        <Ionicons name="pencil-outline" size={wp('5%')} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoCoverContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.textFont}>
          상의 {upperSize} | 하의 {lowerSize} | 가디건 {cardigan}
        </Text>
      </View>
      <TouchableOpacity >
        <Ionicons name="pencil-outline" size={wp('5%')} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.sumbitContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButtonStyle}
        >
          <Text style={styles.textFont}>돌아가기</Text>
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
    },

    headerContainer : {
        height : hp('10%'),
        width : wp('100%'),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    

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

    sumbitContainer : {
        height : hp('15%'),
        width : wp('85%'),
        marginTop : 10,
        justifyContent : 'center',
        alignItems : 'center'
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
    }
})