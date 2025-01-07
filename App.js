import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"]

export default function App() {

  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  //console.log(currentTime);

  useEffect(() => {
    let interval = null;

    if (isActive) {

      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)

    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      /*       setIsActive(false);
            setIsWorking((prev) => !prev);
            setTime(isWorking ? 300 : 1500); */

      setIsActive(false);
      if (currentTime === 0) {
        setTime(1500)
      } else if (currentTime === 1) {
        setTime(300)
      } else {
        setTime(900)
      }

    }

    return () => {
      clearInterval(interval);
    }
  }, [isActive, time])

  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/short-beep-tone-47916.mp3')
    )
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: Platform.OS === 'android' && 30 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header currentTime={currentTime} setCurrentTime={setCurrentTime} setTime={setTime} />
        <Timer time={time} />
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{ fontWeight: 'bold', color: "white" }}>{isActive ? "Stop" : "Start"} </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, text: { fontSize: 32, fontWeight: 'bold' }, button: { alignItems: 'center', backgroundColor: "#333333", padding: 15, margin: 15, borderRadius: 15 }
});