"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Menu() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <nav style={{ display: "flex", alignItems: "center", backgroundColor: "#eee", padding: "10px" }}>
            <div style={{ flex: 1 }}>
                {user ? (
                    <>
                        <Link href="/users" style={{ marginRight: "15px" }}>
                            Users
                        </Link>
                        <Link href="/recipes" style={{ marginRight: "15px" }}>
                            Recipes
                        </Link>
                    </>
                ) : (
                    <Link href="/login">Login</Link>
                )}
            </div>
            {user && (
                <div style={{ fontWeight: "bold" }}>
                    {user.username || user.name}
                </div>
            )}
        </nav>
    );
}
