import MemberCard from "./MemberCard"
import '../../../css/members.css'
import { useParams } from "react-router-dom"

export default function Members() {
    const { workspaceName } = useParams();

    return (
        <div className="members">
            <h4 className="member-header">Members - {workspaceName}</h4>
            <div className="members-wrapper">
                <div className="member-list">
                    <MemberCard />
                    <MemberCard />
                </div>
            </div>
        </div>
    )
}