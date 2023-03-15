import { chakra, Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthStore, useBugStore } from "../../hooks";

export function CommentView({comment}) {
    const toast = useToast();
    const {user} = useAuthStore();
    const {errorMsg, startDeleteComment} = useBugStore();
    const isCommentOwner = comment && comment.user.id === user.uid;

    function onDeleteComment() {
        startDeleteComment(comment._id, comment.user.id, comment.bug);
    }

    console.log(comment.content)

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
    <Card maxHeight='250px' my={3}>
        <CardHeader display='flex' alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center'>
            <Avatar name={comment.user.name} src={comment.user.avatar}/>
            <Text ml={3}>{comment.user.name}</Text>
            </Flex>
            <Text>{comment.user.role}</Text>
        </CardHeader>
        <Divider w='90%' m='0 auto' color='gray.300'/>
        <CardBody>
            <chakra.pre
                fontFamily='body'
                whiteSpace='pre-line'
            >
                {comment.content}
            </chakra.pre>
        </CardBody>
        <CardFooter>
            {
                (isCommentOwner) && (<Button colorScheme='red' ml='auto' onClick={onDeleteComment}>Delete</Button>)
            }
        </CardFooter>
    </Card>
    )
}