import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import data from '../../data.json';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { firebase_db } from '../../firebaseConfig';

const SizeModal = ({modalVisible, closeModal, setIsUpperSize, setIsLowerSize,updateClothSizeHandler ,setIsCardigan}) => {

    const [ isSelectSex, setIsSelectSex ] = useState(null);
    const [ isData, setIsData ] = useState(data);
    const [ numColumns, setNumColumns ] = useState(3);
    const [ isUpperFocus, setIsUpperFocus ] = useState('');
    const [ isLowerFocus, setIsLowerFocus ] = useState('');
    const [ isCardiganFocus, setIsCardiganFocus ] = useState('');

   
   

  return (
    <Modal visible={modalVisible}>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            onPress={() => setIsSelectSex("남")}
            style={[
              styles.menuButton,
              isSelectSex === "남" && {
                backgroundColor: "darkgray",
                opacity: 0.7,
              },
            ]}
          >
            <Text style={styles.textFont}>남자</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsSelectSex("여")}
            style={[
              styles.menuButton,
              isSelectSex === "여" && {
                backgroundColor: "darkgray",
                opacity: 0.7,
              },
            ]}
          >
            <Text style={styles.textFont}>여자</Text>
          </TouchableOpacity>
        </View>

        <View style={{ borderWidth: 1, flex: 1, flexDirection: "row" }}>
          <View style={styles.kindContainer}>
            <Text style={styles.textFont}>상의</Text>
            <Text style={[styles.textFont, {marginTop:10,}]}>({isUpperFocus})</Text>
          </View>
          <View style={styles.dataContainer}>
            {isSelectSex === "남" && (
              <FlatList
                scrollEnabled={false}
                data={isData.manSize}
                numColumns={numColumns}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=>{setIsUpperSize(item.size)
                setIsUpperFocus(item.size)}}
                  style={styles.cateButton}>
                    <Text style={styles.textFont}>{item.size}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            )}

            {isSelectSex === "여" && (
              <FlatList
                scrollEnabled={false}
                data={isData.womanSize}
                numColumns={numColumns}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=>{setIsUpperSize(item.size)
                    setIsUpperFocus(item.size)}}
                  style={styles.cateButton}>
                    <Text style={styles.textFont}>{item.size}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
        </View>

        <View style={{ borderWidth: 1, flex: 1, flexDirection: "row" }}>
          <View style={styles.kindContainer}>
            <Text style={styles.textFont}>하의</Text>
            <Text style={[styles.textFont, {marginTop:10,}]}>({isLowerFocus})</Text>
          </View>
          <View style={styles.dataContainer}>
            {isSelectSex === "남" && (
              <FlatList
                scrollEnabled={false}
                data={isData.manSize}
                numColumns={numColumns}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=>{setIsLowerSize(item.size)
                    setIsLowerFocus(item.size)}}
                  style={styles.cateButton}>
                    <Text style={styles.textFont}>{item.size}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            )}
            {isSelectSex === "여" && (
              <FlatList
                scrollEnabled={false}
                data={isData.womanSize}
                numColumns={numColumns}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=>{setIsLowerSize(item.size)
                    setIsLowerFocus(item.size)}}
                  style={styles.cateButton}>
                    <Text style={styles.textFont}>{item.size}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
        </View>

        <View style={{ borderWidth: 1, flex: 1, flexDirection: "row" }}>
          <View style={styles.kindContainer}>
            <Text style={styles.textFont}>가디건</Text>
            <Text style={[styles.textFont, {marginTop:10,}]}>({isCardiganFocus})</Text>
          </View>
          <View style={styles.dataContainer}>
            {isSelectSex === "남" && (
              <FlatList
                scrollEnabled={false}
                data={isData.manSize}
                numColumns={numColumns}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=>{setIsCardigan(item.size)
                    setIsCardiganFocus(item.size)}}
                  style={styles.cateButton}>
                    <Text style={styles.textFont}>{item.size}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            )}
            {isSelectSex === "여" && (
              <FlatList
                scrollEnabled={false}
                data={isData.womanSize}
                numColumns={numColumns}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=>{setIsCardigan(item.size)
                    setIsCardiganFocus(item.size)}}
                  style={styles.cateButton}>
                    <Text style={styles.textFont}>{item.size}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
        </View>
        <View style={styles.closeContainer}>
            <TouchableOpacity onPress={closeModal}
            style={styles.closeButton}>
            <Entypo name="cross" size={wp('6%')} color="black" /> 
            <Text style={styles.textFont}>닫기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={updateClothSizeHandler}
            style={styles.closeButton}>
            <AntDesign name="plus" size={wp('6%')} color="black" />
            <Text style={styles.textFont}>올리기</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default SizeModal

const styles = StyleSheet.create({
    container : {
        height : hp('95%'),
        width : wp('90%'),
        alignSelf : 'center'
    },

    menuContainer : {
        borderBottomWidth : 1,
        height : hp('8%'),
        width : wp('90%'),
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center'
    },

    textFont : {
        fontSize : wp('4.5%')
    },

    menuButton : {
        borderWidth : 1,
        height : hp('7%'),
        width : wp('40%'),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
    },

    dataContainer : {
        borderLeftWidth : 1,
        flex : 3,
        justifyContent : 'center',
        alignItems : 'center',
        paddingTop : 10,
    },

    kindContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },

    cateButton : {
        borderWidth  :1,
        height : hp('7%'),
        width : wp('20%'),
        margin : 2,
        justifyContent : 'center',
        alignItems : 'center'
    },

    closeContainer : {
        borderWidth : 1,
        height : hp('10%'),
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'space-around'
    },

    closeButton : {
        borderWidth : 1,
        height : hp('7%'),
        width : wp('30%'),
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'center'
    }

})