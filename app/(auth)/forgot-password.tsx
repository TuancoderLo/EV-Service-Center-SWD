import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Divider,
  Paragraph,
  TextInput,
  Title,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleForgotPassword = () => {
    // TODO: Implement forgot password logic
    console.log("Forgot password for:", email);
    setIsSubmitted(true);
  };

  const handleResendEmail = () => {
    // TODO: Implement resend email logic
    console.log("Resend email to:", email);
  };

  if (isSubmitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Check Your Email</Title>
              <Paragraph style={styles.subtitle}>
                We have sent a password reset link to {email}
              </Paragraph>

              <View style={styles.messageContainer}>
                <Paragraph style={styles.message}>
                  Please check your email and click on the link to reset your
                  password. If you don&apos;t see the email, check your spam
                  folder.
                </Paragraph>
              </View>

              <Button
                mode="contained"
                onPress={handleResendEmail}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Resend Email
              </Button>

              <Divider style={styles.divider} />

              <Button
                mode="outlined"
                onPress={() => router.push("/(auth)/login")}
                style={styles.button}
              >
                Back to Login
              </Button>

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
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Forgot Password</Title>
              <Paragraph style={styles.subtitle}>
                Enter your email address and we&apos;ll send you a link to reset
                your password
              </Paragraph>

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
              </View>

              <Button
                mode="contained"
                onPress={handleForgotPassword}
                style={styles.button}
                contentStyle={styles.buttonContent}
                disabled={!email}
              >
                Send Reset Link
              </Button>

              <Divider style={styles.divider} />

              <Button
                mode="outlined"
                onPress={() => router.push("/(auth)/login")}
                style={styles.button}
              >
                Back to Login
              </Button>

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
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#FFFFFF",
  },
  messageContainer: {
    marginBottom: 24,
  },
  message: {
    textAlign: "center",
    color: "#666",
    lineHeight: 20,
  },
  button: {
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 16,
  },
  homeButton: {
    marginTop: 8,
  },
});
