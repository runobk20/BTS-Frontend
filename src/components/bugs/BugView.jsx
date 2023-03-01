import { useEffect } from "react";
import { useAuthStore, useBugStore } from "../../hooks";
import { Box, Button, Card, CardBody, Divider, Flex, Grid, Heading, HStack, IconButton, Tag, TagLabel, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { attColors, tagColors, tagStyle, formatDate } from '../../data/bugData';
import { BugComments } from "./BugComments";
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom";
import { UpdateBugModal } from "./UpdateBugModal";

export function BugView() {
    const navigate = useNavigate();
    const toast = useToast();
    const {user} = useAuthStore();
    const {bugId} = useParams();
    const {activeBug, fetchedBug, startGetBug, errorMsg} = useBugStore();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const bug = activeBug || fetchedBug;
    const bugDate = bug && formatDate(bug.date);

    useEffect(() => {
        if(!activeBug) {
            startGetBug(bugId);
        }
    }, []);

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
        (bug) && (
            <>
            <IconButton
                    aria-label="Navigate back to project"
                    position='absolute' top='2' left='12'
                    fontSize={20}
                    background='none'
                    icon={<FaArrowLeft/>}
                    onClick={() => navigate(`/projects/${bug.project._id}`)}
                />
            <UpdateBugModal isOpen={isOpen} onClose={onClose} bug={bug}/>
            <Grid templateColumns={{base: '1', xl: '2fr 1fr'}} gap={6}>
                <VStack alignItems='start' spacing={8}>
                    <Card w='100%'>
                    <CardBody>
                    <Flex gap={3} justify='space-between'>
                        <Flex flexDir='column' gap={3}>
                            <Heading as='h2'>{bug.title}</Heading>
                            <Heading as='h3' fontSize={20} mb={6}>Project: {bug.project.name}</Heading>
                        </Flex>
                        {
                            (user.uid === bug.user._id || user.uid === bug.project.leader) && <Button colorScheme='purple' onClick={() => onOpen(true)}>Edit</Button>
                        }
                    </Flex>
                    <HStack w={{base: '100%', xl: '70%'}} gap={3} justify='space-between'>
                        <Flex flexDir='column' gap={2} justify='start'>
                        <Text>Status: <Tag colorScheme={tagColors[bug.status]} style={tagStyle}><TagLabel>{bug.status}</TagLabel></Tag></Text>
                        <Text>Priority: <Tag colorScheme={attColors[bug.priority]}>{bug.priority}</Tag></Text>
                        <Text>Severity: <Tag colorScheme={attColors[bug.severity]}>{bug.severity}</Tag></Text>
                        </Flex>

                        <Flex flexDir='column' gap={3} justify='start'>
                        <Text>Created on: <Text as='span' color='gray.500'>{bugDate.date}</Text></Text>
                        <Text>By: <Text as='span' color='gray.500'>{bug.user.name}</Text></Text>
                        <Text>Assigned to: <Text as='span' color='gray.500'>{bug.assignedTo?.name || 'Not assigned yet'}</Text></Text>
                        </Flex>
                    </HStack>
                    </CardBody>
                    </Card>
                    <Card w='100%'>
                    <CardBody>
                        <VStack align='start' gap={3}>
                        <Box>
                            <Heading as='h3' mb={3} fontSize={24}>Description</Heading>
                            <Text fontSize={{base: '16px', md: '18px', lg: '20px'}}>{bug.description}</Text>
                        </Box>
                        <Divider/>
                        <Box>
                            <Heading as='h3' mb={3} fontSize={24}>Steps to reproduce</Heading>
                            <Text fontSize={{base: '16px', md: '18px', lg: '20px'}}>{bug.stepsToRep}</Text>
                        </Box>
                        <Divider/>
                        <Box>
                            <Heading as='h3' mb={3} fontSize={24}>Actual result</Heading>
                            <Text fontSize={{base: '16px', md: '18px', lg: '20px'}}>{bug.actualResult}</Text>
                        </Box>
                        <Divider/>
                        <Box>
                            <Heading as='h3' mb={3} fontSize={24}>Expected result</Heading>
                            <Text fontSize={{base: '16px', md: '18px', lg: '20px'}}>{bug.expectedResult}</Text>
                        </Box>
                        </VStack>
                    </CardBody>
                    </Card>

                </VStack>

                <BugComments comments={bug.comments} column={{base: '1', xl: '2'}}/>
            </Grid>
            </>
        )
    )

}