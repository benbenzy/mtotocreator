/** @format */

import * as React from "react";
import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { ThemeText } from "../../components/Themed";
import { COLORS, FONTS } from "../../constants";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => (
          <View>
            <ThemeText
              style={{
                textDecorationLine: "underline",
                ...FONTS.h1,
                fontWeight: "bold",
              }}>
              Mtoto
              <Text style={{ color: COLORS.red }}>Sharp</Text> Foundation
            </ThemeText>
          </View>
        ),
      }}>
      <Stack.Screen options={{ headerShown: false }} name="sign-in" />
    </Stack>
  );
}
