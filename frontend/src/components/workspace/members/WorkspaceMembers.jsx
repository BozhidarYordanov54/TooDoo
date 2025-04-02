import MemberCard from "./MemberCard"
import '../../../css/members.css'
import { useParams } from "react-router-dom"
import { useWorkspaces } from "../../../api/workspaceApi";
import { useEffect, useState } from "react";

export default function Members() {
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([]);

    const { workspaceName } = useParams();
    const { getWorkspaceMembers } = useWorkspaces()

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getWorkspaceMembers(workspaceName);

                if (response.status === 200) {
                    setMembers(response.data);
                }
            } catch (error) {
                console.error("Error fetching members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();


    }, [])

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="members">
            <h4 className="member-header">Members - {workspaceName}</h4>
            <div className="members-wrapper">
                <div className="member-list">
                    {members.length > 0 ? (
                        members.map((member) => (
                            <MemberCard
                                key={member.id}
                                name={member.name}
                                username={member.name}
                                lastActive={member.lastActive}
                            />
                        ))
                    ) : (
                        <h2 className="no-data">No members found.</h2>
                    )}
                </div>
            </div>
        </div>
    )
}