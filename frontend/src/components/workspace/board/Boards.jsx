import { useEffect, useState } from "react"
import { useWorkspaces } from "../../../api/workspaceApi";
import { useParams } from "react-router-dom";
import CardLink from "../../dashboard/CardLink";

import AddBoardForm from "../../forms/AddBoardForm";

export default function Boards() {
    const [isLoading, setIsLoading] = useState(true);
    const [boards, setBoards] = useState([]);
    const { getWorkspaceBoards } = useWorkspaces();
    const { workspaceName } = useParams();

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await getWorkspaceBoards(workspaceName);
                if (response.status === 200) {
                    setBoards(response.data.boards);
                }
            } catch (error) {
                console.error("Error fetching boards:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchBoards();
    }, [])

    if (isLoading) {
        return (
            <div className="loading">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <>
            <div className="boards">
                <h4 className="member-header">Boards</h4>
                <div className="boards-wrapper">
                    {boards.length > 0 ? (
                        boards.map((board) => (
                            <CardLink key={board.id} workspaceName={workspaceName} name={board.name} imgURL={board.imageUrl} />
                        ))
                    ) : (
                        <h2 className="no-data">No boards found.</h2>
                    )}
                    <AddBoardForm workspaceName={workspaceName} setBoards={setBoards} />
                </div>
            </div>
        </>
    )
}