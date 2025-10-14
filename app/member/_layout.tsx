import { Stack } from 'expo-router';

export default function MemberLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Member Dashboard',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="booking" 
        options={{ 
          title: 'Booking',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="detail" 
        options={{ 
          title: 'Detail',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="history" 
        options={{ 
          title: 'History',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="payment" 
        options={{ 
          title: 'Payment',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
    </Stack>
  );
}