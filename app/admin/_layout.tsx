import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Admin Dashboard',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="manager-center" 
        options={{ 
          title: 'Manager Center',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="manager-history" 
        options={{ 
          title: 'Manager History',
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
      <Stack.Screen 
        name="manager-users" 
        options={{ 
          title: 'Manager Users',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
    </Stack>
  );
}