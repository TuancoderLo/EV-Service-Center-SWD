import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { Card } from "../components/ui";
import {
  RgbColors,
  Spacing,
  FontSize,
  FontWeight,
  BorderRadius,
} from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";

export default function DashboardScreen() {
  const { user } = useAuth();

  const getDashboardStats = () => {
    // Mock data based on role
    if (user?.role === "admin") {
      return [
        {
          title: "Tổng người dùng",
          value: "1,234",
          icon: "👥",
          color: RgbColors.light.primary,
        },
        {
          title: "Đặt lịch hôm nay",
          value: "56",
          icon: "📅",
          color: RgbColors.light.success,
        },
        {
          title: "Doanh thu tháng",
          value: "₫25M",
          icon: "💰",
          color: RgbColors.light.warning,
        },
        {
          title: "Dịch vụ hoạt động",
          value: "12",
          icon: "⚡",
          color: RgbColors.light.accent,
        },
      ];
    } else if (user?.role === "staff") {
      return [
        {
          title: "Đặt lịch hôm nay",
          value: "23",
          icon: "📅",
          color: RgbColors.light.primary,
        },
        {
          title: "Đang xử lý",
          value: "8",
          icon: "⏳",
          color: RgbColors.light.warning,
        },
        {
          title: "Hoàn thành",
          value: "15",
          icon: "✅",
          color: RgbColors.light.success,
        },
        {
          title: "Khách hàng mới",
          value: "5",
          icon: "👤",
          color: RgbColors.light.accent,
        },
      ];
    } else if (user?.role === "technician") {
      return [
        {
          title: "Công việc hôm nay",
          value: "8",
          icon: "🔧",
          color: RgbColors.light.primary,
        },
        {
          title: "Đang thực hiện",
          value: "2",
          icon: "⚡",
          color: RgbColors.light.warning,
        },
        {
          title: "Hoàn thành",
          value: "6",
          icon: "✅",
          color: RgbColors.light.success,
        },
        {
          title: "Đánh giá TB",
          value: "4.8",
          icon: "⭐",
          color: RgbColors.light.accent,
        },
      ];
    }
    return [];
  };

  const getQuickActions = () => {
    if (user?.role === "admin") {
      return [
        { title: "Quản lý người dùng", icon: "👥", action: () => {} },
        { title: "Báo cáo doanh thu", icon: "📊", action: () => {} },
        { title: "Quản lý dịch vụ", icon: "⚙️", action: () => {} },
        { title: "Cài đặt hệ thống", icon: "🔧", action: () => {} },
      ];
    } else if (user?.role === "staff") {
      return [
        { title: "Quản lý đặt lịch", icon: "📅", action: () => {} },
        { title: "Khách hàng", icon: "👤", action: () => {} },
        { title: "Báo cáo", icon: "📋", action: () => {} },
        { title: "Hỗ trợ", icon: "🆘", action: () => {} },
      ];
    } else if (user?.role === "technician") {
      return [
        { title: "Công việc của tôi", icon: "📝", action: () => {} },
        { title: "Lịch làm việc", icon: "📅", action: () => {} },
        { title: "Báo cáo tiến độ", icon: "📊", action: () => {} },
        { title: "Kiến thức kỹ thuật", icon: "📚", action: () => {} },
      ];
    }
    return [];
  };

  const stats = getDashboardStats();
  const quickActions = getQuickActions();

  const getRoleDisplayName = (role?: string): string => {
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Chào mừng trở lại!</Text>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userRole}>{getRoleDisplayName(user?.role)}</Text>
        </View>

        {/* Stats Cards */}
        <Text style={styles.sectionTitle}>Thống kê tổng quan</Text>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
        <View style={styles.actionsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={action.action}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Hoạt động gần đây</Text>
        <Card style={styles.activityCard}>
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Đặt lịch mới</Text>
              <Text style={styles.activityDescription}>
                Khách hàng Nguyễn Văn A đã đặt lịch sạc điện
              </Text>
              <Text style={styles.activityTime}>5 phút trước</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Hoàn thành dịch vụ</Text>
              <Text style={styles.activityDescription}>
                Dịch vụ bảo dưỡng định kỳ đã được hoàn thành
              </Text>
              <Text style={styles.activityTime}>15 phút trước</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Thanh toán</Text>
              <Text style={styles.activityDescription}>
                Nhận thanh toán ₫500,000 từ khách hàng
              </Text>
              <Text style={styles.activityTime}>30 phút trước</Text>
            </View>
          </View>
        </Card>
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
  header: {
    marginBottom: Spacing.xl,
  },
  greeting: {
    fontSize: FontSize.lg,
    color: RgbColors.light.mutedForeground,
  },
  userName: {
    fontSize: FontSize["2xl"],
    fontWeight: FontWeight.bold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.xs,
  },
  userRole: {
    fontSize: FontSize.sm,
    color: RgbColors.light.primary,
    backgroundColor: RgbColors.light.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: "flex-start",
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.lg,
    marginTop: Spacing.lg,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    minWidth: 160,
    alignItems: "center",
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  statIcon: {
    fontSize: 32,
    marginRight: Spacing.sm,
  },
  statValue: {
    fontSize: FontSize["2xl"],
    fontWeight: FontWeight.bold,
    color: RgbColors.light.primary,
  },
  statTitle: {
    fontSize: FontSize.sm,
    color: RgbColors.light.mutedForeground,
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  actionCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: RgbColors.light.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: RgbColors.light.border,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  actionTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: RgbColors.light.foreground,
    textAlign: "center",
  },
  activityCard: {
    padding: Spacing.lg,
  },
  activityItem: {
    flexDirection: "row",
    marginBottom: Spacing.lg,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: RgbColors.light.primary,
    marginTop: 6,
    marginRight: Spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.xs,
  },
  activityDescription: {
    fontSize: FontSize.sm,
    color: RgbColors.light.mutedForeground,
    marginBottom: Spacing.xs,
    lineHeight: FontSize.sm * 1.4,
  },
  activityTime: {
    fontSize: FontSize.xs,
    color: RgbColors.light.mutedForeground,
  },
});
