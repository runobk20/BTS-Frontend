import { useEffect } from "react";
import { useAuthStore, useBugStore } from "../../hooks";
import { chakra, Box, Button, Card, CardBody, CardFooter, Divider, Flex, Grid, Heading, HStack, IconButton, Spacer, Tag, TagLabel, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
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
    const { fetchedBug, startGetBug, errorMsg, activeBug} = useBugStore();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const bug = activeBug || fetchedBug;
    const bugDate = bug && formatDate(bug.date);

    useEffect(() => {
        if(!activeBug) {
            startGetBug(bugId);
        }
    }, []);

    useEffect(() => {
        if(errorMsg !== null) {
            console.log('Running bugview')
            toast({
            title: 'BUG VIEW...',
            description: errorMsg,
            status: 'error',
            duration: 5000,
            isClosable: true,
            variant: 'solid',
            position: 'top-right'
            }
        )}
    },[errorMsg]);

    return (
        (bug) && (
            <>
            <UpdateBugModal isOpen={isOpen} onClose={onClose} bug={bug}/>
            <Grid templateColumns={{base: '1', lg: '2fr 1fr'}} gap={6}>
                <VStack alignItems='start' spacing={8}>
                
                    <Card width='100%'>
                    <CardBody>
                    <Flex gap={3} justify='space-between' alignItems='center'>
                        <Flex flexDir='column' gap={3}>
                            <Flex gap={3} alignItems='center'>
                                <IconButton
                                    display='block'
                                    aria-label="Navigate back to project"
                                    fontSize={20}
                                    background='none'
                                    _hover={{bg: 'none'}}
                                    icon={<FaArrowLeft/>}
                                    onClick={() => navigate(`/projects/${bug.project._id}`)}
                                />
                                <Heading as='h2' fontSize={{base: '26px', md: '28px'}}>{bug.title}</Heading>
                            </Flex>
                            <Heading as='h3' fontSize={20} mb={3} color='gray.500'>{bug.project.name}</Heading>
                        </Flex>
                    </Flex>
                    <HStack w={{base: '100%', xl: '70%'}} gap={3} justify='space-between'>
                        <Flex flexDir='column' gap={3} justify='start'>
                            <Tag maxW='100px' colorScheme={tagColors[bug.status]} style={tagStyle}><TagLabel>{bug.status}</TagLabel></Tag>
                            
                            <Flex flexDir={{base: 'column', lg: 'row'}} justifyContent='space-between' gap={{base: 0, lg: 3}}>
                                <Text>Priority</Text>
                                <Spacer/>
                                <Tag colorScheme={attColors[bug.priority]}>{bug.priority}</Tag>
                            </Flex>
                            <Flex flexDir={{base: 'column', lg: 'row'}} justifyContent='space-between' gap={{base: 0, lg: 3}}>
                                <Text>Severity</Text>
                                <Spacer/>
                                <Tag colorScheme={attColors[bug.severity]}>{bug.severity}</Tag>
                            </Flex>
                        </Flex>

                        <Flex flexDir='column' gap={3} justify='start'>
                            <Flex flexDir={{base: 'column', lg: 'row'}} justifyContent='space-between' gap={{base: 1, lg: 3}}>
                                <Text>Created on</Text>
                                <Text as='span' color='gray.500'>{bugDate.date}</Text>
                            </Flex>
                            <Flex flexDir={{base: 'column', lg: 'row'}} justifyContent='space-between' gap={{base: 1, lg: 3}}>
                                <Text>By</Text>
                                <Text as='span' color='gray.500'>{bug.user.name}</Text>
                            </Flex>
                            <Flex flexDir={{base: 'column', lg: 'row'}} justifyContent='space-between' gap={{base: 1, lg: 3}}>
                                <Text>Assigned to</Text>
                                <Text as='span' color='gray.500'>{bug.assignedTo?.name || 'Not assigned'}</Text>
                            </Flex>
                        </Flex>
                    </HStack>
                    </CardBody>
                    <CardFooter>
                        {
                            (user.uid === bug.user._id || user.uid === bug.project.leader) && <Button ml='auto' colorScheme='purple' onClick={() => onOpen(true)}>Edit</Button>
                        }
                    </CardFooter>
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
                            <chakra.pre fontSize={{base: '16px', md: '18px', lg: '20px'}} fontFamily='body' whiteSpace='pre-line'>{bug.stepsToRep}</chakra.pre>
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

                <BugComments comments={bug.comments} column={{base: '1', lg: '2'}}/>
            </Grid>
            </>
        )
    )

}