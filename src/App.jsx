import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import theme from "./theme";
import "@fontsource/lato";
import "@fontsource/karla";

function App() {

  return (
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
          <BrowserRouter>
            <Router/>
          </BrowserRouter>
      </ChakraProvider>
  )
}

export default App
