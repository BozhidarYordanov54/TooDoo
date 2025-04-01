import { axiosPrivate } from './axios';

export const useWorkspace = () => {
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