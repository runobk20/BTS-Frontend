import { Box, Flex, Menu, MenuButton, Icon, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, Button, Link } from "@chakra-ui/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
    backgroundColor: 'brand.600',
    color: 'white'
}

export function NavMenu({navSize, navSizeFn, icon, title, path}) {

    const NAV_CONDITION = (navSize === 'small');
    const [isOpen, setIsOpen] = useState(false);

    function onOpenMenu() {
        if(NAV_CONDITION && !isOpen) {
            navSizeFn('large');
            setIsOpen(true);
        } else if(NAV_CONDITION && isOpen) {
            navSizeFn('large');
        } else {
            setIsOpen(!isOpen);
        }
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
                    p={3}
                    borderRadius={8}
                    _hover={{textDecoration: 'none', backgroundColor: 'brand.500', color: 'white'}}
                    w={navSize === 'large' && '100%'}
                onClick={onOpenMenu}
                >
            <MenuButton
                w='100%' 
            >
                <Flex>
                    <Icon as={icon} fontSize='xl' color={'gray.800'}/>
                    <Text ml={5} display={NAV_CONDITION ? 'none' : 'flex'}>{title}</Text>
                </Flex>
            </MenuButton>
            </Link>
        </Menu>

        {
            (isOpen && navSize === 'large') &&
            <>
                <Button colorScheme='secondary' size='sm' alignSelf='start' m={3}>Create New</Button>

                <Accordion w='100%' p={3} allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{bg: 'brand.600', color: 'white', borderRadius: '8px'}}>
                            <Box as='span' flex='1' textAlign='left'>Own Projects</Box>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <p>Project 1</p>
                        <p>Project 2</p>
                        <p>Project 3</p>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{bg: 'brand.600', color: 'white', borderRadius: '8px'}}>
                            <Box as='span' flex='1' textAlign='left'>Others Projects</Box>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <p>Project 1</p>
                        <p>Project 2</p>
                        <p>Project 3</p>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            </>
        }

        </Flex>
    )
}