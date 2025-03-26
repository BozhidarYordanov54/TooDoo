import { useContext, useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

import '../../css/forms.css'

const fetchUrl = `api/profile/details`;

export default function Profile() {
	const[email, setEmail] = useState('');
	const[firstName, setFirstName] = useState('');
	const[lastName, setLastName] = useState('');
	const[userName, setUserName] = useState('');
	const[isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const dataProfile = async () => {
			try {
				setIsLoading(true);
				const response = await axiosPrivate.get(fetchUrl);

				if (response.status === 200) {
					setEmail(response.data.model.email);
					setFirstName(response.data.model.firstName);
					setLastName(response.data.model.lastName);
					setUserName(response.data.model.userName);
				}
			} catch (error) {
				console.error(error);
			}
			finally{
				setIsLoading(false);
			}
		};

		dataProfile();
	}, []);



	const userProfileHandler = (event) => {
		const { name, value } = event.target;
	
		if (name === "username") {
			setUserName(value);
		} else if (name === "firstName") {
			setFirstName(value);
		} else if (name === "lastName") {
			setLastName(value);
		}
	};

	if(isLoading){
		return <div>Loading...</div>
	}

	return (
		<div>
			<h1>Profile</h1>
			<form className="form profile" action="" method="post">
				<div className="form-group">
					<input
						type="text"
						name="username"
						id="username"
						onChange={userProfileHandler}
						value={userName}
					/>
					<label htmlFor="username">Username</label>
				</div>
				<div className="form-group">
					<input
						type="text"
						name="firstName"
						id="firstName"
						onChange={userProfileHandler}
						value={firstName} />
					<label htmlFor="firstName">First name</label>
				</div>
				<div className="form-group">
					<input
						type="text"
						name="lastName"
						id="lastName"
						onChange={userProfileHandler}
						value={lastName} />
					<label htmlFor="firstName">First name</label>
				</div>
			</form>
		</div>
	);
}
