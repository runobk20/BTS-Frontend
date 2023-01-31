import { useState } from "react";
import { Avatar, Button, Divider, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { NavItem } from "./NavItem";
import { FaArrowRight, FaBars, FaBell, FaBolt, FaHome, FaUser } from 'react-icons/fa';
import { NavMenu } from "./NavMenu";

export function Sidebar() {

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
            w={NAV_CONDITION ? '75px' : '220px'}
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
                <IconButton
                    alignSelf={NAV_CONDITION ? 'center' : 'flex-start'}
                    fontSize={25}
                    background='none'
                    mt={5}
                    _hover={{background: 'none'}}
                    icon={<FaBars/>}
                    onClick={onNavSizing}
                />

                <NavItem navSize={navSize} icon={FaHome} title='Dashboard' path='/'/>
                <NavMenu navSize={navSize} navSizeFn={setNavSize} icon={FaBolt} title='Projects' path='projects'/>
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
                    <Avatar size='sm' src=""/>
                    <Flex flexDir='column' ml={4} display={NAV_CONDITION ? 'none' : 'flex'}>
                        <Heading as='h3' size='sm'>Username</Heading>
                        <Text color='gray'>Role</Text>
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
                        onClick={() => {}}
                    />
                    : <Button rightIcon={<FaArrowRight/>} colorScheme='red' mt={5}>Log out</Button>
                }

            </Flex>

        </Flex>
    )
}