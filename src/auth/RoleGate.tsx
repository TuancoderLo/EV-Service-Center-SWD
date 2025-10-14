import { useAuthStore, UserRole } from "@/src/store/authStore";
import { router } from "expo-router";
import { ReactNode, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

interface RoleGateProps {
  requiredRole?: UserRole;
  children: ReactNode;
}

export default function RoleGate({ requiredRole, children }: RoleGateProps) {
  const { isAuthenticated, role, user } = useAuthStore();

  useEffect(() => {
    // Check authentication first
    if (!isAuthenticated || !user || !role) {
      // Redirect to login if not authenticated
      router.replace("/(auth)/login");
      return;
    }

    // If role is required and doesn't match, redirect to correct dashboard
    if (requiredRole && role !== requiredRole) {
      // Redirect to the correct dashboard based on current role
      switch (role) {
        case "admin":
          router.replace("/admin");
          break;
        case "member":
          router.replace("/member");
          break;
        case "staff":
          router.replace("/staff");
          break;
        case "technician":
          router.replace("/technician");
          break;
        default:
          router.replace("/");
          break;
      }
      return;
    }
  }, [isAuthenticated, role, requiredRole, user]);

  // Show loading while checking authentication
  if (!isAuthenticated || !user || !role) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Checking authentication...</Text>
      </View>
    );
  }

  // Show loading while redirecting to correct role
  if (requiredRole && role !== requiredRole) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Redirecting...</Text>
      </View>
    );
  }

  // Render children if everything is correct
  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
});
