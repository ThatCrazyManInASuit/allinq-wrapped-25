"use client"

import AuthButton from "./AuthButton";
import Card from "../app/card"
import { useState } from "react";


export default function Interactibles(props: {userId: string}) {
  
    const [currentCard, setCurrentCard] = useState(0);
    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <AuthButton />
            <div className = "fixed top-1/2 left-0 z-50 h-[5vw] w-[5vw]" onClick = {() => setCurrentCard(prev => Math.max(prev - 1, 0))}>
                <img src="/left-arrow.png" className="object-fill"></img>
            </div>
            <div className = "fixed top-1/2 right-0 z-50 h-[5vw] w-[5vw]" onClick = {() => setCurrentCard(prev => prev + 1)}>
                <img src="/left-arrow.png" className="object-fill rotate-[180deg]"></img>
            </div>
            <Card id = {currentCard} userId={props.userId}></Card>
        </div>
    );
}
