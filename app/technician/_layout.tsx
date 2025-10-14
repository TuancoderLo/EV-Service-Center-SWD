import { Stack } from 'expo-router';

export default function TechnicianLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Technician Dashboard',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="degree" 
        options={{ 
          title: 'Degree',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="schedule" 
        options={{ 
          title: 'Schedule',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
    </Stack>
  );
}