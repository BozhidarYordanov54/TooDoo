export default function MemberCard({ name, username, lastActive }) {
    return (
        <div className="member">
            <div className="member-names">
                <p className="member-name">{name}</p>
                <div className="member-info">
                    <p>@{username}</p>
                    <p>Last Active - {lastActive}</p>
                </div>
            </div>
            <div className="actions">
                <div className="btn-wrapper">
                    <button className="btn change-role">Change Role</button>
                    <div className="btn-info">
                        <p>Changing user role will make him be able to modify different aspects of this workspace</p>
                    </div>
                </div>
                <div className="btn-wrapper">
                    <button className="btn remove">Remove</button>
                    <div className="btn-info">
                        <p>Banning a user will result in him not able to join this workspace</p>
                    </div>
                </div>
                <div className="btn-wrapper">
                    <button className="btn ban">Ban</button>
                    <div className="btn-info">
                        <p>Banning a user will result in him not able to join this worskapce</p>
                    </div>
                </div>
            </div>
        </div>
    )
}