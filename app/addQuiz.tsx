import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { ThemeText, ThemeView } from "../components/Themed";
import { COLORS, Colors, FONTS, SIZES } from "../constants";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ContentItem, Plan, answer, quiz } from "../interface";
import { addQuiz, deleteQuiz, updateQuiz } from "../store/plans/planSlice";

const AddQuiz = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const { planId, contentTitle, quizId } = params;
  const [option, setOption] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<quiz>({
    id: "",
    options: [],
    question: "",
    correctAnswer: { id: "", body: "" },
  });

  const colorscheme = useColorScheme();
  const draftPlans: Plan[] = useSelector(
    (state: any) => state?.plans?.draftPlans
  );
  useEffect(() => {
    const unsub = () => {
      if (quizId == "") {
        console.log("there is no quiz id");
        setSelectedQuiz({
          id: "",
          options: [],
          question: "",
          correctAnswer: { id: "", body: "" },
        });
      } else if (quizId && quizId != "") {
        console.log("there is  quiz id");
        let planIndex = draftPlans.findIndex((item: Plan) => item.id == planId);
        let contentIndex = draftPlans[planIndex].content.findIndex(
          (content: ContentItem) => content.title == contentTitle
        );

        let quizIndex = draftPlans[planIndex].content[
          contentIndex
        ].chapterQuize.findIndex((quiz: quiz) => quiz.id == quizId);
        const quiz =
          draftPlans[planIndex].content[contentIndex].chapterQuize[quizIndex];
        setSelectedQuiz(quiz);
      }
    };
    unsub();
  }, [params]);

  function submitQuiz() {
    if (quizId == "") {
      const res = dispatch(
        addQuiz({ planId, contentTitle, quiz: selectedQuiz })
      );
      if (res) {
        router.back();
      } else {
        return;
      }
    } else if (quizId && quizId != "") {
      const res = dispatch(
        updateQuiz({ planId, contentTitle, quizId, quiz: selectedQuiz })
      );
      if (res) {
        router.back();
      } else {
        return;
      }
    }
  }
  function handleChangeQuestion(text: string) {
    setSelectedQuiz({ ...selectedQuiz, question: text });
  }
  function handleAddOptions(body: any) {
    let allOptions = [...selectedQuiz.options];
    allOptions.push({ body, id: String(allOptions.length + 1) });
    setSelectedQuiz({ ...selectedQuiz, options: allOptions });
  }
  function handleAnswer(item: answer) {
    setSelectedQuiz({ ...selectedQuiz, correctAnswer: item });
  }
  function removeOption({ id }: answer) {
    let allOptions = [...selectedQuiz.options];
    const itemIndex = allOptions.findIndex((item) => item.id == id);
    allOptions.splice(itemIndex, 1);

    setSelectedQuiz({ ...selectedQuiz, options: allOptions });
  }
  return (
    <ThemeView style={styles.main}>
      <ScrollView>
        <TextInput
          value={selectedQuiz?.question}
          onChangeText={(text) => handleChangeQuestion(text)}
          placeholder=" enter question"
          style={{
            height: 60,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Colors[colorscheme ?? "dark"].text,
          }}
        />
        {selectedQuiz?.correctAnswer && (
          <View>
            <ThemeText>correct Answer</ThemeText>
            <ThemeText>{selectedQuiz?.correctAnswer?.body}</ThemeText>
          </View>
        )}

        <FlatList
          data={selectedQuiz?.options}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: SIZES.width,
                height: 60,
                alignItems: "center",
                flexDirection: "row",
              }}>
              <TouchableOpacity
                onPress={() => handleAnswer(item)}
                style={{
                  width: SIZES.width * 0.6,
                  height: 60,
                  alignItems: "center",
                  flexDirection: "row",
                }}>
                <FontAwesome
                  size={24}
                  color={
                    selectedQuiz?.correctAnswer?.id == String(index + 1)
                      ? COLORS.primary
                      : Colors[colorscheme ?? "dark"].text
                  }
                  name={
                    selectedQuiz?.correctAnswer?.id == String(index + 1)
                      ? "dot-circle-o"
                      : "circle-thin"
                  }
                />

                <ThemeText style={{ marginLeft: SIZES.base, ...FONTS.body3 }}>
                  {item.body}
                </ThemeText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeOption(item)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <FontAwesome name="trash" size={24} color={COLORS.primary} />
                <ThemeText>remove</ThemeText>
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={{}}>
          <ThemeText
            style={{
              textTransform: "capitalize",
              ...FONTS.h2,
              fontWeight: "bold",
            }}>
            add options
          </ThemeText>
          <View
            style={{
              alignItems: "center",
              //justifyContent: "space-between",
              flexDirection: "row",
              width: SIZES.width,
              alignSelf: "center",
            }}>
            <TextInput
              onSubmitEditing={() => {
                handleAddOptions(option);
                setOption("");
              }}
              value={option}
              onChangeText={(text) => setOption(text)}
              placeholder="enter answer"
              style={{
                width: "80%",
                height: 60,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.primary,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                handleAddOptions(option);
                setOption("");
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <ThemeText
                style={{
                  ...FONTS.h3,
                  fontWeight: "bold",
                  fontSize: 12,
                  color: "green",
                }}>
                add
              </ThemeText>
              <Ionicons name="md-send" size={40} color={"grren"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          width: SIZES.width * 0.8,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 10,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
        }}
        onPress={() => submitQuiz()}>
        <ThemeText>{quizId != "" ? "update" : "submit"}</ThemeText>
      </TouchableOpacity>
    </ThemeView>
  );
};

export default AddQuiz;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
