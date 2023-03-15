import { useEffect, useState } from "react";
import { useBugStore } from "../../hooks";
import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";

export function AssignBugModal({onClose, isOpen, projectMembers}) {
    const toast = useToast();
    const [selectedMember, setSelectedMember] = useState(false);
    const {errorMsg, activeBug, startAssignMember} = useBugStore();

    function onAssignMember() {
        startAssignMember(activeBug._id, {member: selectedMember});
    }

    useEffect(() => {
        if(errorMsg !== null) toast({
            title: 'Assign Bug...',
            description: errorMsg,
            status: 'error',
            duration: 5000,
            isClosable: true,
            variant: 'solid',
            position: 'top-right'
        })
    },[errorMsg]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
        <ModalOverlay/>
            <ModalContent>
            <ModalHeader>Assign Member</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Box as="form" gap={3}>
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
                </Box>
            </ModalBody>
            <ModalFooter>
                <Flex gap={3}>
                    <Button onClick={() => onClose()}>Close</Button>
                    <Button colorScheme='purple' isDisabled={!selectedMember} onClick={onAssignMember}>Assign Bug</Button>
                </Flex>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}