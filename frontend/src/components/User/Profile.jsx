import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";

import '../../css/forms.css'

const fetchUrl = `api/profile/details`;

export default function Profile() {
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [userName, setUserName] = useState('');
	const [isLoading, setIsLoading] = useState(true);

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
			}
			finally {
				setIsLoading(false);
			}
		};

		dataProfile();
	}, []);

	const usernameHandler = (e) => {
		if (e.target.value.length > 0) {
			e.target.classList.add("filled");
		}
		setUserName(e.target.value);
	}

	const firstNameHandler = (e) => {
		if (e.target.value.length > 0) {
			e.target.classList.add("filled");
		}
		setFirstName(e.target.value);
	}

	const lastNameHandler = (e) => {
		if (e.target.value.length > 0) {
			e.target.classList.add("filled");
		}
		setLastName(e.target.value);
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<h1>Profile</h1>
			<form className="form profile" method="post">
				<div className="form-group">
					<input
						className="filled"
						type="text"
						name="username"
						id="username"
						onChange={usernameHandler}
						value={userName}
					/>
					<label htmlFor="username">Username</label>
				</div>
				<div className="form-group">
					<input
						className="filled"
						type="text"
						name="firstName"
						id="firstName"
						onChange={firstNameHandler}
						value={firstName} />
					<label htmlFor="firstName">First name</label>
				</div>
				<div className="form-group">
					<input
						className="filled"
						type="text"
						name="lastName"
						id="lastName"
						onChange={lastNameHandler}
						value={lastName} />
					<label htmlFor="firstName">Last name</label>
				</div>
			</form>
		</div>
	);
}
