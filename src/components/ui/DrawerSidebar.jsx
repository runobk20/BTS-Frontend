import { useAuthStore } from "../../hooks";
import { Avatar, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Text } from "@chakra-ui/react";
import { FaArrowRight, FaBell, FaBolt, FaHome, FaUser } from "react-icons/fa";
import { NavItem } from "./NavItem";
import { NavMenu } from "./NavMenu";
import { ToggleTheme } from "./ToggleTheme";

export function DrawerSidebar({isOpen, onClose, drawerRef}) {
    const {user, startLogout} = useAuthStore();

    return (
        <Drawer 
        size={{base: 'xs', md: 'sm', lg: 'lg'}} 
        as='nav' 
        isOpen={isOpen} onClose={onClose} lastFocusRef={drawerRef} 
        placement='left' 
        >
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton mt='10px'/>
                <DrawerHeader display='flex' align='center' gap={1} color='purple.500' fontSize={24}>
                    Wisteria
                    <ToggleTheme/>
                </DrawerHeader>
                

                <DrawerBody>
                    <Flex
                    p='5%'
                    flexDir='column'
                    alignItems='flex-start'
                    >

                    <NavItem icon={FaHome} title='Dashboard' path='/'/>
                    <NavMenu projectsList={[user.ownProjects, user.projects]} icon={FaBolt} title='Projects' path='projects'/>
                    <NavItem icon={FaUser} title='My Profile' path='myProfile'/>
                    <NavItem icon={FaBell} title='Notifications' path='notifications'/>

                    </Flex>
                </DrawerBody>

                <DrawerFooter>
                    <Flex
                    p='5%'
                    flexDir='column'
                    w='100%'
                    mb={4}
                >
                    <Divider/>
                        <Flex mt={4} align='center' justify='space-between'>
                            <Flex>
                            <Avatar size={{base: 'sm', md: 'md'}} src={user.avatar}/>
                            <Flex flexDir='column' ml={3}>
                                <Heading as='h3' fontSize={{base: 'sm', md: 'md', lg: 'lg'}}>{user.name}</Heading>
                                <Text color='gray' fontSize={{base: 'sm', md: 'md', lg: 'lg'}}>{user.role}</Text>
                            </Flex>
                            </Flex>
                            <Button rightIcon={<FaArrowRight/>} colorScheme='danger' size={{base: 'sm', md: 'md', lg: 'lg'}} onClick={startLogout}>Log out</Button>
                        </Flex>
                    </Flex>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )

}