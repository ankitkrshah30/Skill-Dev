import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from "axios";

function UserEdit() {
    const [user, setUser] = useState({ id: '', user_id:'', name: '', password: '', 
        address: '', email: '', phone: '' });
    const params = useParams();
    const navigate = useNavigate();

    const txtBoxOnChange = (event) => {
        setUser({
            ...user,
            [event.target.id]: event.target.value
        });
    };

    const readById = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.get(`${baseUrl}/users/${params.id}`);
            setUser(response.data); // Assuming API returns the correct format
        } catch (error) {
            alert("Server Error: Unable to fetch user details");
        }
    };

    const updateUser = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.put(`${baseUrl}/users/${params.id}`, {
                ...user
            });
            setUser(response.data.user);
            alert(response.data.message);
            navigate("/users");
        } catch (error) {
            alert("Server Error: Unable to update user details");
        }
    };

    useEffect(() => {
        readById();
    }, []);

    return (
        <>
            <PageHeader />
            <h3><a href="/users" className="btn btn-light">Go Back</a> Edit User</h3>
            <div className="container">
            <div className="form-group mb-3">
                    <label htmlFor="user_id" className="form-label">User ID:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="user_id" 
                        value={user.user_id}  // ✅ Display correct MongoDB _id
                        readOnly 
                    />
                </div>

                {/* User Name (Read-only) */}
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">User Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={user.name} 
                        readOnly 
                    />
                </div>

                {/* User Password (Read-only) */}
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">User Password:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="password" 
                        value={user.password} 
                        readOnly 
                    />
                </div>

                {/* Editable Address */}
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

                {/* Editable Email */}
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

                {/* Editable Phone */}
                <div className="form-group mb-3">
                    <label htmlFor="phone" className="form-label">User Phone:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="phone" 
                        placeholder="Enter user phone"
                        value={user.phone} 
                        onChange={txtBoxOnChange} 
                    />
                </div>

                <button className="btn btn-warning" onClick={updateUser}>Update User</button>
            </div>
        </>
    );
}

export default UserEdit;