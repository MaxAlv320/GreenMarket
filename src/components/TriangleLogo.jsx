import { StyleSheet, View } from "react-native";

const TriangleLogo = () => {
  return <View style={styles.triangle} />;
};

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",

    borderLeftWidth: 35,
    borderRightWidth: 35,
    borderBottomWidth: 60,

    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#666",
  },
});

export default TriangleLogo;
