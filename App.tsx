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
  const [expression, setExpression] = useState('0');
  const [result, setResult] = useState('0');

  const handleButtonPress = (value: any) => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const handleEvaluate = () => {
    try {
      setResult(eval(expression).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const numbers = [
    { text: "1", value: "1" },
    { text: "2", value: "2" },
    { text: "3", value: "3" },
    { text: "4", value: "4" },
    { text: "5", value: "5" },
    { text: "6", value: "6" },
    { text: "7", value: "7" },
    { text: "8", value: "8" },
    { text: "9", value: "9" },
    { text: "0", value: "0" },
    { text: "+", value: "+" },
    { text: "-", value: "-" },
    { text: "x", value: "*" },
    { text: "/", value: "/" },
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
        <FlatList
          data={numbers}
          renderItem={renderItem}
          keyExtractor={(item) => item.text}
          numColumns={4}
          // contentContainerStyle={styles.numberGrid}
        />
        <View style={styles.horizontalOperatorsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEvaluate}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        </View>
    
        {/* <View style={styles.buttonContainer}>
          <View style={styles.horizontalOperatorsContainer}>
            {horizontalOperators.map((button) => (
              <TouchableOpacity style={styles.button} key={button.text}>
                <Text style={styles.buttonText}>{button.text}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.lowerButtonsGroup}>
            <View style={styles.numberGrid}>
              {numbers.map((button) => (
                <TouchableOpacity style={styles.button} key={button.text}>
                  <Text style={styles.buttonText}>{button.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <FlatList 
              data={numbers}
              renderItem={renderItem}
              keyExtractor={(item) => item.text}
              numColumns={1}
              contentContainerStyle={styles.numberGrid}
            />
            <View style={styles.verticalOperatorsContainer}>
              {verticalOperators.map((button) => (
                <TouchableOpacity style={styles.button} key={button.text}>
                  <Text style={styles.buttonText}>{button.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View> */}
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const responsiveFontSize = (size: number): number => {
  const baseWidth = 375; // Base width for your design
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
    width: "100%",
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
    // gap: 10
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
