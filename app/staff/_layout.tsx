import { Stack } from 'expo-router';

export default function StaffLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Staff Dashboard',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="manager-inventory" 
        options={{ 
          title: 'Manager Inventory',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="manager-schedule" 
        options={{ 
          title: 'Manager Schedule',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
    </Stack>
  );
}