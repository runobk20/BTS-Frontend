import { useState } from "react";
import { Link as RLink } from "react-router-dom";
import { Box, Flex, Menu, MenuButton, Icon, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, Button, Link, AccordionIcon, useDisclosure } from "@chakra-ui/react";
import {CreateModal} from '../project/';

const activeStyle = {
    backgroundColor: 'purple.500',
    cursor: 'pointer'
}

export function NavMenu({navSize, navSizeFn, projectsList ,icon, title}) {

    const NAV_CONDITION = (navSize === 'small');

    const [ownProjects, projects] = projectsList;
    const [isOpen, setIsOpen] = useState(false);
    const {isOpen:isModalOpen, onOpen, onClose} = useDisclosure();

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
        <>
        <CreateModal isOpen={isModalOpen} onClose={onClose}/>
        
        <Flex
            mt={30}
            flexDir='column'
            w='100%'
            align={NAV_CONDITION ? 'center' : 'flex-start'}
        >


        <Menu placement='right'>
            <Box
                    as='div'
                    sx={isOpen ? activeStyle : {cursor: 'pointer'}}
                    p={3}
                    borderRadius={8}
                    _hover={{textDecoration: 'none', backgroundColor: 'purple.400'}}
                    w={navSize === 'large' && '100%'}
                onClick={onOpenMenu}
                >
            <MenuButton
                w='100%' 
            >
                <Flex>
                    <Icon as={icon} fontSize='xl' color='gray.400' alignSelf='center'/>
                    <Text ml={5} fontSize={{base: 'sm', sm: 'sm', md: 'md', lg: 'lg'}} display={NAV_CONDITION ? 'none' : 'flex'}>{title}</Text>
                </Flex>
            </MenuButton>
            </Box>
        </Menu>

        {
            (isOpen && navSize === 'large') &&
            <>
                <Button colorScheme='purple' size={{base: 'sm', lg: 'md'}} alignSelf='start' m={3} onClick={onOpen}>Create New</Button>

                <Accordion w='100%' p={3} allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{bg: 'purple.400', borderRadius: '8px'}}>
                            <Box as='span' flex='1' textAlign='left' fontSize={{base: 'sm', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl'}}>Own Projects</Box>
                            <AccordionIcon/>
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
                        <AccordionButton _expanded={{bg: 'purple.400', borderRadius: '8px'}}>
                            <Box as='span' flex='1' textAlign='left' fontSize={{base: 'sm', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl'}}>Others Projects</Box>
                            <AccordionIcon/>
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
        </>
    )
}