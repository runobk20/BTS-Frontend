import { Card, CardBody, Flex, Heading, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export function BugComments({comments}) {

    return (
        (comments.length > 0)
        ? (
            <></>
        )
        : (
            <Flex flexDir='column' gap={6}>
                <Heading>This bug have no comments yet</Heading>

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
    )
}