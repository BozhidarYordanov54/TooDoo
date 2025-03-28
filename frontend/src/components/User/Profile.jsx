import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";

import '../../css/forms.css'
import '../../css/profile.css'

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

	useEffect(() => {
        const inputs = document.querySelectorAll('.form-group input');
        inputs.forEach((input) => {
            if (input.value.length > 0) {
                input.classList.add('filled');
            }
        });
    }, [email, firstName, lastName, userName]);

	const setEmailHandler = (e) => {
		if (e.target.value.length > 0) {
			e.target.classList.add("filled");
		}
		setEmail(e.target.value);
	}

	const setUsernameHandler = (e) => {
		if (e.target.value.length > 0) {
			e.target.classList.add("filled");
		}
		setUserName(e.target.value);
	}

	const setFirstNameHandler = (e) => {
		if (e.target.value.length > 0) {
			e.target.classList.add("filled");
		}
		setFirstName(e.target.value);
	}

	const setLastNameHandler = (e) => {
		if (e.target.value.length > 0) {
			e.target.classList.add("filled");
		}
		setLastName(e.target.value);
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className="profile-wrapper">
			<h1>Profile</h1>
			<form className="form profile" method="post">
				<div className="multiple-input-wrapper">
					<div className="form-group">
						<input
							type="text"
							name="firstName"
							id="firstName"
							onChange={setFirstNameHandler}
							value={firstName}
						/>
						<label htmlFor="firstName">First Name</label>
					</div>
					<div className="form-group">
						<input
							type="text"
							name="lastName"
							id="lastName"
							onChange={setLastNameHandler}
							value={lastName}
						/>
						<label htmlFor="lastName">Last Name</label>
					</div>
				</div>
				<div className="multiple-input-wrapper">
					<div className="form-group">
						<input
							type="text"
							name="email"
							id="email"
							onChange={setEmailHandler}
							value={email}
						/>
						<label htmlFor="email">Email</label>
					</div>
					<div className="form-group">
						<input
							type="text"
							name="username"
							id="username"
							onChange={setUsernameHandler}
							value={userName}
						/>
						<label htmlFor="username">Username</label>
					</div>
				</div>
				<button className="btn submit" type="submit">Update profile</button>
			</form>
		</div>
	);
}
