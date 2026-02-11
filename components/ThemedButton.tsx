import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import React from "react";
import { Colors } from "../constants/colors";

type ThemedButtonProps = {
//   title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

function ThemedButton({ style, disabled, ...props }: ThemedButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, style]}
      disabled={disabled}
      {...props}
    />
  );
}

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
