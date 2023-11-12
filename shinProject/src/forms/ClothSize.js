import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import data from '../../data.json';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectUpper, selectLower, selectCardigan } from '../redux/ClothSlice';

const ClothSize = (props) => {
    const [isData, setIsData] = useState(data)
    const [numColumns, setNumColumns] = useState(4);
    const [isFocus, setIsFocus] = useState(null);
    const dispatch = useDispatch();


  return (
    <SafeAreaView style={styles.container}>
      {props.isSex === "남" && props.isCloth === "상의" && (
        <SafeAreaView style={styles.cateContainer}>
          <Text style={[styles.sizeText, { marginBottom: 5 }]}>남자 상의</Text>

          <FlatList
            scrollEnabled={false}
            data={isData.manSize}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>{dispatch(selectUpper(item.size))
            props.setIsCloth(null)}}
              style={styles.sizeButton}>
                <Text style={styles.sizeText}>{item.size}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
      {props.isSex === "남" && props.isCloth === "하의" && (
        <SafeAreaView style={styles.cateContainer}>
          <Text style={[styles.sizeText, { marginBottom: 5 }]}>남자 하의</Text>

          <FlatList
            scrollEnabled={false}
            data={isData.manSize}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>{dispatch(selectLower(item.size))
                props.setIsCloth(null)}}
              style={styles.sizeButton}>
                <Text style={styles.sizeText}>{item.size}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
      {props.isSex === "남" && props.isCloth === "가디건" && (
        <SafeAreaView style={styles.cateContainer}>
          <Text style={[styles.sizeText, { marginBottom: 5 }]}>
            남자 가디건
          </Text>

          <FlatList
            scrollEnabled={false}
            data={isData.manSize}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>{dispatch(selectCardigan(item.size))
                props.setIsCloth(null)}}
              style={styles.sizeButton}>
                <Text style={styles.sizeText}>{item.size}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}

      {props.isSex === "여" && props.isCloth === "상의" && (
        <SafeAreaView style={styles.cateContainer}>
          <Text style={[styles.sizeText, { marginBottom: 5 }]}>여자 상의</Text>

          <FlatList
            scrollEnabled={false}
            data={isData.womanSize}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>{dispatch(selectUpper(item.size))
                props.setIsCloth(null)}}
              style={styles.sizeButton}>
                <Text style={styles.sizeText}>{item.size}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
      {props.isSex === "여" && props.isCloth === "하의" && (
        <SafeAreaView style={styles.cateContainer}>
          <Text style={[styles.sizeText, { marginBottom: 5 }]}>여자 하의</Text>

          <FlatList
            scrollEnabled={false}
            data={isData.womanSize}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>{dispatch(selectLower(item.size))
                props.setIsCloth(null)}}
              style={styles.sizeButton}>
                <Text style={styles.sizeText}>{item.size}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}

      {props.isSex === "여" && props.isCloth === "가디건" && (
        <SafeAreaView style={styles.cateContainer}>
          <Text style={[styles.sizeText, { marginBottom: 5 }]}>
            여자 가디건
          </Text>

          <FlatList
            scrollEnabled={false}
            data={isData.womanSize}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>{dispatch(selectCardigan(item.size))
                props.setIsCloth(null)}}
              style={styles.sizeButton}>
                <Text style={styles.sizeText}>{item.size}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

export default ClothSize

const styles = StyleSheet.create({
    container : {
        width : wp('95%'),
        alignSelf : 'center'
    },

    cateContainer : {
        backgroundColor : 'darkgray',
        marginVertical : 5,
        opacity : 0.7,
        width : wp('95%'),
        height : hp('20%')
    },

    sizeButton : {
        borderWidth : 1,
        height : hp('7%'),
        width : wp('22%'),
        justifyContent : 'center',
        alignItems : 'center',
        marginVertical : 3,
        marginHorizontal : 3,
    },

    sizeText : {
        fontSize : wp('4%'),
        textAlign : 'center'
    }
})