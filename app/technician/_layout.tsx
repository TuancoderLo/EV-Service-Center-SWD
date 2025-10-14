import RoleGate from "@/src/auth/RoleGate";
import AppBackground from "@/src/theme/AppBackground";
import { Stack } from "expo-router";

export default function TechnicianLayout() {
  return (
    <RoleGate requiredRole="technician">
      <AppBackground>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Technician Dashboard",
              headerStyle: { backgroundColor: "#2196F3" },
              headerTintColor: "#FFFFFF",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
          <Stack.Screen
            name="degree"
            options={{
              title: "Degree",
              headerStyle: { backgroundColor: "#2196F3" },
              headerTintColor: "#FFFFFF",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
          <Stack.Screen
            name="schedule"
            options={{
              title: "Schedule",
              headerStyle: { backgroundColor: "#2196F3" },
              headerTintColor: "#FFFFFF",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
        </Stack>
      </AppBackground>
    </RoleGate>
  );
}
