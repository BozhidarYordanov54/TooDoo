import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const fetchUrl = `http://localhost:5058/api/profile/details`;

export default function Profile() {
	const { token } = useContext(AuthContext);
	const [profile, setProfile] = useState({});

	useEffect(() => {
		const dataProfile = async () => {
			try {
				const response = await axios.get(fetchUrl, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.status === 200) {
					setProfile(response.data.model);
				}
			} catch (error) {
				console.error(error);
			}
		};

		dataProfile();
	}, []);

	if (profile === null) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h1>Profile</h1>
			<p>First Name: {profile.firstName}</p>
			<p>Last Name: {profile.lastName}</p>
			<p>Email: {profile.userName}</p>
			{/* Render other profile details */}
		</div>
	);
}
