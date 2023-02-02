import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Tag, TagLabel, Text } from "@chakra-ui/react"
import { useAuthStore } from "../../hooks"

const tagColors = {
    'In Progress': 'blue',
    'Pending': 'yellow',
    'Resolved': 'green',
    'Closed': 'teal',
    'Deferred': 'red',
    'ReOpen': 'blue',
    'Duplicated': 'orange'
}

const attColors = {
    Low: 'blue',
    Medium: 'yellow',
    High: 'orange',
    Critical: 'red',
    Immediate: 'red',
}

const tagStyle = {
    size: {
        base: 'sm',
        md: 'md',
        lg: 'lg'
    }
}

export function BugsDisplay({bugs = [], isLeader}) {

    return (
        (bugs.length > 0 )
        ? 
        (
            <>
                {
                bugs.map(bug => {
                    console.log(bug);
                    return (
                        <Card key={bug._id}>
                        <CardHeader>
                            <Text color='gray.400'>Id: {bug._id}</Text>
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
                                <Text>By: {bug?.user?.name}</Text>
                                <Text>Assigned to: {bug?.assignedTo?.name}</Text>
                            </Box>
                        </CardBody>
                        <CardFooter>
                            <Flex gap={3}>
                                <Button colorScheme='purple'>View</Button>
                                {
                                    isLeader && <Button>Assign</Button>
                                }
                            </Flex>
                        </CardFooter>

                        </Card>
                    )
                })

                }
            </>
        )
        : <Heading fontSize={{base: '18px', md: '20px', lg: '22px'}}>No bugs in this project</Heading>
    )
}