import { useEffect, useState } from "react";
import { useProject } from "../../hooks";
import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react";

export function AddMemberModal(props) {
        const {isOpen, onClose, projectId} = props;
        const [email, setEmail] = useState('');
        const {startAddMember, errorMsg} = useProject();
        const toast = useToast();

        function onAddMember(event) {
            event.preventDefault();
            startAddMember(projectId, {email});
            setEmail('');
        }

        useEffect(() => {
            if(errorMsg !== null) toast({
                title: 'Oops...',
                description: errorMsg,
                status: 'error',
                duration: 5000,
                isClosable: true,
                variant: 'solid',
                position: 'top-right'
            })
        },[errorMsg]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Add new member</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Text>Add a member by it's email</Text>
                    <Box as='form' onSubmit={onAddMember}>
                        <FormControl my={4} isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' placeholder="User Email" value={email} onChange={({target}) => setEmail(target.value)}/>
                        </FormControl>
                        <Flex justify='end' my={4} gap={4}>
                            <Button colorScheme='danger' onClick={onClose}>Cancel</Button>
                            <Button colorScheme='purple' color='black' type='submit'>Add</Button>
                        </Flex>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}