import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { TouchableOpacity } from 'react-native';
import useShare from '../forms/UseShare';
import { useNavigation } from '@react-navigation/native';

const SendingMsg = () => {
    const navigation = useNavigation();
    const [ yearSelect, setYearSelect] = useState(false);
    const [ isYear, setIsYear ] = useState('버튼');
    const [ isKind, setIsKind] = useState('');
    const [ isSex, setIsSex ] = useState('버튼');
    const [ sexSelect, setSexSelect ] = useState(false);

    const manImg = 'https://firebasestorage.googleapis.com/v0/b/shinproje.appspot.com/o/%EB%82%A8%EC%9E%90.jpg?alt=media&token=19042eac-0cc3-4660-8005-cdbec41d4f38'
    
    const womanImg = 'https://firebasestorage.googleapis.com/v0/b/shinproje.appspot.com/o/%EC%97%AC%EC%9E%90.jpg?alt=media&token=1965d474-a9e5-4e33-874e-096ffc4c6054';


    const yearButton = () => {
        setYearSelect(true)
    }

    const sexButton = () => {
        setSexSelect(true)
    }

    const goBack = () => {
        navigation.goBack();
        setIsYear('버튼')
        setIsSex('버튼')
    }
 

    useEffect(()=>{
        if(isYear === '1년'){
            setIsKind('치료복 상, 하의')
        }else if(isYear === '3년'){
            setIsKind('치료복 상, 하의 및 가디건')
        }else{
            setIsKind('')
        }
    })

    const share = useShare();

    const handleShare = () => {
       let imgUrl = isSex === '남자' ? manImg : womanImg
      share({
        url : `${manImg}`,
        message:`${headerMsg} \n ${descMsg} ${isYear}${descMsg2} \n ${kindMsg} ${descMsg3} \n\n 사이즈 참고 부탁드립니다. ${imgUrl}`,
      });
    };



    const headerMsg = '안녕하세요, 안신영입니다.'

    const descMsg = `입사일 기준으로`
    const descMsg2 = '이 되었습니다.'
    const kindMsg = `${isKind}의 신청여부 및 사이즈를`
    const descMsg3 = '저에게 카톡으로 보내주시면 감사하겠습니다.'

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>카톡 보내기</Text>

        <View style={styles.msgContainer}>
          
            <View style={styles.selectMsgContainer}>
              <Text>대상자의 성별은 무엇입니까?</Text>
              <TouchableOpacity onPress={sexButton} style={styles.buttonStyle}>
                <Text>{isSex}</Text>
              </TouchableOpacity>
              {sexSelect && (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsSex("남자");
                      setSexSelect(false);
                    }}
                    style={[styles.buttonStyle]}
                  >
                    <Text style={styles.textFont}>남자</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsSex("여자");
                      setSexSelect(false);
                    }}
                    style={[styles.buttonStyle]}
                  >
                    <Text style={styles.textFont}>여자</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

          <View style={styles.selectMsgContainer}>
            <Text>{headerMsg}</Text>
          </View>
          <View style={styles.selectMsgContainer}>
            <Text>{descMsg}</Text>

            <TouchableOpacity onPress={yearButton} style={styles.buttonStyle}>
              <Text>{isYear}</Text>
            </TouchableOpacity>
            <Text>{descMsg2}</Text>
            {yearSelect && (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsYear("1년");
                    setYearSelect(false);
                  }}
                  style={[styles.buttonStyle]}
                >
                  <Text style={styles.textFont}>1년</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsYear("3년");
                    setYearSelect(false);
                  }}
                  style={[styles.buttonStyle]}
                >
                  <Text style={styles.textFont}>3년</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.selectMsgContainer}>
            <Text>{kindMsg}</Text>
          </View>
          <View style={styles.selectMsgContainer}>
            <Text>{descMsg3}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={goBack}
                style={[styles.submitButton,{backgroundColor:'darkgray'}]}
            >
                <Text>취소하기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare}
                style={[styles.submitButton, {backgroundColor:'yellow'}]}
            >
                <Text>보내기</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
}

export default SendingMsg

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center'
    },

    headerText : {
        fontSize : wp('6%'),
        marginVertical : 20,
    },

    sexConatiner : {
        borderWidth : 1,
        height : hp('30%'),
        width : wp('90%'),
    },

    msgContainer : {
        borderWidth : 1,
        height : hp('55%'),
        width : wp('95%'),
        padding : (10, 10, 10, 10)
    },

    textFont : {
        fontSize : wp('4%')
    },

    selectMsgContainer : {
        width : wp('90%'),
        height : hp('5%'),
        flexDirection : 'row',
        alignItems : 'center',
        marginVertical : 10,
    },

    buttonStyle : {
        borderWidth : 1,
        height : hp('4%'),
        width : wp('10%'),
        marginHorizontal : 10,
        justifyContent : 'center',
        alignItems : 'center'
    },

    imgStyle : {
        height : hp('25%'),
        width : wp('40%')
    },

    buttonContainer : {
        height : hp('10%'),
        width : wp('95%'),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-around'
    },

    submitButton : {
        height : hp('5'),
        width : wp('40%'),
        justifyContent : 'center',
        alignItems : 'center',
        elevation : 3,
        opacity : 0.7
    }
})