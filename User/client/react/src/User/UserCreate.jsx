import { useState } from "react";
import PageHeader from "../header/PageHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserCreate() {
    const [user, setUser] = useState({ id: '', user_id:'', name: '', password: '', 
        address: '', email: '', phone: '' });
    const navigate = useNavigate();

    const txtBoxOnChange = (event) => {
        setUser({
            ...user,
            [event.target.id]: event.target.value
        });
    };

    const createUser = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.post(`${baseUrl}/users`, {
                ...user
            });

            const createdUser = response.data.user;
            setUser(createdUser);
            alert(response.data.message);
            navigate("/users");
        } catch (error) {
            alert("Server Error");
        }
    };

    return (
        <>
            <PageHeader />
            <h3><a href="/users" className="btn btn-light">Go Back</a>Add User</h3>
            <div className="container">
                
                {/* Manually Entered User ID */}
                <div className="form-group mb-3">
                    <label htmlFor="user_id" className="form-label">User ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="user_id"
                        placeholder="Enter user ID"
                        value={user.user_id}
                        onChange={txtBoxOnChange}
                    />
                </div>

                {/* User Name */}
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">User Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter user name"
                        value={user.name}
                        onChange={txtBoxOnChange}
                    />
                </div>

                {/* User Password */}
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">User Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter user password"
                        value={user.password}
                        onChange={txtBoxOnChange}
                    />
                </div>

                {/* User Address */}
                <div className="form-group mb-3">
                    <label htmlFor="address" className="form-label">User Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter user address"
                        value={user.address}
                        onChange={txtBoxOnChange}
                    />
                </div>

                {/* User Email */}
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">User Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter user email"
                        value={user.email}
                        onChange={txtBoxOnChange}
                    />
                </div>

                {/* User Phone */}
                <div className="form-group mb-3">
                    <label htmlFor="phone" className="form-label">User Phone:</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Enter user phone"
                        value={user.phone}
                        onChange={txtBoxOnChange}
                    />
                </div>

                <button className="btn btn-primary" onClick={createUser}>
                    Create User
                </button>
            </div>
        </>
    );
}

export default UserCreate;