import { useState } from "react";
import { NavLink, Link as RLink } from "react-router-dom";
import { Box, Flex, Menu, MenuButton, Icon, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, Button, Link } from "@chakra-ui/react";

const activeStyle = {
    backgroundColor: 'brand.600',
    color: 'white'
}

export function NavMenu({navSize, navSizeFn, projectsList ,icon, title, path}) {

    const [ownProjects, projects] = projectsList;

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
                    <Icon as={icon} fontSize='xl' color={'gray.800'} alignSelf='center'/>
                    <Text ml={5} fontSize={{base: 'sm', sm: 'sm', md: 'md', lg: 'lg'}} display={NAV_CONDITION ? 'none' : 'flex'}>{title}</Text>
                </Flex>
            </MenuButton>
            </Link>
        </Menu>

        {
            (isOpen && navSize === 'large') &&
            <>
                <Button colorScheme='secondary' p={{base: 1.5}} size={{base: 'sm', sm: 'sm', md: 'md', lg: 'lg'}} alignSelf='start' m={3}>Create New</Button>

                <Accordion w='100%' p={3} allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{bg: 'brand.600', color: 'white', borderRadius: '8px'}}>
                            <Box as='span' flex='1' textAlign='left' fontSize={{base: 'sm', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl'}}>Own Projects</Box>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {
                            ownProjects.map(project => {
                                return <Link key={project.id} as={RLink} to={`/projects/${project.id}`} display='block' fontSize={{base: 'sm', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl'}}>{project.name}</Link>
                            })
                        }
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{bg: 'brand.600', color: 'white', borderRadius: '8px'}}>
                            <Box as='span' flex='1' textAlign='left' fontSize={{base: 'sm', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl'}}>Others Projects</Box>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {
                            projects.map(project => {
                                return <Link key={project.id} as={RLink} to={`/projects/${project.id}`} display='block' fontSize={{base: 'sm', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl'}}>{project.name}</Link>
                            })
                        }
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            </>
        }

        </Flex>
    )
}