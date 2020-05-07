import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Calendar from './components/Calendar';
import CarouselCalendar from './components/CarouselCalendar'
export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <Calendar/> */}
      <CarouselCalendar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
