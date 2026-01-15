"use client"
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <button
                onClick={() => signIn("discord")}
                className="px-3 py-2 rounded bg-indigo-600 text-white font-[Libre-Bodoni]"
            ><p className="hover-underline-animation-white">Sign in with Discord</p></button>
        );
    }
    return (
        <div className="flex gap-2 items-center top-[2vh] left-[2vh] absolute">
        <button onClick={() => signOut()} className="px-3 py-2 rounded bg-indigo-600 text-white font-[Libre-Bodoni]">
            <p className="hover-underline-animation-white">Sign out</p>
        </button>
        </div>
    )

}