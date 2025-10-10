import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Button, Input, Card } from "../components/ui";
import {
  RgbColors,
  Spacing,
  BorderRadius,
  FontSize,
  FontWeight,
} from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";
import { mockAuth } from "../services/auth";
import { LoginRequest } from "../types";

export default function LoginScreen() {
  const { setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const loginMutation = useMutation({
    mutationFn: mockAuth.login, // Use mockAuth.login for development
    onSuccess: (data) => {
      if (data.user && data.access_token) {
        setAuth(data.user, data.access_token);
      }
    },
    onError: (error: any) => {
      Alert.alert("Lỗi đăng nhập", error.message || "Vui lòng thử lại");
    },
  });

  const onSubmit = (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  const mockUsers = [
    { email: "admin@example.com", role: "Admin" },
    { email: "staff@example.com", role: "Staff" },
    { email: "tech@example.com", role: "Technician" },
    { email: "member@example.com", role: "Member" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>⚡</Text>
            <Text style={styles.title}>EV Service Center</Text>
            <Text style={styles.subtitle}>Chào mừng quay trở lại</Text>
          </View>

          {/* Login Form */}
          <Card style={styles.formCard}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email là bắt buộc",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email không hợp lệ",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  placeholder="Nhập email của bạn"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.email?.message}
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: "Mật khẩu là bắt buộc",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showPassword}
                  error={errors.password?.message}
                  required
                />
              )}
            />

            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showPasswordText}>
                {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              </Text>
            </TouchableOpacity>

            <Button
              title={
                loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"
              }
              onPress={handleSubmit(onSubmit)}
              loading={loginMutation.isPending}
              fullWidth
              style={styles.loginButton}
            />

            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </Card>

          {/* Mock Users for Testing */}
          <Card style={styles.mockUsersCard}>
            <Text style={styles.mockUsersTitle}>
              Tài khoản demo (password: password)
            </Text>
            {mockUsers.map((user, index) => (
              <TouchableOpacity
                key={index}
                style={styles.mockUserButton}
                onPress={() => {
                  loginMutation.mutate({
                    email: user.email,
                    password: "password",
                  });
                }}
              >
                <Text style={styles.mockUserEmail}>{user.email}</Text>
                <Text style={styles.mockUserRole}>{user.role}</Text>
              </TouchableOpacity>
            ))}
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RgbColors.light.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: Spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  logo: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize["3xl"],
    fontWeight: FontWeight.bold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: RgbColors.light.mutedForeground,
    textAlign: "center",
  },
  formCard: {
    marginBottom: Spacing.lg,
  },
  showPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: Spacing.lg,
  },
  showPasswordText: {
    fontSize: FontSize.sm,
    color: RgbColors.light.primary,
    fontWeight: FontWeight.medium,
  },
  loginButton: {
    marginBottom: Spacing.md,
  },
  forgotPasswordButton: {
    alignSelf: "center",
  },
  forgotPasswordText: {
    fontSize: FontSize.sm,
    color: RgbColors.light.primary,
    fontWeight: FontWeight.medium,
  },
  mockUsersCard: {
    backgroundColor: RgbColors.light.muted,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: RgbColors.light.border,
  },
  mockUsersTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  mockUserButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: RgbColors.light.background,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: RgbColors.light.border,
  },
  mockUserEmail: {
    fontSize: FontSize.sm,
    color: RgbColors.light.foreground,
    flex: 1,
  },
  mockUserRole: {
    fontSize: FontSize.xs,
    color: RgbColors.light.primary,
    fontWeight: FontWeight.medium,
    backgroundColor: RgbColors.light.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
});
