import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

export function Layout() {
    return (
        <Flex>
            <Sidebar/>
            <Box flex='1' p={{base: '4', md: '8'}}>
                <Outlet/>
            </Box>
        </Flex>
    )
}