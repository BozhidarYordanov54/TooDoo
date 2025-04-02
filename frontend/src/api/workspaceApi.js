import { axiosPrivate } from './axios';

export const useDashboard = () => {
    const createWorkspace = async (workspaceName, workspaceDescription) => {
        try {
            const response = await axiosPrivate.post('api/workspace/create', {
                name: workspaceName,
                description: workspaceDescription,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            return response;
        } catch (error) {
            console.log(error);
        }
    };

    return {
        createWorkspace,
    }
}

export const useWorkspaces = () => {
    const createBoard = async (workspaceName, boardName, boardDescription, imageUrl) => {
        try {
            const response = await axiosPrivate.post(`api/workspace/createBoard/${workspaceName}`, {
                workspaceName: workspaceName,
                name: boardName,
                description: boardDescription,
                imageUrl: imageUrl,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const createTask = async (boardId, taskName, taskDescription, taskDueDate, taskPriority) => {
        try {
            const response = await axiosPrivate.post('api/workspace/createTask', {
                boardId: boardId,
                name: taskName,
                description: taskDescription,
                dueDate: taskDueDate,
                priority: taskPriority,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const createInviteLink = async (workspaceName) => {
        try {
            const response = await axiosPrivate.post('api/workspace/createInvite', 
                {headers: {ContentType: 'application/json'}}, 
                { params: { workspaceName: workspaceName } })

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const getWorkspaceMembers = async (workspaceId) => {
        console.log(workspaceId);
        try {
            const response = await axiosPrivate.get(`api/workspace/members/${workspaceId}`, {
                headers: { ContentType: 'application/json' }
            });

            console.log(response);

            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const getWorkpsaceSettings = async (workspaceId) => {
        try {
            const response = await axiosPrivate.get(`api/workspace/getWorkspaceSettings/${workspaceId}`);

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const getWorkspaceBoards = async (workspaceName) => {
        try {
            const response = await axiosPrivate.get(`api/workspace/getWorkspaceBoards/${workspaceName}`,
                { headers: { ContentType: 'application/json' } },
                { params: { workspaceName: workspaceName } }
            );

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        createBoard,
        createTask,
        createInviteLink,
        getWorkspaceMembers,
        getWorkpsaceSettings,
        getWorkspaceBoards,
    }
}

export const useBoard = () => {
    const getBoardTasks = async (boardId) => {
        try {
            const response = await axiosPrivate.get(`api/workspace/getBoardTasks/${boardId}`);

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getBoardTasks,
    }
}