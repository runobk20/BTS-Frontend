import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { DrawerSidebar, Footer } from "../components";
import { Box, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";

export function AppLayout() {

    let vh = window.innerHeight * 0.01;
    const {isOpen, onOpen, onClose} = useDisclosure();
    const btnRef = useRef();

    return (
        <Flex flexDir='column' height={`calc((${vh}px, 1vh) * 100)`} overflowX='hidden'>
            <DrawerSidebar isOpen={isOpen} onClose={onClose} drawerRef={btnRef}/>
                
            <Box flex='1' px={{base: '6', sm: '12', md: '16'}} pb={{base: '12'}}>
                <IconButton
                    display='block'
                    marginRight='auto'
                    marginTop='15px'
                    aria-label="Open menu"
                    fontSize={25}
                    zIndex={10}
                    background='none'
                    _hover={{background: 'none'}}
                    icon={<FaBars/>}
                    onClick={() => onOpen(true)}
                />
                <Outlet/>
            </Box>
            <Footer/>
        </Flex>
    )
}