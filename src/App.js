import { ChakraProvider, theme, CSSReset } from "@chakra-ui/core";
import Landing from "./components/Landing";
import Header from "./components/Header";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Header />
      <Landing />
    </ChakraProvider>
  );
}

export default App;
