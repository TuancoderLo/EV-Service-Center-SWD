import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useQuery } from "@tanstack/react-query";

import { Card, Button } from "../components/ui";
import {
  RgbColors,
  Spacing,
  FontSize,
  FontWeight,
  BorderRadius,
} from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";
import { Booking, BookingStatus } from "../types";

export default function MyBookingsScreen() {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | "all">(
    "all"
  );

  // Mock bookings data
  const mockBookings: Booking[] = [
    {
      id: "1",
      userId: user?.id || "1",
      serviceId: "1",
      status: "confirmed",
      scheduledDate: "2024-01-15",
      scheduledTime: "10:00",
      location: "123 Nguyễn Văn Cừ, Q.5, TP.HCM",
      description: "Sạc xe điện tại nhà",
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
      service: {
        id: "1",
        name: "Sạc điện cơ bản",
        description: "Sạc pin xe điện tại trạm sạc",
        price: 50000,
        duration: 60,
        category: "charging",
        isActive: true,
        createdAt: "",
        updatedAt: "",
      },
    },
    {
      id: "2",
      userId: user?.id || "1",
      serviceId: "2",
      status: "pending",
      scheduledDate: "2024-01-20",
      scheduledTime: "14:00",
      location: "456 Lê Văn Sỹ, Q.3, TP.HCM",
      description: "Bảo dưỡng định kỳ",
      createdAt: "2024-01-12T14:00:00Z",
      updatedAt: "2024-01-12T14:00:00Z",
      service: {
        id: "2",
        name: "Bảo dưỡng định kỳ",
        description: "Kiểm tra và bảo dưỡng toàn diện",
        price: 500000,
        duration: 120,
        category: "maintenance",
        isActive: true,
        createdAt: "",
        updatedAt: "",
      },
    },
    {
      id: "3",
      userId: user?.id || "1",
      serviceId: "3",
      status: "completed",
      scheduledDate: "2024-01-08",
      scheduledTime: "09:00",
      location: "789 Võ Văn Tần, Q.3, TP.HCM",
      description: "Sửa chữa khẩn cấp",
      createdAt: "2024-01-05T09:00:00Z",
      updatedAt: "2024-01-08T11:00:00Z",
      service: {
        id: "3",
        name: "Sửa chữa khẩn cấp",
        description: "Hỗ trợ sửa chữa tại chỗ 24/7",
        price: 300000,
        duration: 90,
        category: "repair",
        isActive: true,
        createdAt: "",
        updatedAt: "",
      },
    },
  ];

  const { data: bookings = mockBookings } = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: async () => {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockBookings;
    },
    enabled: !!user?.id,
  });

  const statusFilters: Array<{ key: BookingStatus | "all"; label: string }> = [
    { key: "all", label: "Tất cả" },
    { key: "pending", label: "Chờ xác nhận" },
    { key: "confirmed", label: "Đã xác nhận" },
    { key: "completed", label: "Hoàn thành" },
    { key: "cancelled", label: "Đã hủy" },
  ];

  const filteredBookings =
    selectedStatus === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === selectedStatus);

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "pending":
        return RgbColors.light.warning;
      case "confirmed":
        return RgbColors.light.primary;
      case "completed":
        return RgbColors.light.success;
      case "cancelled":
        return RgbColors.light.destructive;
      default:
        return RgbColors.light.mutedForeground;
    }
  };

  const getStatusLabel = (status: BookingStatus) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const renderBookingCard = ({ item: booking }: { item: Booking }) => (
    <Card style={styles.bookingCard}>
      {/* Booking Header */}
      <View style={styles.bookingHeader}>
        <View style={styles.bookingInfo}>
          <Text style={styles.serviceName}>{booking.service?.name}</Text>
          <Text style={styles.bookingId}>#{booking.id}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(booking.status) + "20" },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(booking.status) },
            ]}
          >
            {getStatusLabel(booking.status)}
          </Text>
        </View>
      </View>

      {/* Booking Details */}
      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📅</Text>
          <Text style={styles.detailText}>
            {formatDate(booking.scheduledDate)} lúc {booking.scheduledTime}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📍</Text>
          <Text style={styles.detailText} numberOfLines={2}>
            {booking.location}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>💰</Text>
          <Text style={styles.detailText}>
            {formatCurrency(booking.service?.price || 0)}
          </Text>
        </View>

        {booking.description && (
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📝</Text>
            <Text style={styles.detailText} numberOfLines={2}>
              {booking.description}
            </Text>
          </View>
        )}
      </View>

      {/* Booking Actions */}
      <View style={styles.bookingActions}>
        {booking.status === "pending" && (
          <>
            <Button
              title="Hủy"
              variant="outline"
              size="sm"
              onPress={() => {}}
              style={styles.actionButton}
            />
            <Button
              title="Chỉnh sửa"
              size="sm"
              onPress={() => {}}
              style={styles.actionButton}
            />
          </>
        )}

        {booking.status === "confirmed" && (
          <Button
            title="Xem chi tiết"
            size="sm"
            onPress={() => {}}
            style={styles.actionButton}
          />
        )}

        {booking.status === "completed" && (
          <>
            <Button
              title="Đánh giá"
              variant="outline"
              size="sm"
              onPress={() => {}}
              style={styles.actionButton}
            />
            <Button
              title="Đặt lại"
              size="sm"
              onPress={() => {}}
              style={styles.actionButton}
            />
          </>
        )}
      </View>
    </Card>
  );

  if (user?.role !== "member") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>
            Chỉ thành viên mới có thể xem lịch đặt dịch vụ
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lịch đặt dịch vụ của tôi</Text>

        {/* Status Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {statusFilters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedStatus === filter.key && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedStatus(filter.key)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedStatus === filter.key && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        renderItem={renderBookingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyTitle}>Chưa có đặt lịch nào</Text>
            <Text style={styles.emptyDescription}>
              Hãy đặt lịch dịch vụ đầu tiên của bạn
            </Text>
            <Button
              title="Đặt lịch ngay"
              onPress={() => {}}
              style={styles.emptyButton}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RgbColors.light.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },
  errorText: {
    fontSize: FontSize.lg,
    color: RgbColors.light.destructive,
    textAlign: "center",
  },
  header: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize["2xl"],
    fontWeight: FontWeight.bold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.lg,
  },
  filtersContainer: {
    marginBottom: Spacing.md,
  },
  filterButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: RgbColors.light.secondary,
  },
  filterButtonActive: {
    backgroundColor: RgbColors.light.primary,
  },
  filterText: {
    fontSize: FontSize.sm,
    color: RgbColors.light.secondaryForeground,
    fontWeight: FontWeight.medium,
  },
  filterTextActive: {
    color: RgbColors.light.primaryForeground,
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  bookingCard: {
    marginBottom: Spacing.md,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  bookingInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.xs,
  },
  bookingId: {
    fontSize: FontSize.sm,
    color: RgbColors.light.mutedForeground,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  statusText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  bookingDetails: {
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.sm,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: Spacing.sm,
    width: 20,
  },
  detailText: {
    fontSize: FontSize.sm,
    color: RgbColors.light.foreground,
    flex: 1,
    lineHeight: FontSize.sm * 1.4,
  },
  bookingActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Spacing.sm,
  },
  actionButton: {
    minWidth: 80,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxxl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.sm,
  },
  emptyDescription: {
    fontSize: FontSize.base,
    color: RgbColors.light.mutedForeground,
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
  emptyButton: {
    minWidth: 200,
  },
});
