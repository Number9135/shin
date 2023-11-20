import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ClothSize, { upperClothSize } from '../forms/ClothSize';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCardigan, selectLower, selectUpper } from '../redux/ClothSlice';
import { auth, firebase_db } from '../../firebaseConfig';

const WriteScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [isSex, setIsSex] = useState(null);
    const [isYear, setIsYear] = useState('');
    const [isMonth, setIsMonth] = useState('');
    const [isDay, setIsDay] = useState('');
    const [errMsg, setErrMsg] = useState(null);
    const [isDepart, setIsDepart] = useState(null);
    const [isMajor, setIsMajor] = useState(null);
    const [isFloor, setIsFloor] = useState(null);
    const [isCloth, setIsCloth] = useState(null);

    const upperSize = useSelector((state)=>state.cloth.upperSize);
    const lowerSize = useSelector((state)=>state.cloth.lowerSize);
    const cardigan = useSelector((state)=>state.cloth.cardigan);

 
    const alert = () => {
        Alert.alert('업데이트 성공!', '화면을 닫고 이전화면으로 이동합니다.', [{
            text : "이전화면으로 이동",
            onPress : ()=> {navigation.goBack()}
        }])
    }
   

    const submit = async() => {
        try{
            if (
              name !== "" &&
              isSex !== null &&
              isYear !== "" &&
              isMonth !== "" &&
              isDay !== "" &&
              isMajor !== null &&
              isFloor !== null &&
              upperSize !== null &&
              lowerSize !== null &&
              cardigan !== null
            ) {
              await firebase_db.ref("userInfo").push({
                Name: name,
                Sex: isSex,
                JoinDate: `${isYear} - ${isMonth} - ${isDay}`,
                CheckDate: `${isYear} - ${isMonth} - ${isDay}`,
                Major: isMajor,
                Floor: isFloor,
                UpperSize: upperSize,
                LowerSize: lowerSize,
                Cardigan: cardigan,
              }).then(()=>{
                alert()
                
                    setName(''),
                    setIsSex(null)
                    setIsYear('')
                    setIsMonth('')
                    setIsDay('')
                    setIsMajor(null)
                    setIsFloor(null)
                    dispatch(selectUpper(null))
                    dispatch(selectLower(null))
                    dispatch(selectCardigan(null)) 
              })
            }else{
                setErrMsg('빈칸');
                console.log('빈칸 에러')
            }
        }catch{
            console.log('업데이트 실패')
        }
    }


    useEffect(()=>{
        const dateRegex = new RegExp('^[0-9]*$')
        if(isYear.match(dateRegex)){
            setErrMsg(null)
            if(isMonth.match(dateRegex)){
                setErrMsg(null)
                if( isDay.match(dateRegex)){
                    setErrMsg(null)
                }else{
                    setErrMsg('잘못된 형식')
                }
            }else{
                setErrMsg('잘못된 형식')
            }
        }else{
            setErrMsg('잘못된 형식')
        }
    }, [isYear, isMonth, isDay])

    const selectDepart = (depart) => {
        setIsDepart(depart)
    }

    const selectSex = (sex) => {
        setIsSex(sex)
    }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.headerText}>사용자 정보 추가하기</Text>
      </View>
      <View style={[styles.infoContainer, { paddingRight: 30 }]}>
        <Text style={styles.cateText}>이름</Text>
        <TextInput
          style={[styles.textinputStyle, {borderWidth:1,}]}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.cateText}>성별</Text>
        <View
          style={[
            styles.textinputStyle,
            {
              marginRight: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => setIsSex("남")}
            style={[
              styles.selectSexButton,
              isSex === "남" && { backgroundColor: "lightblue" },
            ]}
          >
            <Ionicons name="man" size={wp("4%")} color="black" />
            <Text style={{ fontSize: wp("4%"), marginLeft: 5 }}>남</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => selectSex("여")}
            style={[
              styles.selectSexButton,
              isSex === "여" && { backgroundColor: "lightblue" },
            ]}
          >
            <Ionicons name="woman" size={wp("4%")} color="black" />
            <Text style={{ fontSize: wp("4%"), marginLeft: 5 }}>여</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.cateText}>입사일</Text>
        <View style={[styles.joinDateContainer]}>
          <TextInput
            style={styles.inputJoinDateStyle}
            value={isYear}
            onChangeText={setIsYear}
            maxLength={4}
          />
          <Text style={[styles.cateText, { marginHorizontal: 5 }]}>년</Text>
          <TextInput
            style={styles.inputJoinDateStyle}
            value={isMonth}
            maxLength={2}
            onChangeText={setIsMonth}
          />
          <Text style={[styles.cateText, { marginHorizontal: 5 }]}>월</Text>
          <TextInput
            style={styles.inputJoinDateStyle}
            value={isDay}
            maxLength={2}
            onChangeText={setIsDay}
          />
          <Text style={[styles.cateText, { marginLeft: 5 }]}>일</Text>
        </View>
      </View>
      {errMsg === "잘못된 형식" && (
        <Text style={{ fontSize: wp("4%"), color: "red" }}>
          형식이 잘못되었습니다.
        </Text>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.cateText}>소 속</Text>

        <View
          style={[
            styles.textinputStyle,
            {
              marginRight: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            },
          ]}
        >
          {isMajor ? (
            <TouchableOpacity
              onPress={() => setIsMajor(null)}
              style={[styles.selectSexButton]}
            >
              <Text style={{ fontSize: wp("4%") }}>{isMajor}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                selectDepart("직종");
              }}
              style={[styles.selectSexButton]}
            >
              <Text style={{ fontSize: wp("4%") }}>직 종</Text>
            </TouchableOpacity>
          )}
          {isFloor ? (
            <TouchableOpacity
              onPress={() => {
                setIsFloor(null);
              }}
              style={[styles.selectSexButton]}
            >
              <Text style={{ fontSize: wp("4%") }}>{isFloor}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsDepart("층수")}
              style={[styles.selectSexButton]}
            >
              <Text style={{ fontSize: wp("4%") }}>층 수</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isDepart === "직종" && (
        <View style={styles.majorContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsMajor("PT");
              setIsDepart(null);
            }}
            style={styles.selectSexButton}
          >
            <Text style={{ fontSize: wp("4%") }}>PT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsMajor("OT");
              setIsDepart(null);
            }}
            style={styles.selectSexButton}
          >
            <Text style={{ fontSize: wp("4%") }}>OT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsMajor("ST");
              setIsDepart(null);
            }}
            style={styles.selectSexButton}
          >
            <Text style={{ fontSize: wp("4%") }}>ST</Text>
          </TouchableOpacity>
        </View>
      )}
      {isDepart === "층수" && (
        <View style={styles.majorContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsFloor("4층");
              setIsDepart(null);
            }}
            style={styles.selectSexButton}
          >
            <Text style={{ fontSize: wp("4%") }}>4층</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsFloor("6층");
              setIsDepart(null);
            }}
            style={styles.selectSexButton}
          >
            <Text style={{ fontSize: wp("4%") }}>6층</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.cateText}>사이즈</Text>
        <View
          style={[
            styles.joinDateContainer,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            },
          ]}
        >
            {
                upperSize !== null && (
                    <TouchableOpacity
            onPress={() => dispatch(selectUpper(null))}
            style={[styles.selectSexButton]}
          >
            <Text style={{ fontSize: wp("4%") }}>{upperSize}</Text>
          </TouchableOpacity>
                )
            }
            {
                upperSize == null && (
                    <TouchableOpacity
            onPress={() => setIsCloth("상의")}
            style={[styles.selectSexButton, isCloth === '상의' && {backgroundColor:'lightblue'}]}
          >
            <Text style={{ fontSize: wp("4%") }}>상 의</Text>
          </TouchableOpacity>
                )
            }
           {
                lowerSize !== null && (
                    <TouchableOpacity
            onPress={() => dispatch(selectLower(null))}
            style={[styles.selectSexButton]}
          >
            <Text style={{ fontSize: wp("4%") }}>{lowerSize}</Text>
          </TouchableOpacity>
                )
            }
            {
                lowerSize == null && (
                    <TouchableOpacity
            onPress={() => setIsCloth("하의")}
            style={[styles.selectSexButton, isCloth === '하의' && {backgroundColor:'lightblue'}]}
          >
            <Text style={{ fontSize: wp("4%") }}>하 의</Text>
          </TouchableOpacity>
                )
            }
            {
                cardigan !== null && (
                    <TouchableOpacity
            onPress={() => dispatch(selectCardigan(null))}
            style={[styles.selectSexButton]}
          >
            <Text style={{ fontSize: wp("4%") }}>{cardigan}</Text>
          </TouchableOpacity>
                )
            }
            {
                cardigan == null && (
                    <TouchableOpacity
            onPress={() => setIsCloth("가디건")}
            style={[styles.selectSexButton, isCloth === '가디건' && {backgroundColor:'lightblue'}]}
          >
            <Text style={{ fontSize: wp("4%") }}>가디건</Text>
          </TouchableOpacity>
                )
            }

          
        </View>
      </View>

      {(isCloth === "상의" || isCloth === "하의" || isCloth === "가디건") && (
        <ClothSize isSex={isSex} isCloth={isCloth} setIsCloth={setIsCloth} />
      )}
      <View style={styles.submitContainer}>
        <TouchableOpacity onPress={submit}
        style={[styles.buttonStyle, {backgroundColor:'yellow'}]}>
          <Text style={styles.buttonText}>올리기</Text>
        </TouchableOpacity>
        {
            errMsg === '빈칸' && (
                <Text style={{fontSize:wp('4%'), color:'red'}}>모든 칸을 채워주십시오.</Text>
            )
        }
        <TouchableOpacity style={[styles.buttonStyle, {backgroundColor:'darkgray'}]}>
          <Text style={styles.buttonText}>돌아가기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default WriteScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },

    headerText : {
        fontSize : wp('7%'),
        marginVertical : 20,
    },

    infoContainer : {
        borderBottomWidth : 1,
        height : hp('10%'),
        width : wp('95%'),
        alignSelf : 'center',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },

    cateText : {
        fontSize : wp('4%')
    },

    textinputStyle : {
        height : hp('7%'),
        width : wp('70%'),
        borderRadius : 5,
        fontSize : wp('4%'),
        paddingLeft : 10,
    },

    selectSexButton : {
        borderWidth : 1,
        height : hp('6%'),
        width : wp('25%'),
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
    },

    inputJoinDateStyle : {
        borderWidth : 1,
        height : hp('5%'),
        width : wp('20%'),
        borderRadius : 5,
        fontSize : wp('4%'),
        textAlign :'center'
    },

    joinDateContainer : {
        height : hp('7%'),
        width : wp('78%'),
        borderRadius : 5,
        fontSize : wp('4%'),
        flexDirection:'row', 
        alignItems:'center',
        justifyContent : 'flex-start'
    },

    majorContainer :{
        backgroundColor : 'darkgray',
        marginVertical : 5,
        opacity : 0.7,
        height : hp('7%'),
        width : wp('95%'),
        alignSelf : 'center',
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center'
    },

    submitContainer : {
        width : wp('95%'),
        height : hp('17%'),
        alignSelf : 'center',
        marginVertical : 10,
        justifyContent : 'space-around',
        alignItems : 'center'
    },

    buttonStyle : {
        height : hp('6%'),
        width : wp('85%'),
        borderRadius : 5,
        justifyContent : 'center',
        alignItems : 'center',
        opacity : 0.8,
        elevation : 3
    },

    buttonText : {
        fontSize : wp('5%')
    }

})