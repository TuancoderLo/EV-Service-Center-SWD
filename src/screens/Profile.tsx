import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Card, Button } from "../components/ui";
import {
  RgbColors,
  Spacing,
  FontSize,
  FontWeight,
  BorderRadius,
} from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: logout,
      },
    ]);
  };

  const profileSections = [
    {
      title: "Thông tin cá nhân",
      items: [
        { label: "Họ tên", value: user?.name || "N/A", icon: "👤" },
        { label: "Email", value: user?.email || "N/A", icon: "📧" },
        {
          label: "Số điện thoại",
          value: user?.phone || "Chưa cập nhật",
          icon: "📱",
        },
        { label: "Vai trò", value: getRoleDisplayName(user?.role), icon: "🏷️" },
      ],
    },
    {
      title: "Cài đặt",
      items: [
        { label: "Chỉnh sửa thông tin", action: () => {}, icon: "✏️" },
        { label: "Đổi mật khẩu", action: () => {}, icon: "🔒" },
        { label: "Thông báo", action: () => {}, icon: "🔔" },
        { label: "Chế độ tối", action: () => {}, icon: "🌙" },
      ],
    },
    {
      title: "Hỗ trợ",
      items: [
        { label: "Liên hệ hỗ trợ", action: () => {}, icon: "🆘" },
        { label: "Điều khoản sử dụng", action: () => {}, icon: "📄" },
        { label: "Chính sách bảo mật", action: () => {}, icon: "🔐" },
        { label: "Về ứng dụng", action: () => {}, icon: "ℹ️" },
      ],
    },
  ];

  type ProfileItem =
    | { label: string; value: string; icon: string; action?: never }
    | { label: string; action: () => void; icon: string; value?: never };

  function getRoleDisplayName(role?: string): string {
    switch (role) {
      case "admin":
        return "Quản trị viên";
      case "staff":
        return "Nhân viên";
      case "technician":
        return "Kỹ thuật viên";
      case "member":
        return "Thành viên";
      default:
        return "N/A";
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <Card style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() || "?"}
              </Text>
            </View>
          </View>

          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>

          <View style={styles.roleContainer}>
            <Text style={styles.roleText}>
              {getRoleDisplayName(user?.role)}
            </Text>
          </View>
        </Card>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            <Card style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  <TouchableOpacity
                    style={styles.profileItem}
                    onPress={"action" in item ? item.action : undefined}
                    disabled={!("action" in item)}
                  >
                    <View style={styles.itemLeft}>
                      <Text style={styles.itemIcon}>{item.icon}</Text>
                      <Text style={styles.itemLabel}>{item.label}</Text>
                    </View>

                    <View style={styles.itemRight}>
                      {"value" in item && item.value && (
                        <Text style={styles.itemValue}>{item.value}</Text>
                      )}
                      {"action" in item && (
                        <Text style={styles.itemArrow}>›</Text>
                      )}
                    </View>
                  </TouchableOpacity>{" "}
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </View>
              ))}
            </Card>
          </View>
        ))}

        {/* Logout Button */}
        <Button
          title="Đăng xuất"
          variant="destructive"
          onPress={handleLogout}
          fullWidth
          style={styles.logoutButton}
        />

        {/* App Version */}
        <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RgbColors.light.background,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: RgbColors.light.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: FontSize["2xl"],
    fontWeight: FontWeight.bold,
    color: RgbColors.light.primaryForeground,
  },
  userName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: FontSize.base,
    color: RgbColors.light.mutedForeground,
    marginBottom: Spacing.md,
  },
  roleContainer: {
    backgroundColor: RgbColors.light.secondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  roleText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: RgbColors.light.secondaryForeground,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.md,
  },
  sectionCard: {
    padding: 0,
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemIcon: {
    fontSize: 20,
    marginRight: Spacing.md,
    width: 24,
    textAlign: "center",
  },
  itemLabel: {
    fontSize: FontSize.base,
    color: RgbColors.light.foreground,
    flex: 1,
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemValue: {
    fontSize: FontSize.sm,
    color: RgbColors.light.mutedForeground,
    marginRight: Spacing.sm,
  },
  itemArrow: {
    fontSize: 20,
    color: RgbColors.light.mutedForeground,
  },
  separator: {
    height: 1,
    backgroundColor: RgbColors.light.border,
    marginHorizontal: Spacing.md,
  },
  logoutButton: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  versionText: {
    fontSize: FontSize.xs,
    color: RgbColors.light.mutedForeground,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
});
