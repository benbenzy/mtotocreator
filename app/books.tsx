/** @format */

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ThemeText, ThemeView } from "../components/Themed";
import { useSelector } from "react-redux";
import { COLORS, SIZES } from "../constants";
import { Book } from "../interface";
import { useRouter } from "expo-router";

const Books = () => {
  const books = useSelector((state: any) => state.books.draftBooks);
  const router = useRouter();
  const booksData = [
    {
      id: 1,
      title: "hello home",
      prologue: "i live home in the house",
      image: "",
      price: "100",
      category: "home",
      author: "britney",
      publisher: "skivet",
      chapters: [{ key: "chapter 1", title: "the home deal", content: [] }],
    },
  ];
  return (
    <ThemeView style={styles.mainContainer}>
      <FlatList
        data={booksData}
        renderItem={({ item, index }) => {
          return (
            <View>
              <Text>{item.title}</Text>
            </View>
          );
        }}
      />
      <TouchableOpacity
        onPress={() => {
          router.push("createBook");
        }}
        style={{
          alignSelf: "center",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.gray3,
          width: 250,
          bottom: 20,
          height: 60,
          borderRadius: SIZES.radius,
        }}>
        <Text>create new</Text>
      </TouchableOpacity>
    </ThemeView>
  );
};

export default Books;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
