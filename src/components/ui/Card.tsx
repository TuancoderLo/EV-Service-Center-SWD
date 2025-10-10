import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { RgbColors, Spacing, BorderRadius } from "../../constants/Colors";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof Spacing;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = "md",
}) => {
  return (
    <View style={[styles.card, { padding: Spacing[padding] }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: RgbColors.light.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: RgbColors.light.border,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
