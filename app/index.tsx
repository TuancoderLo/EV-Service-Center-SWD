import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Title style={styles.title}>EV Service Center</Title>
          <Paragraph style={styles.subtitle}>
            Welcome to our Electric Vehicle Service Platform
          </Paragraph>
        </View>

        {/* Main Content */}
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Get Started</Title>
              <Paragraph>
                Choose your role to access the appropriate dashboard and
                features.
              </Paragraph>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title>Our Services</Title>
              <Paragraph>
                • Vehicle Maintenance{"\n"}• Battery Services{"\n"}• Charging
                Solutions{"\n"}• Technical Support
              </Paragraph>
            </Card.Content>
          </Card>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => router.push("/(auth)/login")}
          >
            Login
          </Button>

          <Button
            mode="outlined"
            style={styles.button}
            onPress={() => router.push("/(auth)/register")}
          >
            Register
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2196F3",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 8,
  },
});
