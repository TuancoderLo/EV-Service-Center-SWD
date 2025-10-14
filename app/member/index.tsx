import { View, StyleSheet } from 'react-native';
import { Title, Paragraph, Card, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MemberDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Welcome Section */}
        <Card style={styles.welcomeCard}>
          <Card.Content style={styles.welcomeContent}>
            <Title style={styles.welcomeTitle}>Chào mừng bạn đến với Member thành công</Title>
            <Paragraph style={styles.welcomeSubtitle}>
              Welcome to the Member Dashboard
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Title style={styles.sectionTitle}>Quick Actions</Title>
          
          <View style={styles.buttonGrid}>
            <Button
              mode="contained"
              style={styles.actionButton}
              onPress={() => router.push('/member/booking')}
              contentStyle={styles.buttonContent}
            >
              Booking
            </Button>

            <Button
              mode="contained"
              style={styles.actionButton}
              onPress={() => router.push('/member/detail')}
              contentStyle={styles.buttonContent}
            >
              Detail
            </Button>

            <Button
              mode="contained"
              style={styles.actionButton}
              onPress={() => router.push('/member/history')}
              contentStyle={styles.buttonContent}
            >
              History
            </Button>

            <Button
              mode="contained"
              style={styles.actionButton}
              onPress={() => router.push('/member/payment')}
              contentStyle={styles.buttonContent}
            >
              Payment
            </Button>
          </View>
        </View>

        {/* Back to Home */}
        <View style={styles.bottomSection}>
          <Button
            mode="outlined"
            onPress={() => router.push('/')}
            style={styles.homeButton}
          >
            Back to Home
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
    marginBottom: 24,
  },
  welcomeContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  actionsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  buttonGrid: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  bottomSection: {
    marginTop: 20,
  },
  homeButton: {
    marginTop: 8,
  },
});