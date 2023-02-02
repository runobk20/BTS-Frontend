import { useState } from "react";
import { Avatar, Button, Divider, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { NavItem } from "./NavItem";
import { NavMenu } from "./NavMenu";
import { FaArrowRight, FaBars, FaBell, FaBolt, FaHome, FaUser } from 'react-icons/fa';
import { useAuthStore } from "../../hooks";
import { ToggleTheme } from "./ToggleTheme";

export function Sidebar() {

    const {user, startLogout} = useAuthStore();
    const [navSize, setNavSize] = useState('large');
    const NAV_CONDITION = (navSize === 'small');

    const onNavSizing = () => NAV_CONDITION ? setNavSize('large') : setNavSize('small');

    return (
        <Flex
            pos='sticky'
            left='0'
            bottom='0'
            boxShadow='0 4px 6px 0 rgba(0, 0, 0, 0.5)'
            borderRightRadius={NAV_CONDITION ? '15px' : '8px'}
            w={NAV_CONDITION ? '75px' : {sm: '200px', md: '250px', lg: '300px'}}
            flexDir='column'
            justifyContent='space-between'
            overflow='scroll'
            css={{
                '&::-webkit-scrollbar': {
                  width: '0',
                }
            }}
        >
            <Flex
                p='5%'
                flexDir='column'
                alignItems='flex-start'
                as='nav'
            >
                <Flex align='center' w='100%' justify={NAV_CONDITION ? 'center' : 'start'} mt={4} flexDir={NAV_CONDITION ? 'column' : 'row'}>
                    <IconButton
                        alignSelf={NAV_CONDITION ? 'center' : 'flex-start'}
                        fontSize={25}
                        background='none'
                        _hover={{background: 'none'}}
                        icon={<FaBars/>}
                        onClick={onNavSizing}
                    />
                    <ToggleTheme/>
                </Flex>

                <NavItem navSize={navSize} icon={FaHome} title='Dashboard' path='/'/>
                <NavMenu navSize={navSize} navSizeFn={setNavSize} projectsList={[user.ownProjects, user.projects]} icon={FaBolt} title='Projects' path='projects'/>
                <NavItem navSize={navSize} icon={FaUser} title='My Profile' path='myProfile'/>
                <NavItem navSize={navSize} icon={FaBell} title='Notifications' path='notifications'/>

            </Flex>
 
            {/* Bottom */}
            <Flex
                p='5%'
                flexDir='column'
                w='100%'
                alignItems={NAV_CONDITION ? 'center' : 'flex-start'}
                mb={4}
            >
                <Divider display={NAV_CONDITION ? 'none' : 'flex'}/>
                <Flex mt={4} align='center'>
                    <Avatar size={{base: 'sm', md: 'md'}} src={user.avatar}/>
                    <Flex flexDir='column' ml={4} display={NAV_CONDITION ? 'none' : 'flex'}>
                        <Heading as='h3' fontSize={{base: 'sm', md: 'md', lg: 'lg'}}>{user.name}</Heading>
                        <Text color='gray' fontSize={{base: 'sm', md: 'md', lg: 'lg'}}>{user.role}</Text>
                    </Flex>
                </Flex>
                {
                    NAV_CONDITION
                    ? <IconButton 
                        alignSelf='center'
                        fontSize={20}
                        color='white'
                        background='red.500'
                        mt={5}
                        _hover={{background: 'red.600'}}
                        icon={<FaArrowRight/>}
                        onClick={startLogout}
                    />
                    : <Button rightIcon={<FaArrowRight/>} colorScheme='danger' mt={5} size={{base: 'sm', md: 'md', lg: 'lg'}} onClick={startLogout}>Log out</Button>
                }

            </Flex>

        </Flex>
    )
}