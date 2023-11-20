import { StyleSheet, Text, View, ScrollView  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { firebase_db } from '../../firebaseConfig';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';


const TherapistInfo = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [fetchData, setFetchData] = useState([]);
    const [isSearch, setIsSearch] = useState('');
    const [ isSelect, setIsSelect ] = useState([]);
    const [sortType, setSortType] = useState("default");

    useEffect(()=>{
            firebase_db.ref('userInfo').on('value', (snapshot) => {
                let data = snapshot.val();
                setFetchData(data);
                setIsSelect(data);
            })
    }, [])


    // useEffect(()=> {
    //     setIsSelect(fetchData)
    // }, [fetchData])


    const searchName = (inputName) => {
        const filteredData = Object.entries(fetchData).filter(([key, value]) => value.Name.includes(inputName.toLowerCase()));
      
        const filteredDataObject = Object.fromEntries(filteredData);
        setIsSelect(filteredDataObject);
        console.log('filteredData: ', filteredDataObject);
      };
      

    const alignNameWithSort = () => {
        const sortName = Object.entries(fetchData).sort(([keyA, valueA], [keyB, valueB]) => {
          let x = valueA.Name.toLowerCase();
          let y = valueB.Name.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
      
        const sortedData = Object.fromEntries(sortName);
        setFetchData(sortedData);
        setIsSelect(sortedData);
      };
      

        const alignDateWithSort = () => {
            const sortDate = Object.entries(fetchData).sort(([keyA, valueA], [keyB, valueB]) =>{
                const dateA = new Date(valueA.JoinDate).getTime();
                const dateB = new Date(valueB.JoinDate).getTime();
                return dateA > dateB ? 1 : -1;
            } )

            const sortedData = Object.fromEntries(sortDate)
            setFetchData(sortedData);
            setIsSelect(sortedData);
            
        }
    

  

  return (
    <View style={styles.container}>
        <View style={styles.barContainer}>
            <View style={styles.menuContainer}>
            <TouchableOpacity onPress={alignNameWithSort}
                style={styles.buttonStyle}>
                <Text style={styles.menuText}>이 름</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={alignDateWithSort}
                style={styles.buttonStyle}>
                <Text style={styles.menuText}>입 사</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.inputStyle}
                    value={isSearch}
                    onChangeText={setIsSearch}
                />
                <TouchableOpacity onPress={()=>searchName(isSearch)}>
                    <EvilIcons name="search" size={wp('8%')} color="black" />
                </TouchableOpacity>
            </View>

        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
      {
        Object.entries(isSelect).map(([dataId, value])=>{
            //const value = isSelect[dataId]
            return(
                <TouchableOpacity onPress={()=>navigation.navigate('상세페이지', {
                    dataId : dataId,
                    name : value.Name,
                    sex : value.Sex,
                    joinDate : value.JoinDate,
                    major : value.Major,
                    floor : value.Floor,
                    upperSize : value.UpperSize,
                    lowerSize : value.LowerSize,
                    cardigan : value.Cardigan,
                })}
                key={dataId}
                 style={styles.mapContainer}>
                    <View style={styles.nameContainer}>
                    <Text style={styles.textFont}>{value.Name}</Text>
                    </View>
                    <View style={styles.joinDateContainer}>
                    <Text style={styles.textFont}>{value.JoinDate}</Text>
                    </View>
                    <View style={styles.majorContainer}>
                    <Text style={styles.textFont}>{value.Major}</Text>

                    </View>
                </TouchableOpacity>
            )
        })
      }

      </ScrollView>
    </View>
  )
}

export default TherapistInfo

const styles = StyleSheet.create({
    container : {
        flex : 1,

    },

    mapContainer : {
        height : hp('10%'),
        width : wp('98%'),
        alignSelf : 'center',
        marginVertical :3,
        borderRadius : 5,
        elevation : 5,
        backgroundColor : 'ghostwhite',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    },

    nameContainer : {
        height : hp('9%'),
        width : wp('35%'),
        alignItems : 'center',
        justifyContent : 'center'
    },

    joinDateContainer : {
        height : hp('9%'),
        width : wp('40%'),
        alignItems : 'center',
        justifyContent : 'center'
    },

    majorContainer : {
        height : hp('9%'),
        width : wp('20%'),
        alignItems : 'center',
        justifyContent : 'center'
    },

    textFont : {
        fontSize : wp('4.5%')
    },

    barContainer : {
        borderBottomWidth : 1,
        borderColor : 'darkgray',
        height : hp('10%'),
        marginBottom : 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent :'space-around'

    },

    menuContainer : {
        height : hp('8%'),
        width : wp('55'),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent :'space-around',

    },

    buttonStyle : {
        height : hp('7%'),
        width : wp('25%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
        elevation : 3,
        backgroundColor : 'ghostwhite',

    },

    menuText : {
        fontSize : wp('4.5%')
    },

    inputStyle : {
        height : hp('7%'),
        width : wp('35%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
        elevation : 3,
        backgroundColor : 'ghostwhite',
        paddingLeft : 10,

    },

    searchContainer : {
        height : hp('8%'),
        width : wp('42%'),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent :'space-around',
        flexDirection : 'row'
    }
})