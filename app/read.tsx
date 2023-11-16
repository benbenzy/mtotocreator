import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemeText, ThemeView } from "../components/Themed";

const read = () => {
  return (
    <ThemeView>
      <ThemeText>read</ThemeText>
    </ThemeView>
  );
};

export default read;

const styles = StyleSheet.create({});
