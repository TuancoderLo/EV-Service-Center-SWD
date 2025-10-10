import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import {
  RgbColors,
  Spacing,
  BorderRadius,
  FontSize,
  FontWeight,
} from "../../constants/Colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "sm" | "default" | "lg";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "default",
  size = "default",
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    disabled && styles.disabled,
    fullWidth && styles.fullWidth,
    style,
  ];

  const textStyles = [
    styles.baseText,
    styles[`${variant}Text` as keyof typeof styles],
    styles[`${size}TextSize` as keyof typeof styles],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "ghost"
              ? RgbColors.light.primary
              : RgbColors.light.primaryForeground
          }
          size="small"
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.md,
    flexDirection: "row",
  },

  // Variants
  default: {
    backgroundColor: RgbColors.light.primary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: RgbColors.light.border,
  },
  secondary: {
    backgroundColor: RgbColors.light.secondary,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  destructive: {
    backgroundColor: RgbColors.light.destructive,
  },

  // Sizes
  smSize: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    minHeight: 36,
  },
  defaultSize: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 44,
  },
  lgSize: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },

  // Text styles
  baseText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    textAlign: "center",
  },
  defaultText: {
    color: RgbColors.light.primaryForeground,
  },
  outlineText: {
    color: RgbColors.light.foreground,
  },
  secondaryText: {
    color: RgbColors.light.secondaryForeground,
  },
  ghostText: {
    color: RgbColors.light.foreground,
  },
  destructiveText: {
    color: RgbColors.light.destructiveForeground,
  },

  // Size text
  smTextSize: {
    fontSize: FontSize.xs,
  },
  defaultTextSize: {
    fontSize: FontSize.sm,
  },
  lgTextSize: {
    fontSize: FontSize.base,
  },

  // States
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
  fullWidth: {
    width: "100%",
  },
});
