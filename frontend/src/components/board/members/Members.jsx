import MemberCard from "./MemberCard"
import '../../../css/members.css'

export default function Members() {
    return (
        <div className="members">
            <h4 className="member-header">Members</h4>
            <div className="members-wrapper">
                <div className="member-list">
                    <MemberCard />
                    <MemberCard />
                </div>
            </div>
        </div>
    )
}