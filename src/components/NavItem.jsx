import { Flex, Link, Menu, MenuButton, Icon, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export function NavItem({navSize, icon, title, active, path = '1'}) {

    const NAV_CONDITION = (navSize === 'small');

    const activeStyle = {
        backgroundColor: 'brand.500',
        color: 'black'
    }

    return (
        <Flex
            mt={30}
            flexDir='column'
            w='100%'
            align={NAV_CONDITION ? 'center' : 'flex-start'}
        >

        <Menu placement='right'>
            <Link
                as={NavLink}
                to={path}
                _activeLink={activeStyle}
                px={3}
                py={3}
                borderRadius={8}
                _hover={{textDecoration: 'none', backgroundColor: 'brand.500'}}
                w={navSize === 'large' && '100%'}
            >
                <MenuButton w='100%'>
                    <Flex>
                        <Icon as={icon} fontSize='xl' color={'gray.800'}/>
                        <Text ml={5} display={NAV_CONDITION ? 'none' : 'flex'}>{title}</Text>
                    </Flex>
                </MenuButton>
            </Link>
        </Menu>

        </Flex>
    )

}