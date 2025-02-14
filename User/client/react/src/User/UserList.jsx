import { useEffect, useState } from "react";
import PageHeader from "../header/PageHeader";
import axios from "axios";

function UserList() {
    const [users, setUsers] = useState([]);
    
    const readAllUsers = async () => {
    try {
        const baseUrl = "http://localhost:8080";
        const response = await axios.get(`${baseUrl}/users`);
        
        console.log("API Response:", response.data); // ✅ Debugging step
        
        if (Array.isArray(response.data)) {
            setUsers(response.data); // ✅ Ensure response is an array
        } else {
            console.error("Invalid API response format:", response.data);
            setUsers([]); // Fallback to empty array
        }
    } catch (error) {
        console.error("Server Error: Unable to fetch users", error);
        alert("Server Error: Unable to fetch users");
        setUsers([]); // Fallback to empty array
    }
};

    
    const deleteUser = async (id) => {
        if (!confirm("Are you sure to delete this user?")) {
            return;
        }
        try {
            const baseUrl = "http://localhost:8080";
            const response = await axios.delete(`${baseUrl}/users/${id}`);
            alert(response.data.message);
            await readAllUsers();
        } catch (error) {
            alert("Server Error: Unable to delete user");
        }
    };
    
    useEffect(() => {
        readAllUsers();
    }, []);
    
    return (
        <>
            <PageHeader />
            <h3>List of Users</h3>
            <div className="container">
                <table className="table table-warning table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Password</th>
                            <th scope="col">Address</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.user_id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.password}</td>
                                    <td>{user.address}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <a href={`/users/view/${user.id}`} className="btn btn-success">View</a>
                                        &nbsp;
                                        <a href={`/users/edit/${user.id}`} className="btn btn-warning">Edit</a>
                                        &nbsp;
                                        <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="8">No Data Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserList;