import { Box, Card, CardBody, Flex, Heading, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { CommentView, CreateComment } from "../comments";

export function BugComments({comments, column}) {
    return (
        (comments) &&
        <Box gridColumn={column}>
        {(comments.length > 0)
        ? (
            <>
            <CreateComment/>
                {
                    comments.map(comment => {
                        return <CommentView comment={comment} key={comment._id}/>
                    })
                }

            </>
        )
        : (
            <Flex flexDir='column' gap={6}>
                <Heading>This bug have no comments yet</Heading>

                <CreateComment/>
                <Flex flexDir='column' gap={3}>
                    <Card>
                    <CardBody>
                        <SkeletonCircle startColor="purple.500" size={10}/>
                        <SkeletonText startColor="purple.500" mt={4} noOfLines={4} spacing='4' skeletonHeight='2'/>
                    </CardBody>
                    </Card>
                    <Card>
                    <CardBody>
                        <SkeletonCircle startColor="purple.500" size={10}/>
                        <SkeletonText startColor="purple.500" mt={4} noOfLines={4} spacing='4' skeletonHeight='2'/>
                    </CardBody>
                    </Card>
                </Flex>
            </Flex>
        )
        }
        </Box>
    )
}