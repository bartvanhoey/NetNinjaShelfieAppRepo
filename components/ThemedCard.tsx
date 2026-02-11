import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  ViewProps,
  useColorScheme,
} from "react-native";
import React from "react";
import { Colors } from "../constants/colors";

type ThemedCardProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const ThemedCard = ({ style, ...props }: ThemedCardProps) => {
  const colorScheme = useColorScheme();
  const theme =
    Colors[colorScheme === "dark" ? "dark" : "light"] ?? Colors.light;

  return (
    // No need to pass children explicitly,
    // as they will be included in props and rendered by default
    <View
      style={[{ backgroundColor: theme.uiBackgroundColor }, styles.card, style]}
      {...props}
    />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 5,
  },
});
