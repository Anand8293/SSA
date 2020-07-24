import { StyleSheet } from "react-native";

const { Colors } = require("react-native/Libraries/NewAppScreen");

export const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.dark,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.black,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.white,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 16,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });
  