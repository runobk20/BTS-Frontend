import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import backendApi from "../api/backendApi";

export function useProject() {

    const [isLoading, setisLoading] = useState(false);
    const [project, setProject] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();
    const toast = useToast();

    async function startGetProject(id) {
        setisLoading(true);
        try {

            const {data} = await backendApi.get(`/projects/${id}`);
            setProject(data.project);
            setisLoading(false);

        } catch (error) {
            console.log(error)
            const errMsg = error.response?.data.msg || 'Something went wrong';
            setErrorMsg(errMsg);
            setTimeout(() => {
                setErrorMsg(null);
            }, 200);
        }
    }

    async function startCreateProject(projectData) {
        try {
            const {data} = await backendApi.post(`/projects/new`, projectData);
            const {bugs, members, ...project} = data.project;

            toast({
                title: 'Project created',
                description: 'You are being redirected!',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: 'solid',
                position: 'top-right'
            });

            setTimeout(() => {
                navigate(`/projects/${project.id}`);
            }, 3000);

        } catch(error) {
            const errMsg = error.response.data.msg || 'Something went wrong';
            setErrorMsg(errMsg);
            setTimeout(() => {
                setErrorMsg(null);
            }, 200);
        }
    }

    async function startDeleteProject(id) {
        try {

            await backendApi.delete(`/projects/${id}`);
            toast({
                title: 'Success',
                description: 'Project deleted, you are being redirected',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: 'solid',
                position: 'top-right'
            })

            setTimeout(() => {
                navigate('/');
            }, 3000)
            
        } catch (error) {
            const errMsg = error.response?.data.msg || 'Something went wrong';
            setErrorMsg(errMsg);
            setTimeout(() => {
                setErrorMsg(null);
            }, 200);
        }
    }

    async function startAddMember(projectId, email) {
        try {

            await backendApi.post(`/projects/${projectId}/add-member`, email);
            toast({
                title: 'Success',
                description: 'User added to project',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: 'solid',
                position: 'top-right'
            })

        } catch(error) {
            const errMsg = error.response.data.msg || 'Something went wrong';
            setErrorMsg(errMsg);
            setTimeout(() => {
                setErrorMsg(null);
            }, 200);
        }
    }

    async function startRemoveMember(projectId, memberId) {
        try {
            
            await backendApi.put(`/projects/${projectId}/remove-member`, memberId);
            toast({
                title: 'Success',
                description: 'User removed from project',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: 'solid',
                position: 'top-right'
            })

        } catch (error) {
            const errMsg = error.response.data.msg || 'Something went wrong';
            setErrorMsg(errMsg);
            setTimeout(() => {
                setErrorMsg(null);
            }, 200);
        }
    }

    return {
        //Props
        isLoading,
        errorMsg,
        project,
        //Methods
        startAddMember,
        startCreateProject,
        startDeleteProject,
        startRemoveMember,
        startGetProject
    }
}