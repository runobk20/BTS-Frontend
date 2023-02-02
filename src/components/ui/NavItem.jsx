import { Flex, Link, Menu, MenuButton, Icon, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export function NavItem({navSize, icon, title, path}) {

    const NAV_CONDITION = (navSize === 'small');

    const activeStyle = {
        backgroundColor: 'purple.500',
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
                _hover={{textDecoration: 'none', backgroundColor: 'purple.400'}}
                w={navSize === 'large' && '100%'}
            >
                <MenuButton w='100%'>
                    <Flex>
                        <Icon as={icon} fontSize='xl' color='gray.400' alignSelf='center'/>
                        <Text ml={5} fontSize={{base: 'sm', md: 'md', lg: 'lg'}} display={NAV_CONDITION ? 'none' : 'flex'}>{title}</Text>
                    </Flex>
                </MenuButton>
            </Link>
        </Menu>

        </Flex>
    )

}