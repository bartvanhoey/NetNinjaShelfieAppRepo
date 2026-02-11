import {
  StyleProp,
  useColorScheme,
  ViewProps,
  ViewStyle,
  TextInput,
  TextInputProps,
} from "react-native";
import React from "react";
import { Colors } from "../constants/colors";

type ThemedTextInputProps = TextInputProps & {
  style?: StyleProp<ViewStyle>;
  // onBlur?: () => void;
  // onFocus?: () => void;
  // children?: React.ReactNode;
};

const ThemedTextInput = ({ style, ...props }: ThemedTextInputProps) => {
  const colorScheme = useColorScheme();
  const scheme = colorScheme === "dark" ? "dark" : "light";
  const theme = Colors[scheme] ?? Colors.light;
  //   const textColor = title ? theme.titleColor : theme.textColor; // Assuming your theme has a 'text' property for text color

  return (
    <TextInput
      style={[
        {
          backgroundColor: theme.uiBackgroundColor,
          color: theme.textColor,
          padding: 20,
          borderRadius: 10,
        },
        style,
      ]}
      placeholderTextColor={theme.textColor}
      {...props}
    />
  );
};

export default ThemedTextInput;
