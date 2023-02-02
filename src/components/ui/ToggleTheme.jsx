import { Button, useColorMode } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa";

export function ToggleTheme() {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <Button variant='ghost' onClick={() => toggleColorMode()}>
            {colorMode === 'dark' ? <FaSun color="#ffcc33"/> : <FaMoon color="#2A4365"/>}
        </Button>
    )

}