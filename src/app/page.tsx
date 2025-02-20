"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
    const router = useRouter();
    const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("user");

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/users");
        }
    }, [isLoggedIn, router]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Добро пожаловать!</h1>
            <p>Вам нужно авторизоваться, чтобы продолжить.</p>
            <Link href="/login">
                <button style={{ padding: "10px 20px", fontSize: "16px" }}>Войти</button>
            </Link>
        </div>
    );
}