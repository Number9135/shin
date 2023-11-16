import { useEffect, useState } from "react";
import { firebase_db } from "../../firebaseConfig";
import moment from "moment";

const [isAlram, setIsAlram] = useState(null)


useEffect(()=>{
    firebase_db.ref('userInfo').on('value', (snapshot)=>{
        let data = snapshot.val();
        for (let key in data) {
            const joinDate = data[key].JoinDate;
            const joinDateArr = joinDate.split("-")
            const newJoinDate = new Date(joinDateArr[0], joinDateArr[1]-1, joinDateArr[2])
            const compareJoinDate = new Date(joinDateArr[0], joinDateArr[1]-1, joinDateArr[2]-7)
            let currentDate = moment()
            let oneYearLater = new Date(newJoinDate.getFullYear + 1, newJoinDate.getMonth, newJoinDate.getDay)
            let compareDate = moment(oneYearLater).diff(currentDate, 'days')
            let threeYearLater = moment(currentDate).diff(compareJoinDate, 'year')
            if(compareDate === 7){
                firebase_db.ref('requestPredestinator').push(data[key])
                 if(Number.isInteger(threeYearLater%3) === true){
                    setIsAlram('3년')
                }else{
                    setIsAlram('1년')
                }
            }
        }
    })
})


