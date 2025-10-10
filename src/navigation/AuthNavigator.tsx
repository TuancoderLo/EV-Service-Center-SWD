import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/Login";
import { AuthStackParamList } from "../types";
import { RgbColors } from "../constants/Colors";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: RgbColors.light.background,
        },
        headerTintColor: RgbColors.light.foreground,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          title: "Đăng nhập",
        }}
      />
    </Stack.Navigator>
  );
}
