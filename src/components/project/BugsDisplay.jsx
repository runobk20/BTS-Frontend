import { useNavigate } from "react-router-dom";
import { useAuthStore, useBugStore } from "../../hooks";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Heading, Tag, TagLabel, Text, useDisclosure } from "@chakra-ui/react";
import { attColors, tagColors, tagStyle, formatDate } from '../../data/bugData';
import { DeleteBugAlert } from '../bugs/DeleteBugAlert';
import { AssignBugModal } from "../bugs/AssignBugModal";

export function BugsDisplay({bugs = [], isLeader, projectMembers}) {
    const navigate = useNavigate();
    const {setActiveBug} = useBugStore();
    const {user} = useAuthStore();
    const {isOpen, onClose, onOpen} = useDisclosure();
    const {isOpen:isOpenAssign, onClose:onCloseAssign, onOpen:onOpenAssign} = useDisclosure();

    function onViewBug(bug) {
        setActiveBug(bug);
        navigate(`/projects/${bug.project}/bug/${bug._id}`);
    }

    function onOpenDeleteBug(bug) {
        setActiveBug(bug);
        onOpen(true);
    }

    function onOpenAssignBug(bug) {
        setActiveBug(bug);
        onOpenAssign(true);
    }

    return (
        (bugs.length > 0 )
        ? 
        (   <>
            <DeleteBugAlert isOpen={isOpen} onClose={onClose}/>
            <AssignBugModal isOpen={isOpenAssign} onClose={onCloseAssign} projectMembers={projectMembers}/>
            <Grid gridTemplateColumns={{base: '1fr', xl: 'repeat(2, 1fr)'}} gridColumnGap={4} gridRowGap={4}>
                {
                bugs.map(bug => {
                    const bugDate = formatDate(bug.date);

                    return (
                        <Card key={bug._id}>
                        <CardHeader>
                            <Flex justify='space-between' gap={3} mb={1}>
                                <Text color='gray.500'>Id: {bug._id}</Text>
                                <Text color='gray.500'>{bugDate.date}</Text>
                            </Flex>
                            <Flex flexDir='row' justifyContent='space-between'>
                                <Heading fontSize={{base: '16px', md: '18px', lg: '20px'}}>{bug.title}</Heading>
                                <Tag colorScheme={tagColors[bug.status]} style={tagStyle}><TagLabel>{bug.status}</TagLabel></Tag>
                            </Flex>
                        </CardHeader>
                        <CardBody display='flex' justifyContent='space-between'>
                            <Box display='flex' flexDir='column' gap={3}>
                                <Text>Priority: <Tag colorScheme={attColors[bug.priority]}>{bug.priority}</Tag></Text>
                                <Text>Severity: <Tag colorScheme={attColors[bug.severity]}>{bug.severity}</Tag></Text>
                            </Box>
                            <Box display='flex' flexDir='column' gap={3}>
                                <Text>By: <Text as='span' color='gray.500'>{bug.user.name}</Text></Text>
                                <Text>Assigned to: <Text as='span' color='gray.500'>{bug.assignedTo?.name || 'Not assigned'}</Text></Text>
                            </Box>
                        </CardBody>
                        <CardFooter>
                            <Flex gap={3} w='100%' justifyContent='space-between'>
                                {
                                    (isLeader || user.uid === bug.user._id ) && <Button colorScheme='red' onClick={onOpenDeleteBug.bind(null, bug)}>Delete</Button>
                                }
                                <Flex gap={3}>
                                {
                                    isLeader && <Button onClick={onOpenAssignBug.bind(null, bug)}>Assign</Button>
                                }
                                <Button colorScheme='purple' onClick={onViewBug.bind(null, bug)}>View</Button>
                                </Flex>
                            </Flex>
                        </CardFooter>

                        </Card>
                    )
                })
                }
            </Grid>
            </>
        )
        : <Heading fontSize={{base: '18px', md: '20px', lg: '22px'}}>No bugs in this project</Heading>
    )
}