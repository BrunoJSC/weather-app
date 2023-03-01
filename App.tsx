import { StatusBar, View } from "react-native";

import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";

import { Home } from "./src/pages/Home";

import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";
import { Platform } from "react-native";

const statusBatHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

export default function App() {
  const [fonts] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fonts) {
    return null;
  }

  return (
    <View style={{ flex: 1, paddingTop: statusBatHeight }}>
      <StatusBar barStyle="light-content" translucent />
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </View>
  );
}
