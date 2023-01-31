import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";


export function AppLayout() {
    let vh = window.innerHeight * 0.01;
    return (
        <Flex height={`calc((${vh}px, 1vh) * 100)`}>
            <Sidebar/>
            <Box flex='1' p={{base: '4', md: '8'}}>
                <Outlet/>
            </Box>
        </Flex>
    )
}