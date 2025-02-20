"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (username === "admin" && password === "1234") {
            localStorage.setItem("user", JSON.stringify({ username }));
            router.push("/users");
        } else {
            setError("Неверные данные!");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Вход</h1>
            <form onSubmit={handleLogin} style={{ display: "inline-block", textAlign: "left" }}>
                <div>
                    <label>Логин:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ display: "block", marginBottom: "10px", padding: "5px" }}
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ display: "block", marginBottom: "10px", padding: "5px" }}
                    />
                </div>
                <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
                    Войти
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}