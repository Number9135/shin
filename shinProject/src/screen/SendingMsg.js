import React, { useEffect } from 'react';
import { 
  TouchableOpacity, 
  View,
  Text
} from 'react-native';
import PushNotification from "react-native-push-notification";

export default function App() {
  useEffect(()=>{
    createChannels();
  })

  const createChannels=()=>{
    PushNotification.createChannel(
      {
        channelId:"test-channel",
        channelName:"test Channel"
      }
    )
  }
  const handleNotification=()=>{
    PushNotification.cancelAllLocalNotifications()

    PushNotification.localNotification({
      channelId:"test-channel",
      title: "you click text",
      message:"message"
    })

    PushNotification.localNotificationSchedule({
      channelId:"test-channel",
      title:"Alerm",
      message:"5 seconds pass",
      date: new Date(Date.now() + 5*1000),
      allowWhileIdle: true
    })
  }

  return (
    <TouchableOpacity
      onPress={()=>{handleNotification()}}
    >
      <View>
        <Text>click text</Text>
      </View>
    </TouchableOpacity>
  )
}
