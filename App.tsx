import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Dimensions } from "react-native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";

interface Button {
  text: string;
  value: string;
}

export default function App() {
  const [expression, setExpression] = useState("0");
  const [result, setResult] = useState("0");

  const handleButtonPress = (value: any) => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const handleEvaluate = () => {
    try {
      setResult(eval(expression).toString());
    } catch (error) {
      setResult("Error");
    }
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
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
    // { text: "+", value: "+" },
    // { text: "-", value: "-" },
    // { text: "x", value: "*" },
    // { text: "/", value: "/" },
    // { text: "=", value: "=" },
    // { text: "C", value: "C" },
  ];

  const renderItem = ({ item }: { item: Button }): JSX.Element => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleButtonPress(item.value)}
    >
      <Text style={styles.buttonText}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.expression}>{expression}</Text>
        <Text style={styles.answer}>{result}</Text>
      </View>
      <View style={styles.purpleStrip}></View>
      <View style={styles.bottomContainer}>
        <View style={styles.horizontalOperatorsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonsOperatorsTwo}>
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalOperatorsContainer}>
          <FlatList
            data={numbers}
            renderItem={renderItem}
            keyExtractor={(item) => item.text}
            numColumns={3}
          />
          <View style={styles.verticalOperatorsContainer}>
            <TouchableOpacity style={styles.buttonsOperatorsTwo} onPress={() => handleButtonPress('*')}>
              <Text style={styles.buttonText}>x</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonsOperatorsTwo} onPress={() => handleButtonPress('-')}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonsOperatorsTwo} onPress={() => handleButtonPress('+')}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

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
    backgroundColor: "#171C22",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    padding: responsiveFontSize(20),
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
    backgroundColor: "#2E3A48",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  // buttonsOperatorsOne: {
  //   borderRadius: 10,
  //   width: responsiveFontSize(75),
  //   height: responsiveFontSize(75),
  //   paddingHorizontal: 15,
  //   paddingVertical: 12,
  //   backgroundColor: "#3E345A",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   margin: 5,
  // },
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
  buttonText: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "600",
  },
  purpleStrip: {
    height: 10,
    width: "100%",
    backgroundColor: "#A430FF",
  },
});
