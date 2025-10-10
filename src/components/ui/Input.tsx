import React from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import {
  RgbColors,
  Spacing,
  BorderRadius,
  FontSize,
} from "../../constants/Colors";

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  containerStyle,
  inputStyle,
  labelStyle,
  required = false,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <TextInput
        style={[styles.input, error && styles.inputError, inputStyle]}
        placeholderTextColor={RgbColors.light.mutedForeground}
        {...props}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: RgbColors.light.foreground,
    marginBottom: Spacing.xs,
  },
  required: {
    color: RgbColors.light.destructive,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: RgbColors.light.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.base,
    backgroundColor: RgbColors.light.background,
    color: RgbColors.light.foreground,
  },
  inputError: {
    borderColor: RgbColors.light.destructive,
  },
  errorText: {
    fontSize: FontSize.xs,
    color: RgbColors.light.destructive,
    marginTop: Spacing.xs,
  },
  helperText: {
    fontSize: FontSize.xs,
    color: RgbColors.light.mutedForeground,
    marginTop: Spacing.xs,
  },
});
