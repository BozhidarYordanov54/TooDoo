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
    const createBoard = async (workspaceName) => {
        try {
            const response = await axiosPrivate.post('api/workspace/createBoard', {
                name: workspaceName,
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

    const createInviteLink = async (workspaceId) => {
        try {
            const response = await axiosPrivate.post('api/workspace/createInviteLink', {
                workspaceId: workspaceId,
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

    const getWorkspaceMembers = async (workspaceId) => {
        try {
            const response = await axiosPrivate.get(`api/workspace/getWorkspaceMembers/${workspaceId}`);

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const getWorkpsaceSettings = async (workspaceId) => {
        try {
            const response = await axiosPrivate.get(`api/workspace/getWorkspaceSettings/${workspaceId}`);

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const getWorkspaceBoards = async (workspaceId) => {
        try {
            const response = await axiosPrivate.get(`api/workspace/getWorkspaceBoards/${workspaceId}`);

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