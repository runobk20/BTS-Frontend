import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore, useProject } from "../hooks";
import { Avatar, Box, Button, Divider, Flex, Grid, Heading, HStack, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { DeleteAlert, Loader, MembersDisplay } from "../components";
import { BugsDisplay } from "../components/project/BugsDisplay";

export function ProjectPage() {
    const toast = useToast();
    const {projectId} = useParams();
    const {user} = useAuthStore();
    const {errorMsg, isLoading, project:fetchedProject, startGetProject} = useProject();
    const {isOpen, onOpen, onClose} = useDisclosure();
    
    const {bugs, members, leader, ...project} = fetchedProject;

    useEffect(() => {
        startGetProject(projectId);
    },[projectId]);

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
    }, [errorMsg]);
    

    if(isLoading) return <Loader/>

    return(
        (fetchedProject) && (
            <>

            <DeleteAlert isOpen={isOpen} onClose={onClose} projectId={projectId}/>
                <Grid templateColumns={{base: '1', md: '1fr 2fr'}} gap={5}>
                    <VStack alignItems='start' flexBasis='1'>
                        <Box>
                            <Heading as='h2'>{project.name}</Heading>
                            <Text>{project.description}</Text>
                        </Box>
                            <Flex direction='column' gap={2} w='100%'>
                                <Heading fontSize={20}>Leader: </Heading>
                                <Flex gap={2} align='center' justify='space-between'>
                                    <HStack>
                                        <Avatar size='sm' src={leader && leader.avatar}/>
                                        <Text fontSize='lg'>{leader && leader.name}</Text>
                                    </HStack>
                                    {
                                        (leader && user.uid === leader._id) && <Button alignSelf='flex-end' colorScheme='danger' onClick={onOpen}>Delete Project</Button>
                                    }
                                </Flex>
                            </Flex>
                        <Divider/>

                        <MembersDisplay projectMembers={members} isLeader={leader && user.uid === leader._id} projectId={projectId}/>
                    </VStack>
                    <Flex flexBasis='2' alignContent='start' flexDir='column'>
                        <Heading>Bugs</Heading>
                            
                        <BugsDisplay bugs={bugs}/>
                    </Flex>
                </Grid>
            </>
        )
    )
}