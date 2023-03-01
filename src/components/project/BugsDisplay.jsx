import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Heading, Spacer, Tag, TagLabel, Text, useDisclosure } from "@chakra-ui/react";
import { useAuthStore, useBugStore } from "../../hooks";
import { onViewBug, onOpenDeleteBug, onOpenAssignBug } from "../../helpers";
import { SearchBar, FilterInput } from "../ui";
import { DeleteBugAlert } from '../bugs/DeleteBugAlert';
import { AssignBugModal } from "../bugs/AssignBugModal";
import { attColors, tagColors, tagStyle, formatDate, statusOptions, priorityOptions, severityOptions } from '../../data/bugData';

export function BugsDisplay({bugs = [], isLeader, projectMembers}) {
    const navigate = useNavigate();
    const {setActiveBug} = useBugStore();
    const {user} = useAuthStore();
    const {isOpen, onClose, onOpen} = useDisclosure();
    const {isOpen:isOpenAssign, onClose:onCloseAssign, onOpen:onOpenAssign} = useDisclosure();

    const [searchValue, setSearchValue] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [severityFilter, setSeverityFilter] = useState('');
    const [bugList, setBugList] = useState(bugs);

    function handleChange(e) {
        setSearchValue(e.target.value);
        filterBugs(e.target.value);
    }

    function filterBugsBy(stateValue, bugsArr, filterParam) {
        if(stateValue === '') {
            return setBugList(bugsArr);
        }
       
        const filteredBugs = bugsArr.filter(bug => {
            if(bug[filterParam].includes(stateValue)) {
                return bug;
            }
        });
        setBugList(filteredBugs);
    }

    function filterBugs(searchInput) {
        if(!searchInput) {
            return setBugList(bugs);
        }

        const filteredBugs = bugList.filter(bug => {
            if(bug.title.toLowerCase().includes(searchInput.toLowerCase())) {
                return bug;
            }
        })
        setBugList(filteredBugs);
    }

    return (
        (bugs.length > 0 )
        ? 
        (   <>
            <DeleteBugAlert isOpen={isOpen} onClose={onClose}/>
            <AssignBugModal isOpen={isOpenAssign} onClose={onCloseAssign} projectMembers={projectMembers}/>
            <Flex flexDir='column' gap={3} mb={3}>
            <Box display='flex' flexDir={{base: 'column', lg: 'row'}} gap={3}>
                <SearchBar value={searchValue} onChangeFn={handleChange}/>
                <FilterInput label='Filter by status' value={statusFilter}  defaultValue='All' options={statusOptions} onChangeFn={e => setStatusFilter(e.target.value)} filterFn={filterBugsBy.bind(null, statusFilter, bugs, 'status')}/>
            </Box>
            <Box display='flex' flexDir={{base: 'column', lg: 'row'}} gap={3}>
                <FilterInput label='Filter by priority' value={priorityFilter}  defaultValue='All' options={priorityOptions} onChangeFn={e => setPriorityFilter(e.target.value)} filterFn={filterBugsBy.bind(null, priorityFilter, bugs, 'priority')}/>
                <FilterInput label='Filter by severity' value={severityFilter}  defaultValue='All' options={severityOptions} onChangeFn={e => setSeverityFilter(e.target.value)} filterFn={filterBugsBy.bind(null, severityFilter, bugs, 'severity')}/>
            </Box>
            </Flex>
            <Grid gridTemplateColumns={{base: '1fr', xl: 'repeat(2, 1fr)'}} gridColumnGap={4} gridRowGap={4}>
                {
                bugList.map(bug => {
                    const bugDate = formatDate(bug.date);

                    return (
                        <Card key={bug._id}>
                        <CardHeader>
                            <Flex flexDir={{base: 'column', lg:'row'}} justify='space-between' gap={{base: 2, lg: 3}} mb={1}>
                                <Text color='gray.500'>Id: {bug._id}</Text>
                                <Text color='gray.500'>{bugDate.date}</Text>
                            </Flex>
                            <Flex flexDir={{base: 'column', md: 'row'}} gap={{base: 2, md: 0}} justifyContent='space-between'>
                                <Heading fontSize={{base: '20px', lg: '22px'}}>{bug.title}</Heading>
                                <Tag colorScheme={tagColors[bug.status]} style={tagStyle} maxW='50%'><TagLabel>{bug.status}</TagLabel></Tag>
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
                                    (isLeader || user.uid === bug.user._id ) 
                                    ? <Button colorScheme='red' onClick={onOpenDeleteBug.bind(null, bug, setActiveBug, onOpen)}>Delete</Button>
                                    : <Spacer/>
                                }
                                <Flex gap={3}>
                                {
                                    isLeader && <Button onClick={onOpenAssignBug.bind(null, bug, setActiveBug, onOpenAssign)}>Assign</Button>
                                }
                                <Button colorScheme='purple' onClick={onViewBug.bind(null, bug, setActiveBug, navigate)}>View</Button>
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