import { mockLogin, useAuthStore } from "@/src/store/authStore";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Divider,
  Paragraph,
  TextInput,
  Title,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setIsLoading(true);

    try {
      const { token, user } = await mockLogin(email, password);
      login(token, user);

      // Navigate to the appropriate dashboard based on role
      switch (user.role) {
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
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error instanceof Error ? error.message : "Invalid credentials"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Welcome Back</Title>
              <Paragraph style={styles.subtitle}>
                Sign in to your account
              </Paragraph>

              <Card style={styles.testCredentials}>
                <Card.Content>
                  <Paragraph style={styles.testTitle}>
                    Test Credentials:
                  </Paragraph>
                  <Paragraph style={styles.testText}>
                    Admin: admin@test.com / 123456{"\n"}
                    Member: member@test.com / 123456{"\n"}
                    Staff: staff@test.com / 123456{"\n"}
                    Technician: technician@test.com / 123456
                  </Paragraph>
                </Card.Content>
              </Card>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />

                <TextInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  mode="outlined"
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye-off" : "eye"}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  style={styles.input}
                />
              </View>

              <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.loginButton}
                contentStyle={styles.buttonContent}
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>

              <Button
                mode="text"
                onPress={() => router.push("/(auth)/forgot-password")}
                style={styles.forgotButton}
              >
                Forgot Password?
              </Button>

              <Divider style={styles.divider} />

              <View style={styles.registerContainer}>
                <Paragraph>Don&apos;t have an account?</Paragraph>
                <Button
                  mode="outlined"
                  onPress={() => router.push("/(auth)/register")}
                  style={styles.registerButton}
                >
                  Register
                </Button>
              </View>

              <Divider style={styles.divider} />

              <Button
                mode="text"
                onPress={() => router.push("/")}
                style={styles.homeButton}
              >
                Back to Home
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2196F3",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#FFFFFF",
  },
  loginButton: {
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  forgotButton: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  registerContainer: {
    alignItems: "center",
    gap: 12,
  },
  registerButton: {
    width: "100%",
  },
  homeButton: {
    marginTop: 8,
  },
  testCredentials: {
    backgroundColor: "#E3F2FD",
    marginBottom: 16,
    elevation: 1,
  },
  testTitle: {
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 8,
  },
  testText: {
    fontSize: 12,
    color: "#424242",
    fontFamily: "monospace",
  },
});
