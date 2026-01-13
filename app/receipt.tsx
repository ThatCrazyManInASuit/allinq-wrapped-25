"use client"
import { useState, useEffect, useRef } from "react";
export default function Receipt(props: {messages: any}) {
    const [messageSet, setMessageSet] = useState<[string, number][]>([
        props.messages[Math.floor(Math.random() * props.messages.length)],
        props.messages[Math.floor(Math.random() * props.messages.length)],
        props.messages[Math.floor(Math.random() * props.messages.length)]
    ]);

    const audioRef = useRef<HTMLAudioElement>(null);

    return (
        <div className="bg-[url('/receipt.avif')] bg-cover h-full w-[40vw] text-black font-[Fake-Receipt] p-5 overflow-hidden">
            <audio ref={audioRef} src="/sounds/print-receipt.mp3" preload="auto" />
            <div className="text-center">
                <button onClick={() => {
                    setMessageSet(prev => [
                        props.messages[Math.floor(Math.random() * props.messages.length)],
                        props.messages[Math.floor(Math.random() * props.messages.length)],
                        props.messages[Math.floor(Math.random() * props.messages.length)],
                        ...prev
                    ]);
                    audioRef.current?.play();
                }}><p className="hover-underline-animation">PRINT MESSAGES</p></button>
            </div>
            <div>
                {messageSet.map((message, i) => {
                    return (
                        <div key={i} className="flex m-2">
                            <div className="text-left w-4/5"><p>{message}</p></div>
                            <div className="text-right w-1/5"><p>{(message.length - .01)}</p></div>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}