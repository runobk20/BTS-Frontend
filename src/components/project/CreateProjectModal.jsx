import { useEffect, useState } from "react";
import { useProject } from "../../hooks";
import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react";

export function CreateProjectModal({isOpen, onClose}) {
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');
        const {startCreateProject, errorMsg} = useProject();
        const toast = useToast();

        function onCreateProject(event) {
            event.preventDefault();
            startCreateProject({name, description});
            setName('');
            setDescription('');
            onClose();
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
                <ModalHeader>Create project</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Text>Fill the project information!</Text>
                    <Box as='form' onSubmit={onCreateProject}>
                        <FormControl my={4} isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="Project name" value={name} onChange={({target}) => setName(target.value)}/>
                        </FormControl>
                        <FormControl my={4} isRequired>
                            <FormLabel>Description</FormLabel>
                            <Input placeholder="Description" value={description} onChange={({target}) => setDescription(target.value)}/>
                        </FormControl>
                        <Flex justify='end' my={4} gap={3}>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button colorScheme='purple' type='submit'>Create</Button>
                        </Flex>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

}