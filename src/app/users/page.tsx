"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getUsers } from "@/services/userService";
import { IUser } from "@/services/userService";


const UsersPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toString().includes(search)
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h1>Users</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    placeholder="Search users..."
                    style={{ marginBottom: "10px", padding: "5px" }}
                />
            </form>
            <ul>
                {currentUsers.map(user => (
                    <li key={user.id}>
                        <Link href={`/users/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UsersPage;