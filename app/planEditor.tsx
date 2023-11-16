/** @format */

import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addContent,
  updateContent,
  updatePlan,
} from "../store/plans/planSlice";
import { ContentItem, Plan } from "../interface";

const PlanEditor = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const { id, itemTitle, title, description } = params;
  const [edited, setEdited] = useState(false);
  const [content, setContent] = useState<ContentItem>({
    title: "",
    message: "",
    chapterQuize: [],
  });
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
  const draftPlans = useSelector((state: any) => state?.plans?.draftPlans);
  useEffect(() => {
    const item = draftPlans.findIndex((item: Plan) => item.id == id);
    const unsub = () => {
      if (itemTitle != "" && title === "") {
        const content = draftPlans[item].content.find(
          (item: any) => item.title == itemTitle
        );
        setContent(content);
      } else if (itemTitle === "" && title === "") {
        setContent({ title: "", message: "", chapterQuize: [] });
      } else if (itemTitle === "" && title != "") {
        setSelectedItem(draftPlans[item]);
      }
    };
    unsub();
  }, [id, params]);
  const handleTitleChange = (text: string) => {
    setContent({ ...content, title: text });
  };
  const handleMessageChange = (text: string) => {
    setContent({ ...content, message: text });
  };
  const handleEditTitle = (text: string) => {
    setSelectedItem({ ...selectedItem, title: text });
  };
  const handleDescriptionChange = (text: string) => {
    setSelectedItem({ ...selectedItem, description: text });
  };

  return (
    <View style={styles.main}>
      <View style={{ alignItems: "center", width: "90%" }}>
        <Text style={styles.text}>subtopic</Text>
        <TextInput
          value={title != "" ? selectedItem?.title : content?.title}
          onFocus={() => setEdited(true)}
          onChangeText={(text) => {
            title != "" ? handleEditTitle(text) : handleTitleChange(text);
          }}
          style={styles.input}
          placeholder="Enter subtopic //introduction"
        />
      </View>
      <View
        style={{ height: Dimensions.get("window").height - 200, width: "90%" }}>
        <Text style={styles.text}>
          {title != "" ? "description" : "message"}
        </Text>
        <TextInput
          onFocus={() => setEdited(true)}
          textAlign="left"
          textAlignVertical="top"
          value={title != "" ? selectedItem?.description : content?.message}
          onChangeText={(text) => {
            title != ""
              ? handleDescriptionChange(text)
              : handleMessageChange(text);
          }}
          multiline
          autoCorrect
          style={[styles.input, { flex: 1 }]}
          placeholder="write your content"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          if (itemTitle != "" && title == "") {
            const res = dispatch(updateContent({ id, itemTitle, content }));
            if (res.payload) {
              router.back();
            }
          } else if (itemTitle == "" && title == "") {
            const res = dispatch(addContent({ planId: id, content }));
            if (res.payload) {
              router.back();
            }
          } else if (itemTitle == "" && title != "") {
            const res = dispatch(
              updatePlan({
                id,
                title: selectedItem.title,
                description: selectedItem.description,
              })
            );
            if (res.payload) {
              router.back();
            }
          }
        }}
        disabled={!edited}
        style={{
          position: "absolute",
          bottom: 10,
          width: "80%",
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: !edited ? "lightgray" : "blue",
          borderRadius: 10,
        }}>
        <Text style={styles.text}>
          {itemTitle === "" && title == ""
            ? "Submit"
            : itemTitle != "" && title == ""
            ? "update chapter"
            : itemTitle === "" && title != ""
            ? "update plan"
            : "update"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlanEditor;

const styles = StyleSheet.create({
  main: { flex: 1, alignItems: "center" },
  text: { color: "white" },
  input: {
    backgroundColor: "white",
    width: "100%",
    height: 50,
    borderRadius: 5,
  },
});
