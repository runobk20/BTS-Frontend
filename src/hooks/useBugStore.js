import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import backendApi from "../api/backendApi";
import { onError, onSetActiveBug } from "../store";

export function useBugStore() {
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {activeBug, errorMsg, onCleanError} = useSelector(state => state.bug);
    const [fetchedBug, setFetchedBug] = useState();

    function setActiveBug(bug) {
        dispatch(onSetActiveBug(bug));
    }

    async function startGetBug(bugId) {
        try {
            const {data} = await backendApi.get(`/bugs/${bugId}`);
            setFetchedBug(data.bug);
        } catch (error) {
            const errMsg = error.response?.data.msg || 'Something went wrong';
            dispatch(onError(errMsg));
            setTimeout(() => {
                dispatch(onCleanError(null));
            }, 200);
        }
        }

    async function startCreateBug(bug, projectId) {

        try {
            const {data} = await backendApi.post('/bugs/new', bug);
            const {bug:newBug} = data;
            dispatch(onSetActiveBug(newBug));
            toast({
                title: 'Bug created',
                description: 'You are being redirected!',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: 'solid',
                position: 'top-right'
            });

            setTimeout(() => {
                navigate(`/projects/${projectId}/bug/${data.bug.id}`);
            }, 3000);

        } catch (error) {
            const errMsg = error.response?.data.msg || 'Something went wrong';
            dispatch(onError(errMsg));
            setTimeout(() => {
                dispatch(onCleanError(null));
            }, 200);
        }
    }

    async function startDeleteBug(bugId) {

        try {

            await backendApi.delete(`/bugs/${bugId}`);
            setActiveBug(null);
            toast({
                title: 'Success',
                description: 'The bug has been deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: 'solid',
                position: 'top-right'
            });
            //Manage bugs in project with store state
        } catch (error) {
            const errMsg = error.response?.data.msg || 'Something went wrong';
            dispatch(onError(errMsg));
            setTimeout(() => {
                dispatch(onCleanError(null));
            }, 200);
        }

    }

    async function startUpdateBug(bugId, updatedData) {

        try {
            await backendApi.put(`bugs/${bugId}`, updatedData);
            toast({
                title: 'Bug updated',
                description: 'The page is going to reload!',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: 'solid',
                position: 'top-right'
            });

            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } catch (error) {
            const errMsg = error.response?.data.msg || 'Something went wrong';
            dispatch(onError(errMsg));
            setTimeout(() => {
                dispatch(onCleanError());
            }, 200);
        }
    }

    async function startAssignMember(bugId, member) {

        try {

            await backendApi.put(`bugs/${bugId}/assign`, member);
            toast({
                title: 'Bug assigned',
                description: 'The page is going to reload!',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: 'solid',
                position: 'top-right'
            });

            setTimeout(() => {
                window.location.reload();
            }, 3000);
            
        } catch (error) {
            const errMsg = error.response?.data.msg || 'Something went wrong';
            dispatch(onError(errMsg));
            setTimeout(() => {
                dispatch(onCleanError(null));
            }, 200);
        }
    }

    async function startAddComment(bugId, comment) {

        try {
            await backendApi.post('comments', {bugId, comment});
            toast({
                title: 'Comment added',
                description: 'Thank you for your contribution...',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: 'solid',
                position: 'top-right'
            });

        } catch (error) {
            const errMsg = error.response?.data.msg || 'Something went wrong';
            dispatch(onError(errMsg));
            setTimeout(() => {
                dispatch(onCleanError(null));
            }, 200);
        }
    }

    async function startDeleteComment(comId, comCreator, comBug) {
        try {
            await backendApi.delete('comments/delete', {
                data: {
                        commentId: comId,
                        commentCreator: comCreator,
                        commentBug: comBug                    
                }
            });

            toast({
                title: 'Comment deleted',
                description: 'This comment would not be showed next time...',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: 'solid',
                position: 'top-right'
            });
            
        } catch (error) {
            const errMsg = error.response?.data.msg || 'Something went wrong';
            dispatch(onError(errMsg));
            setTimeout(() => {
                dispatch(onCleanError(null));
            }, 200);
        }
    }

    return {
        //Props
        activeBug,
        errorMsg,
        fetchedBug,

        //Methods
        startCreateBug,
        startDeleteBug,
        setActiveBug,
        startGetBug,
        startUpdateBug,
        startAssignMember,
        startAddComment,
        startDeleteComment
    }
}