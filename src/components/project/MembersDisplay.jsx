import { useState } from "react";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { AddMemberModal } from "./AddMemberModal";
import { RemoveMemberAlert } from "./RemoveMemberAlert";

export function MembersDisplay({projectMembers = [], isLeader, projectId}) {

    const [selectedMember, setSelectedMember] = useState('');
    const {isOpen:remMemberIsOpen, onOpen:remMemberOpen, onClose:remMemberClose} = useDisclosure();
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
    <>
        <AddMemberModal isOpen={isOpen} onClose={onClose} projectId={projectId}/>
        <RemoveMemberAlert isOpen={remMemberIsOpen} onClose={remMemberClose} projectId={projectId} member={selectedMember}/>

        <Accordion w='100%' allowToggle>
            <AccordionItem>
                <Heading as='h3'>
                    <AccordionButton _expanded={{bg: 'purple.500'}}>
                        <Box as='span' flex='1' textAlign='left'>Members</Box>
                        <AccordionIcon/>
                    </AccordionButton>
                </Heading>
                <AccordionPanel pb={4}>
            {
                (projectMembers.length > 0)
                ? (
                    <>
                        <TableContainer>
                            <Table size='sm' variant='striped' colorScheme='blackAlpha'>
                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Role</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                    projectMembers && (
                                        projectMembers.map(member => {
                                            return (
                                                <Tr 
                                                    borderX='2px solid' borderColor='transparent'
                                                    _hover={{
                                                    cursor: 'pointer', borderX: '2px solid', 
                                                    borderColor: 'purple.500'}} key={member._id}
                                                    onClick={() => setSelectedMember(member)}
                                                >
                                                    <Td>{member.name}</Td>
                                                    <Td>{member.role}</Td>
                                                </Tr>
                                                )
                                        })
                                        )  
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                        {
                            isLeader && (
                                <Flex justify='end' gap={3} mt={3}>
                                    <Button colorScheme='purple' size='sm' onClick={() => onOpen(true)}>Add</Button>
                                    <Button colorScheme='danger' size='sm' onClick={() => remMemberOpen(true)}>Remove</Button>
                                </Flex>
                            )
                        }
                    </>
                ) : <>
                        {
                            isLeader && 
                            <>
                                <Text>This project don't have any members, start adding people!</Text>
                                <Flex justify='end'><Button colorScheme='purple' color='black' size='sm' mt={2} onClick={() => onOpen(true)}>Add</Button></Flex>
                            </>
                        }
                    </>
            }
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    </>
    )
}