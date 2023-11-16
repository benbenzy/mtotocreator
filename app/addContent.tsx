/** @format */

import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter, useSearchParams } from "expo-router";
import Colors from "../constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { ThemeText, ThemeView } from "../components/Themed";
import icons from "../constants/icons";
import { usePlanActions } from "../lib/firebae/planActions";
import { useDispatch, useSelector } from "react-redux";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Plan } from "../interface";
import {
  deleteContent,
  deleteQuiz,
  updateImage,
  updatePlan,
} from "../store/plans/planSlice";

const addContent = () => {
  const params = useSearchParams();
  const { id, draft } = params;
  //console.log("id", id, draft);
  const router = useRouter();
  const { selectImage, createPlan, uploadImage } = usePlanActions();

  const dispatch = useDispatch();

  //const [loading, setLoadig] = React.useState(true)
  const [upload, setUpload] = React.useState(true);
  const isDarkMode = useColorScheme() === "dark";
  const colorScheme = useColorScheme();

  const [selectedItem, setSelectedItem] = useState<Plan>({
    id: "",
    thumbnail: "",
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
    content: [],
  });
  const [showQuizes, setShowQuizes] = useState<Number | undefined | String>();
  //const [editable, setEditable] = useState(false);

  const draftPlans: Plan[] = useSelector(
    (state: any) => state?.plans?.draftPlans
  );

  React.useEffect(() => {
    const unsub = () => {
      if (draft == "true" && id) {
        draftPlans.find((item: Plan) => {
          if (item.id == id) {
            setSelectedItem(item);
            setUpload(false);
          }
        });
      } else if (draft == "false" && id) {
        //console.log("i am loading online")
        onSnapshot(doc(db, "plans", `${id}`), (snapshot) => {
          if (snapshot.exists()) {
            //  console.log("your item", snapshot.data());
            const data: Plan | any = snapshot.data();
            setSelectedItem(data);
            setUpload(false);
          }
        });
      }
    };

    unsub();
  }, [router]);

  // edit plan function
  function editPlan() {
    router.push({
      pathname: "/planEditor",
      params: {
        id: selectedItem?.id,
        itemTitle: "",
        title: selectedItem.title,
        description: selectedItem.description,
      },
    });
  }
  // edit content
  function editContent(itemTitle: any) {
    router.push({
      pathname: "/planEditor",
      params: {
        id: selectedItem?.id,
        itemTitle: itemTitle,
        title: "",
        description: "",
      },
    });
  }
  //new content
  function newContent() {
    router.push({
      pathname: "/planEditor",
      params: {
        id: selectedItem?.id,
        itemTitle: "",
        title: "",
        description: "",
      },
    });
  }

  return (
    <ThemeView style={styles.main}>
      <Stack.Screen
        options={{
          title: `${selectedItem?.title}`,
          headerTitle: `${selectedItem?.title}`,
          headerTitleStyle: {
            color: isDarkMode ? "white" : "black",
            fontSize: 20,
          },
          headerRight: () => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setUpload(true);
                  createPlan(selectedItem)
                    .then((res: any) => {
                      console.log("pan res", res);
                      if (res && selectedItem.thumbnail != "") {
                        try {
                          uploadImage({
                            image: selectedItem.thumbnail,
                            planId: res,
                          });
                          setUpload(false);
                        } catch (error) {
                          setUpload(false);
                          console.log(error);
                        }
                      } else {
                        setUpload(false);
                      }
                    })
                    .catch((error: any) => {
                      setUpload(false);
                      console.log("error posting", error);
                    });
                }}
                disabled={selectedItem?.content?.length < 1}
                style={{
                  marginRight: 20,
                  backgroundColor:
                    selectedItem?.content?.length < 1
                      ? COLORS.transparentPrimray
                      : COLORS.pink,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}>
                <ThemeText style={{ textTransform: "uppercase" }}>
                  publish
                </ThemeText>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      {upload && <ActivityIndicator size={"large"} color={COLORS.primary} />}
      <TouchableOpacity
        style={{ alignSelf: "center", alignItems: "center" }}
        onPress={() => {
          selectImage()
            .then((res: any) => {
              if (res) {
                const updated = dispatch(
                  updateImage({ id: selectedItem.id, image: res })
                );
                console.log("image in store", updated.payload);
              }
            })

            .catch((error: any) => {
              alert(error);
              setUpload(false);
            });
        }}>
        <ThemeText>select thumbnail</ThemeText>
        {selectedItem?.thumbnail != "" ? (
          <Image
            resizeMode="contain"
            style={{ height: 150, width: SIZES.width * 0.8, maxWidth: 400 }}
            source={{ uri: selectedItem?.thumbnail }}
          />
        ) : (
          <FontAwesome
            name="image"
            size={150}
            color={Colors[colorScheme ?? "dark"].text}
          />
        )}
      </TouchableOpacity>

      <View
        style={{
          maxWidth: 500,
          alignSelf: "center",
          width: SIZES.width * 0.8,
        }}>
        <View style={{}}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <ThemeText
              style={{
                textDecorationLine: "underline",
                ...FONTS.h3,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}>
              title
            </ThemeText>
            <TouchableOpacity
              onPress={editPlan}
              style={{ flexDirection: "row" }}>
              <Image
                source={icons.filter}
                style={{ height: 20, width: 20, tintColor: COLORS.primary1 }}
              />
              <ThemeText>Edit</ThemeText>
            </TouchableOpacity>
          </View>

          <ThemeText
            numberOfLines={3}
            style={{ ...FONTS.body4, fontWeight: "normal" }}>
            {selectedItem?.title}
          </ThemeText>

          <View>
            <ThemeText
              style={{
                ...FONTS.h3,
                fontWeight: "normal",
                textDecorationLine: "underline",
                textTransform: "capitalize",
              }}>
              description
            </ThemeText>

            <ThemeText
              numberOfLines={3}
              style={{ ...FONTS.body4, fontWeight: "normal" }}>
              {selectedItem?.description}
            </ThemeText>
          </View>
        </View>
      </View>

      {selectedItem?.content?.length > 0 ? (
        <FlatList
          contentContainerStyle={{}}
          data={selectedItem?.content}
          renderItem={({ item, index }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  width: SIZES.width,
                  marginTop: index == 0 ? SIZES.padding : SIZES.base,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    editContent(item.title);
                  }}
                  style={{
                    backgroundColor: "lightgray",
                    alignItems: "center",
                    width: "70%",
                    maxWidth: 500,
                    borderRadius: 10,
                    flexDirection: "row",
                    height: 50,
                  }}>
                  <Ionicons
                    name="ios-radio-button-on-outline"
                    size={28}
                    style={{ marginLeft: 10 }}
                    color={COLORS.primary}
                  />

                  <Text
                    numberOfLines={1}
                    style={[styles.text, { marginLeft: 20 }]}>
                    {item.title}
                  </Text>

                  <Ionicons
                    name="play-circle"
                    size={28}
                    color={COLORS.primary}
                    style={{ position: "absolute", right: 10 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      deleteContent({ id: selectedItem.id, content: item })
                    );
                  }}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    right: -20,
                  }}>
                  <FontAwesome name="trash" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
              {/* quizes box */}
              <View style={{ width: SIZES.width }}>
                {/* show quiz and add buttons */}
                <View
                  style={{
                    alignSelf: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "70%",
                    maxWidth: 500,
                  }}>
                  {/* show quizes button */}
                  <TouchableOpacity
                    onPress={() => {
                      showQuizes == index
                        ? setShowQuizes(undefined)
                        : setShowQuizes(index);
                    }}
                    style={{
                      width: 100,
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",

                      //alignSelf: "center",
                    }}>
                    <FontAwesome
                      name={showQuizes == index ? "sort-down" : "caret-right"}
                      size={20}
                      color={Colors[colorScheme ?? "dark"].text}
                    />
                    <ThemeText style={{ ...FONTS.h2, fontWeight: "normal" }}>
                      quizes
                    </ThemeText>
                  </TouchableOpacity>
                  {/* add quiz button */}
                  {showQuizes == index && (
                    <TouchableOpacity
                      onPress={() => {
                        router.push({
                          pathname: "/addQuiz",
                          params: {
                            quizId: "",
                            planId: selectedItem.id,
                            contentTitle: item.title,
                          },
                        });
                      }}
                      style={{
                        //width: 70,
                        alignItems: "center",
                        // justifyContent: "space-between",
                        flexDirection: "row",
                        //alignSelf: "center",
                      }}>
                      <FontAwesome
                        name="plus-square"
                        size={20}
                        color={Colors[colorScheme ?? "dark"].text}
                      />
                      <ThemeText style={{ marginLeft: SIZES.base }}>
                        add
                      </ThemeText>
                    </TouchableOpacity>
                  )}
                </View>
                {/* display quizes box */}
                <View>
                  {showQuizes == index && (
                    <FlatList
                      data={item.chapterQuize}
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            flexDirection: "row",
                            alignSelf: "center",
                            alignItems: "flex-start",
                            width: SIZES.width * 0.7,
                            justifyContent: "space-between",
                            marginTop: index == 0 ? SIZES.radius : SIZES.base,
                            maxWidth: 480,
                            paddingLeft: SIZES.radius,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              router.push({
                                pathname: "/addQuiz",
                                params: {
                                  quizId: item.id,
                                  planId: selectedItem.id,
                                  contentTitle:
                                    selectedItem.content[Number(showQuizes)]
                                      .title,
                                },
                              });
                            }}
                            style={{
                              flexDirection: "row",
                              alignSelf: "center",
                              alignItems: "flex-start",
                              width: "60%",
                            }}>
                            <ThemeText>{index + 1}</ThemeText>
                            <ThemeText
                              numberOfLines={1}
                              style={{ marginLeft: SIZES.base }}>
                              {item.question}
                            </ThemeText>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(
                                deleteQuiz({
                                  planId: selectedItem.id,
                                  contentTitle:
                                    selectedItem?.content[Number(showQuizes)]
                                      .title,
                                  quizId: item.id,
                                })
                              );
                            }}
                            style={{}}>
                            <FontAwesome
                              name="trash-o"
                              size={24}
                              color={COLORS.primary}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  )}
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <Text style={[styles.text, { textTransform: "capitalize" }]}>
            your plan has no content
          </Text>
        </View>
      )}
      <ThemeView
        style={{
          width: SIZES.width * 0.8,
          height: 50,
          alignItems: "center",
          maxWidth: 400,
          alignSelf: "center",
        }}>
        <TouchableOpacity
          onPress={newContent}
          style={{
            width: "80%",
            position: "absolute",
            height: 40,
            bottom: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            flexDirection: "row",
            backgroundColor: COLORS.primary,
          }}>
          <Ionicons name="add" size={20} color={COLORS.white} />
          <Text style={[styles.text, { textTransform: "uppercase" }]}>
            add content
          </Text>
        </TouchableOpacity>
      </ThemeView>
    </ThemeView>
  );
};

export default addContent;

const styles = StyleSheet.create({
  main: { flex: 1 },
  text: { fontSize: 16 },
});
