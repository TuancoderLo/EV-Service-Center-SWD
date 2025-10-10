import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";

import { useAuth } from "../hooks/useAuth";
import { RgbColors, FontSize } from "../constants/Colors";
import { RootStackParamList, MainTabParamList } from "../types";

// Import Navigators and Screens
import AuthNavigator from "./AuthNavigator";
import HomeScreen from "../screens/Home";
import BookingScreen from "../screens/Booking";
import ProfileScreen from "../screens/Profile";
import DashboardScreen from "../screens/Dashboard";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// Loading Screen Component
function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>⚡</Text>
      <Text style={styles.loadingTitle}>EV Service Center</Text>
      <Text style={styles.loadingSubtitle}>Đang khởi tạo...</Text>
    </View>
  );
}

// Tab Icon Component
function TabIcon({ focused, icon }: { focused: boolean; icon: string }) {
  return (
    <Text
      style={[
        styles.tabIcon,
        {
          color: focused
            ? RgbColors.light.primary
            : RgbColors.light.mutedForeground,
        },
      ]}
    >
      {icon}
    </Text>
  );
}

// Main Tab Navigator
function MainNavigator() {
  const { user } = useAuth();

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: RgbColors.light.primary,
        tabBarInactiveTintColor: RgbColors.light.mutedForeground,
        tabBarStyle: {
          backgroundColor: RgbColors.light.background,
          borderTopColor: RgbColors.light.border,
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: RgbColors.light.background,
          borderBottomColor: RgbColors.light.border,
          borderBottomWidth: 1,
        },
        headerTintColor: RgbColors.light.foreground,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Trang chủ",
          headerTitle: "EV Service Center",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="🏠" />,
        }}
      />

      {user?.role === "member" && (
        <MainTab.Screen
          name="Bookings"
          component={BookingScreen}
          options={{
            title: "Đặt lịch",
            headerTitle: "Đặt lịch dịch vụ",
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon="📅" />
            ),
          }}
        />
      )}

      {(user?.role === "admin" || user?.role === "staff") && (
        <MainTab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: "Quản lý",
            headerTitle: "Bảng điều khiển",
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon="📊" />
            ),
          }}
        />
      )}

      {user?.role === "technician" && (
        <MainTab.Screen
          name="Services"
          component={HomeScreen} // Use Home for now, will create Services later
          options={{
            title: "Dịch vụ",
            headerTitle: "Quản lý dịch vụ",
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon="🔧" />
            ),
          }}
        />
      )}

      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Hồ sơ",
          headerTitle: "Thông tin cá nhân",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="👤" />,
        }}
      />
    </MainTab.Navigator>
  );
}

// Root Navigator
function RootNavigator() {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <RootStack.Screen name="Main" component={MainNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator() {
  const { initialize } = useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: RgbColors.light.background,
    padding: 20,
  },
  loadingText: {
    fontSize: 64,
    marginBottom: 16,
  },
  loadingTitle: {
    fontSize: FontSize["2xl"],
    fontWeight: "bold",
    color: RgbColors.light.foreground,
    marginBottom: 8,
    textAlign: "center",
  },
  loadingSubtitle: {
    fontSize: FontSize.base,
    color: RgbColors.light.mutedForeground,
    textAlign: "center",
  },
  tabIcon: {
    fontSize: 24,
  },
});
