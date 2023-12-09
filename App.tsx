import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Dimensions, useColorScheme } from "react-native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace with your chosen icon set
import escapeRegExp from "escape-string-regexp";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

interface Button {
  text: string;
  value: string;
}

export default function App() {
  const colorScheme = useColorScheme();

  // const themeTextStyle =
  //   colorScheme === "light"
  //     ? styles.topContainerLightText
  //     : styles.topContainerDarkText;
  // const themeContainerStyle =
  //   colorScheme === "light"
  //     ? styles.topContainerLight
  //     : styles.topContainerDark;
  // const themeNumberButtonStyle =
  //   colorScheme === "light"
  //     ? styles.numberButtonsLight
  //     : styles.topContainerDark;
  // const buttonsOperatorsTwoTheme =
  //   colorScheme === "light"
  //     ? styles.buttonsOperatorsTwoLight
  //     : styles.topContainerDark;
  // const themeNumberButtonTextStyle =
  //   colorScheme === "light" ? styles.buttonTextLight : styles.topContainerDark;

  const [expression, setExpression] = useState("0");
  const [result, setResult] = useState("0");

  const handleButtonPress = (value: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setExpression((prevExpression) =>
      prevExpression === "0" ? value : prevExpression + value
    );
  };

  const handleEvaluate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      let sanitizedExpression = expression;

      verticalButtons.forEach((button) => {
        if (button.value) {
          const escapedText = escapeRegExp(button.text);
          sanitizedExpression = sanitizedExpression.replace(
            new RegExp(escapedText, "g"),
            button.value
          );
        }
      });

      horizontalButtons.forEach((button) => {
        if (button.value) {
          const escapedText = escapeRegExp(button.text);
          sanitizedExpression = sanitizedExpression.replace(
            new RegExp(escapedText, "g"),
            button.value
          );
        }
      });

      setResult(eval(sanitizedExpression).toString());
    } catch (error) {
      setResult("Error");
      console.log(error);
    }
  };

  const handleBackSpace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setExpression((prevExpression) => {
      const newExpression = prevExpression.slice(0, -1);
      if (newExpression === "") {
        setResult("0");
      }
      return newExpression === "" ? "0" : newExpression;
    });
  };

  const handleNegative = () => {};

  const handleClear = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setExpression("0");
    setResult("0");
  };

  const numbers = [
    { text: "9", value: "9" },
    { text: "8", value: "8" },
    { text: "7", value: "7" },
    { text: "6", value: "6" },
    { text: "5", value: "5" },
    { text: "4", value: "4" },
    { text: "3", value: "3" },
    { text: "2", value: "2" },
    { text: "1", value: "1" },
    { text: "0", value: "0" },
  ];

  const verticalButtons = [
    { text: "x", value: "*" },
    { text: "-", value: "-" },
    { text: "+", value: "+" },
  ];

  const horizontalButtons = [
    { text: "%", value: "%" },
    { text: "÷", value: "/" },
  ];

  const renderItem = ({ item }: { item: Button }): JSX.Element => (
    <TouchableOpacity
      style={[styles.button]}
      onPress={() => handleButtonPress(item.value)}
    >
      <Text style={[styles.buttonText]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  const renderVerticalButtons = ({ item }: { item: Button }): JSX.Element => (
    <TouchableOpacity
      style={[styles.buttonsOperatorsTwo]}
      onPress={() => handleButtonPress(item.text)}
    >
      <Text style={styles.buttonText}>{item.text}</Text>
    </TouchableOpacity>
  );

  const renderHorizontalButtons = ({ item }: { item: Button }): JSX.Element => (
    <TouchableOpacity
      style={[styles.buttonsOperatorsOne]}
      onPress={() => handleButtonPress(item.text)}
    >
      <Text style={[styles.buttonText]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      {/* Top Container for calculation side */}

      <View style={[styles.topContainer]}>
        <Text style={[styles.expression]}>{expression}</Text>
        <Text style={[styles.answer]}>{result}</Text>
      </View>

      {/* Gradient Strip */}
      <LinearGradient
        colors={["#A430FF", "#F318AD", "#FF2171"]}
        start={{ x: 0, y: 0.2 }}
        style={styles.purpleStrip}
      />

      {/* Bottom Section for all the buttons */}
      <View style={[styles.bottomContainer]}>
        {/* Utility bar is what containes the backspace button and others to come later on */}
        <View style={styles.utilityBar}>
          <TouchableOpacity onPress={handleBackSpace}>
            <Icon name="backspace" size={30} color="#937CE6" />
          </TouchableOpacity>
        </View>

        {/* Horizontal operators, are the operators with gray buttons */}
        <View style={styles.horizontalOperatorsContainer}>
          <TouchableOpacity
            style={[styles.buttonsOperatorsOne]}
            onPress={handleClear}
          >
            <Text style={[styles.buttonText]}>
              C
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonsOperatorsOne]}
            onPress={handleNegative}
          >
            <Text style={[styles.buttonText]}>
              +/-
            </Text>
          </TouchableOpacity>
          <FlatList
            data={horizontalButtons}
            renderItem={renderHorizontalButtons}
            keyExtractor={(item) => item.text}
            numColumns={2}
          />
        </View>

        {/* This section is for both the number buttons(in black) and the vertical operators(in blue) */}
        <View style={styles.horizontalOperatorsContainer}>
          <FlatList
            data={numbers}
            renderItem={renderItem}
            keyExtractor={(item) => item.text}
            numColumns={3}
          />
          <View style={styles.verticalOperatorsContainer}>
            <FlatList
              data={verticalButtons}
              renderItem={renderVerticalButtons}
              keyExtractor={(item) => item.text}
              numColumns={1}
            />

            <TouchableOpacity
              style={styles.buttonsOperatorsTwo}
              onPress={handleEvaluate}
            >
              <Text style={styles.buttonText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const responsiveFontSize = (size: number): number => {
  const baseWidth = 375;
  const scale = width / baseWidth;
  return Math.round(scale * size);
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  utilityBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: responsiveFontSize(10),
  },
  topContainer: {
    height: "25%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: responsiveFontSize(10),
    paddingTop: responsiveFontSize(45),
    paddingBottom: responsiveFontSize(40),
    paddingHorizontal: responsiveFontSize(20),
    backgroundColor: "#171C22",

  },
  topContainerLight: {
    backgroundColor: "#F3F2F5",
  },
  topContainerLightText: {
    color: "#828A93",
  },
  topContainerDark: {
    backgroundColor: "#171C22",
  },
  topContainerDarkText: {
    color: "#fff",
  },
  expression: {
    color: "#828A93",
    fontSize: responsiveFontSize(24),
    fontWeight: "400",
  },
  answer: {
    color: "#fff",
    fontSize: responsiveFontSize(52),
    fontWeight: "500",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#212A35",
    paddingVertical: responsiveFontSize(15),
    paddingHorizontal: responsiveFontSize(20),
  },
  buttonContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // gap: 10,
    width: "100%",
    backgroundColor: "#212A35",
  },
  horizontalOperatorsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // gap: 5
  },
  verticalOperatorsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    // gap: 10
  },
  lowerButtonsGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // gap: 10,
  },
  numberGrid: {
    display: "flex",
    flexDirection: "row",
    // flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    // gap: 10,
    // padding: 10
    // columnGap: 50
  },
  button: {
    borderRadius: 10,
    width: responsiveFontSize(75),
    height: responsiveFontSize(75),
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#171C22",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  numberButtonsLight: {
    backgroundColor: "#FFFFFF",
  },
  buttonsOperatorsOne: {
    borderRadius: 10,
    width: responsiveFontSize(75),
    height: responsiveFontSize(75),
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#2E3A48",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  buttonsOperatorsTwo: {
    borderRadius: 10,
    width: responsiveFontSize(75),
    height: responsiveFontSize(75),
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#6236F5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  buttonsOperatorsTwoLight: {
    backgroundColor: "#D9D8E0",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "600",
  },
  buttonTextLight: {
    color: "#19191B",
  },
  purpleStrip: {
    height: 10,
    width: "100%",
    backgroundColor: "#A430FF",
  },
});
