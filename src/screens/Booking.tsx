import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Card, Button, Input } from "../components/ui";
import {
  RgbColors,
  Spacing,
  FontSize,
  FontWeight,
  BorderRadius,
} from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";
import { BookingRequest, Service } from "../types";

export default function BookingScreen() {
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingRequest>();

  // Mock services data
  const services: Service[] = [
    {
      id: "1",
      name: "Sạc điện cơ bản",
      description: "Sạc pin xe điện tại trạm sạc công cộng",
      price: 50000,
      duration: 60,
      category: "charging",
      isActive: true,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      name: "Sạc nhanh",
      description: "Sạc nhanh với công suất cao",
      price: 100000,
      duration: 30,
      category: "charging",
      isActive: true,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "3",
      name: "Bảo dưỡng định kỳ",
      description: "Kiểm tra và bảo dưỡng toàn diện",
      price: 500000,
      duration: 120,
      category: "maintenance",
      isActive: true,
      createdAt: "",
      updatedAt: "",
    },
  ];

  // Mock time slots
  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const createBookingMutation = useMutation({
    mutationFn: async (data: BookingRequest) => {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Creating booking:", data);
      return { success: true, id: "booking_" + Date.now() };
    },
    onSuccess: () => {
      Alert.alert(
        "Thành công!",
        "Đặt lịch thành công. Chúng tôi sẽ liên hệ với bạn sớm.",
        [
          {
            text: "OK",
            onPress: () => {
              reset();
              setSelectedService(null);
              setSelectedDate("");
              setSelectedTime("");
            },
          },
        ]
      );
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", error.message || "Có lỗi xảy ra khi đặt lịch");
    },
  });

  const onSubmit = (data: BookingRequest) => {
    if (!selectedService) {
      Alert.alert("Lỗi", "Vui lòng chọn dịch vụ");
      return;
    }
    if (!selectedDate) {
      Alert.alert("Lỗi", "Vui lòng chọn ngày");
      return;
    }
    if (!selectedTime) {
      Alert.alert("Lỗi", "Vui lòng chọn giờ");
      return;
    }

    const bookingData: BookingRequest = {
      serviceId: selectedService.id,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
      location: data.location,
      description: data.description,
    };

    createBookingMutation.mutate(bookingData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getServiceIcon = (category: string) => {
    switch (category) {
      case "charging":
        return "🔌";
      case "maintenance":
        return "🔧";
      default:
        return "⚡";
    }
  };

  // Generate next 7 days for date selection
  const getNextDays = () => {
    const days = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("vi-VN", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
        }),
      });
    }
    return days;
  };

  const availableDays = getNextDays();

  if (user?.role !== "member") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>
            Chỉ thành viên mới có thể đặt lịch dịch vụ
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Đặt lịch dịch vụ</Text>

        {/* Service Selection */}
        <Text style={styles.sectionTitle}>Chọn dịch vụ</Text>
        <View style={styles.servicesContainer}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                selectedService?.id === service.id &&
                  styles.selectedServiceCard,
              ]}
              onPress={() => setSelectedService(service)}
            >
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceIcon}>
                  {getServiceIcon(service.category)}
                </Text>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>
                    {formatCurrency(service.price)}
                  </Text>
                  <Text style={styles.serviceDuration}>
                    ⏱️ {service.duration} phút
                  </Text>
                </View>
              </View>
              <Text style={styles.serviceDescription}>
                {service.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Selection */}
        <Text style={styles.sectionTitle}>Chọn ngày</Text>
        <View style={styles.dateContainer}>
          {availableDays.map((day) => (
            <TouchableOpacity
              key={day.value}
              style={[
                styles.dateCard,
                selectedDate === day.value && styles.selectedDateCard,
              ]}
              onPress={() => setSelectedDate(day.value)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === day.value && styles.selectedDateText,
                ]}
              >
                {day.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Selection */}
        <Text style={styles.sectionTitle}>Chọn giờ</Text>
        <View style={styles.timeContainer}>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeCard,
                selectedTime === time && styles.selectedTimeCard,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Booking Form */}
        <Card style={styles.formCard}>
          <Controller
            control={control}
            name="location"
            rules={{ required: "Địa chỉ là bắt buộc" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Địa chỉ"
                placeholder="Nhập địa chỉ cần dịch vụ"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.location?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Ghi chú"
                placeholder="Mô tả thêm về yêu cầu của bạn"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                numberOfLines={3}
                inputStyle={styles.textAreaInput}
              />
            )}
          />

          <Button
            title={
              createBookingMutation.isPending
                ? "Đang đặt lịch..."
                : "Đặt lịch ngay"
            }
            onPress={handleSubmit(onSubmit)}
            loading={createBookingMutation.isPending}
            fullWidth
          />
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
  scrollContent: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSize["2xl"],
    fontWeight: FontWeight.bold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.xl,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  servicesContainer: {
    gap: Spacing.md,
  },
  serviceCard: {
    backgroundColor: RgbColors.light.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: RgbColors.light.border,
  },
  selectedServiceCard: {
    borderColor: RgbColors.light.primary,
    backgroundColor: RgbColors.light.accent,
  },
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  serviceIcon: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: RgbColors.light.foreground,
    marginBottom: Spacing.xs,
  },
  servicePrice: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: RgbColors.light.primary,
    marginBottom: Spacing.xs,
  },
  serviceDuration: {
    fontSize: FontSize.xs,
    color: RgbColors.light.mutedForeground,
  },
  serviceDescription: {
    fontSize: FontSize.sm,
    color: RgbColors.light.mutedForeground,
    lineHeight: FontSize.sm * 1.4,
  },
  dateContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  dateCard: {
    flex: 1,
    minWidth: 100,
    padding: Spacing.md,
    backgroundColor: RgbColors.light.card,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: RgbColors.light.border,
    alignItems: "center",
  },
  selectedDateCard: {
    backgroundColor: RgbColors.light.primary,
    borderColor: RgbColors.light.primary,
  },
  dateText: {
    fontSize: FontSize.sm,
    color: RgbColors.light.foreground,
    textAlign: "center",
  },
  selectedDateText: {
    color: RgbColors.light.primaryForeground,
    fontWeight: FontWeight.semibold,
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  timeCard: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: RgbColors.light.card,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: RgbColors.light.border,
  },
  selectedTimeCard: {
    backgroundColor: RgbColors.light.primary,
    borderColor: RgbColors.light.primary,
  },
  timeText: {
    fontSize: FontSize.sm,
    color: RgbColors.light.foreground,
  },
  selectedTimeText: {
    color: RgbColors.light.primaryForeground,
    fontWeight: FontWeight.semibold,
  },
  formCard: {
    marginTop: Spacing.xl,
  },
  textAreaInput: {
    height: 80,
    textAlignVertical: "top",
  },
});
