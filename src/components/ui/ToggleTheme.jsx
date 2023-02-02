import { Button, useColorMode } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa";

export function ToggleTheme() {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <Button variant='ghost' size='sm' mt='3px' onClick={() => toggleColorMode()}>
            {colorMode === 'dark' ? <FaSun color="#ffcc33"/> : <FaMoon color="#2C8C99"/>}
        </Button>
    )

}