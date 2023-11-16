/** @format */ /** @format */

import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlan } from "../store/plans/planSlice";
import { Book, Plan } from "../interface";
import { ThemeText, ThemeView } from "../components/Themed";
import { COLORS, Colors, FONTS } from "../constants";

import InputComponent from "../components/InputComponent";
import { FontAwesome } from "@expo/vector-icons";
import { usePlanActions } from "../lib/firebae/planActions";
import { useRouter } from "expo-router";
import { addBook } from "../store/books/bookSlice";

const WIDTH = Dimensions.get("window").width;

export default function CreateBook() {
  const colorScheme = useColorScheme();
  const plans = useSelector((state: any) => state.plans.draftPlans);
  const dispatch = useDispatch();
  const [planId, setPlanId] = useState("");
  const [title, setTitle] = useState("");
  const [prologue, setPrologue] = useState("");
  const [price, setPrice] = useState("0");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(false);
  const [category, setCategory] = useState("uncategorized");
  const [content, setContent] = useState([]);
  const [error, setError] = useState("");

  const [chooseCategory, setChooseCategory] = useState(false);
  const [categoryData, setCategoryData] = useState([
    { id: 1, name: "parenting" },
    { id: 2, name: "child development" },
    { id: 3, name: "technology" },
    { id: 4, name: "business pychology" },
    { id: 5, name: "management pychology" },
    { id: 6, name: "teaching pychology" },
    { id: 7, name: "guidance and councelling pychology" },
    { id: 8, name: "spiritual" },
    { id: 9, name: "self building" },
    { id: 10, name: "business" },
  ]);

  const { createPlan, selectImage, uploadImage } = usePlanActions();
  const book: Book = {
    title,
    prologue,
    image,
    price,
    category,
    chapters: [],
    id: plans.length + 1,
    author: "",
    publisher: "",
  };
  const router = useRouter();

  const disabled = !title || !prologue || !price;

  return (
    <ThemeView style={styles.main}>
      {progress && (
        <ActivityIndicator
          size={"large"}
          color={COLORS.primary}
          animating={progress}
        />
      )}

      <ThemeText style={{ color: "red" }}>{error}</ThemeText>
      <ScrollView>
        <InputComponent
          title={"title"}
          placeholder={"plan Title"}
          value={title}
          setValue={setTitle}
        />
        <InputComponent
          title={"description"}
          placeholder={"plan description"}
          value={prologue}
          setValue={setPrologue}
        />
        <InputComponent
          title={"price"}
          placeholder={"price"}
          value={price}
          setValue={setPrice}
          textInputProps={{ keyboardType: "numeric" }}
        />
        <View>
          <ThemeText
            style={{
              textTransform: "uppercase",
              ...FONTS.h3,
              fontWeight: "normal",
            }}>
            Category :
          </ThemeText>
          <TouchableOpacity
            style={{
              backgroundColor: Colors[colorScheme ?? "dark"].tabIconDefault,
              height: 60,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() => {
              setChooseCategory(!chooseCategory);
            }}>
            <ThemeText style={{}}>{category}</ThemeText>
            <FontAwesome
              name="sort-down"
              size={24}
              color={Colors[colorScheme ?? "dark"].text}
            />
          </TouchableOpacity>
          {chooseCategory && (
            <View style={{ position: "relative" }}>
              {categoryData.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={`drop_item${item.id}`}
                    onPress={() => {
                      setCategory(item.name), setChooseCategory(false);
                    }}
                    style={{ marginVertical: 5 }}>
                    <ThemeText>{item.name}</ThemeText>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        <View style={{ height: 200 }} />
      </ScrollView>
      <TouchableOpacity
        disabled={disabled}
        onPress={
          () => {
            const res = dispatch(addBook(book));
            //console.log(res.payload);
            if (res) {
              router.replace({
                pathname: "/addContent",
                params: { id: res.payload.id, draft: true },
              });
            }
          }
          //submitPlan
        }
        style={[
          styles.button,
          { backgroundColor: disabled ? "lightgray" : "white" },
        ]}>
        <ThemeText
          style={[styles.title, { color: disabled ? "white" : "black" }]}>
          continue
        </ThemeText>
      </TouchableOpacity>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
  },
  input: {
    backgroundColor: "#fff",
    width: Dimensions.get("window").width - 20,
    height: 50,
    borderRadius: 10,
  },
  button: {
    position: "absolute",
    bottom: 5,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    width: WIDTH - 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
