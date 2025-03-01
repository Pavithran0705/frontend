import { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    return (
        <div className="container mt-3">
            <h2>User List</h2>
            <ul className="list-group">
                {users.map(user => (
                    <li key={user.id} className="list-group-item">
                        {user.name} - {user.email} - {user.age} years old - {user.gender}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
