import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Card, Button } from "../components/ui";
import {
  RgbColors,
  Spacing,
  FontSize,
  FontWeight,
  BorderRadius,
} from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const services = [
    {
      id: "1",
      name: "Sạc điện cơ bản",
      description: "Sạc pin xe điện tại trạm sạc công cộng",
      price: 50000,
      duration: 60,
      icon: "🔌",
    },
    {
      id: "2",
      name: "Sạc nhanh",
      description: "Sạc nhanh với công suất cao",
      price: 100000,
      duration: 30,
      icon: "⚡",
    },
    {
      id: "3",
      name: "Bảo dưỡng định kỳ",
      description: "Kiểm tra và bảo dưỡng toàn diện",
      price: 500000,
      duration: 120,
      icon: "🔧",
    },
    {
      id: "4",
      name: "Sửa chữa khẩn cấp",
      description: "Hỗ trợ sửa chữa tại chỗ 24/7",
      price: 200000,
      duration: 90,
      icon: "🚨",
    },
  ];

  const quickActions = [
    {
      title: "Đặt lịch ngay",
      description: "Đặt lịch sử dụng dịch vụ",
      icon: "📅",
      action: () => {
        // Navigate to booking
      },
    },
    {
      title: "Tìm trạm sạc",
      description: "Tìm trạm sạc gần bạn",
      icon: "🗺️",
      action: () => {
        // Navigate to map
      },
    },
    {
      title: "Lịch sử",
      description: "Xem lịch sử sử dụng",
      icon: "📋",
      action: () => {
        // Navigate to history
      },
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Xin chào!</Text>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userRole}>
              {user?.role === "admin" && "Quản trị viên"}
              {user?.role === "staff" && "Nhân viên"}
              {user?.role === "technician" && "Kỹ thuật viên"}
              {user?.role === "member" && "Thành viên"}
            </Text>
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        {user?.role === "member" && (
          <>
            <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
            <View style={styles.quickActionsContainer}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickActionCard}
                  onPress={action.action}
                >
                  <Text style={styles.quickActionIcon}>{action.icon}</Text>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                  <Text style={styles.quickActionDescription}>
                    {action.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Services */}
        <Text style={styles.sectionTitle}>Dịch vụ của chúng tôi</Text>
        <View style={styles.servicesContainer}>
          {services.map((service) => (
            <Card key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>
                    {formatCurrency(service.price)}
                  </Text>
                </View>
              </View>

              <Text style={styles.serviceDescription}>
                {service.description}
              </Text>

              <View style={styles.serviceFooter}>
                <Text style={styles.serviceDuration}>
                  ⏱️ {service.duration} phút
                </Text>
                {user?.role === "member" && (
                  <Button
                    title="Đặt lịch"
                    size="sm"
                    onPress={() => {
                      // Navigate to booking with service
                    }}
                  />
                )}
              </View>
            </Card>
          ))}
        </View>

        {/* Admin/Staff Dashboard Actions */}
        {(user?.role === "admin" || user?.role === "staff") && (
          <>
            <Text style={styles.sectionTitle}>Quản lý</Text>
            <View style={styles.dashboardContainer}>
              <TouchableOpacity style={styles.dashboardCard}>
                <Text style={styles.dashboardIcon}>📊</Text>
                <Text style={styles.dashboardTitle}>Dashboard</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.dashboardCard}>
                <Text style={styles.dashboardIcon}>📅</Text>
                <Text style={styles.dashboardTitle}>Quản lý đặt lịch</Text>
              </TouchableOpacity>

              {user?.role === "admin" && (
                <>
                  <TouchableOpacity style={styles.dashboardCard}>
                    <Text style={styles.dashboardIcon}>👥</Text>
                    <Text style={styles.dashboardTitle}>
                      Quản lý người dùng
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.dashboardCard}>
                    <Text style={styles.dashboardIcon}>💰</Text>
                    <Text style={styles.dashboardTitle}>Báo cáo doanh thu</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </>
        )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
  logoutButton: {
    padding: Spacing.sm,
  },
  logoutText: {
    color: RgbColors.light.destructive,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.lg,
    marginTop: Spacing.lg,
  },
  quickActionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  quickActionCard: {
    flex: 1,
    minWidth: 100,
    backgroundColor: RgbColors.light.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: RgbColors.light.border,
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  quickActionTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.xs,
    textAlign: "center",
  },
  quickActionDescription: {
    fontSize: FontSize.xs,
    color: RgbColors.light.mutedForeground,
    textAlign: "center",
  },
  servicesContainer: {
    gap: Spacing.md,
  },
  serviceCard: {
    marginBottom: Spacing.md,
  },
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  serviceIcon: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.xs,
  },
  servicePrice: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: RgbColors.light.primary,
  },
  serviceDescription: {
    fontSize: FontSize.sm,
    color: RgbColors.light.mutedForeground,
    marginBottom: Spacing.md,
    lineHeight: FontSize.sm * 1.4,
  },
  serviceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceDuration: {
    fontSize: FontSize.xs,
    color: RgbColors.light.mutedForeground,
  },
  dashboardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  dashboardCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: RgbColors.light.primary,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
  dashboardIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  dashboardTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: RgbColors.light.primaryForeground,
    textAlign: "center",
  },
});
