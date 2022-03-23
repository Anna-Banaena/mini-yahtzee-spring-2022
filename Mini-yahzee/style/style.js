import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    paddingTop: 30,
    marginTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E3DAC9",
    justifyContent: "center",
  },

  scrollView: {
    marginTop: Constants.statusBarHeight,
    paddingTop: 30,
  },

  mainboardContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
 
  heading: {
    marginTop: 10,
    marginBottom: 80,
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center",
    color: "#F4BBFF",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#F4BBFF",

  },
  footer: {
    fontSize: 10,
    color: "#C5C5C5",
    textAlign: "center",
    marginTop: 80,
  },
  button: {
    width: '95%',
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    paddingHorizontal: 45,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#F4BBFF",
    marginBottom: 50,
  },
  diceRow: {
    flexDirection: "row",
    height: 80,
    justifyContent: "center",
    alignItems: "center",

  },

  selection: {
    flexDirection: "row",

  },
  scoreText: {
    fontSize: 20,
    textAlign: "center",


  },
  text: {
    fontSize: 15,
    fontStyle: "italic",
    marginBottom: 50,
  },
  status: {
    fontSize: 20,
    textAlign: "center",
    height: 50,
    fontStyle: "italic",
    fontWeight: "bold",

  },
});