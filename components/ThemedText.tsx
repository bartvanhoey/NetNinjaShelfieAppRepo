import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";

type ThemedTextProps = {
  style?: any;
  title?: boolean;
  children?: React.ReactNode;
};

const ThemedText = ({ style, title = false, ...props }: ThemedTextProps) => {
  const colorScheme = useColorScheme();
  const scheme = colorScheme === "dark" ? "dark" : "light";
  const theme = Colors[scheme] ?? Colors.light;
  const textColor = title ? theme.titleColor : theme.textColor; // Assuming your theme has a 'text' property for text color

  // console.log("Current color scheme:", colorScheme);
  // console.log("Current theme:", theme);

  // No need to pass children explicitly,
  // as they will be included in props and rendered by default
  return <Text style={[{ color: textColor }, style]} {...props} />;
};

export default ThemedText;
