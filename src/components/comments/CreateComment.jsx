import { useEffect, useState } from "react";
import { Button, Flex, Text, Textarea, useToast } from "@chakra-ui/react";
import { useBugStore } from "../../hooks/useBugStore";

export function CreateComment() {
    const toast = useToast();
    const [comment, setComment] = useState('');
    const [charsCounter, setCharsCounter] = useState(250);
    const {activeBug, startAddComment, errorMsg} = useBugStore();
    const handleInputChange = (e) => {setComment(e.target.value), setCharsCounter(250 - e.target.value.length)}
    const invalidInput = charsCounter < 0;

    function onSubmitComment(e) {
        e.preventDefault();
        return (comment.length <= 250) && startAddComment(activeBug._id || activeBug.id, comment)
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
        <Flex as='form' onSubmit={onSubmitComment} flexDir='column' gap={3} mb={6}>
            <Flex alignItems={{base: 'start', lg: 'center'}} flexDir={{base: 'column', lg: 'row'}} gap={3}>
                <Text color={invalidInput ? 'red.500' : 'gray.500'}>Remaining characters: {charsCounter}</Text>
            </Flex>
            <Textarea 
                borderColor={invalidInput ? 'red.500' : 'gray.500'} 
                focusBorderColor={invalidInput ? 'red.500' : 'purple.500'}
                rows={5} placeholder='Comment on this bug!' 
                value={comment} onChange={handleInputChange}></Textarea>
            <Button alignSelf='end' colorScheme={invalidInput ? 'red' : 'purple'} type="submit">{invalidInput ? 'Too long' : 'Add comment'}</Button>
        </Flex>
    )
}