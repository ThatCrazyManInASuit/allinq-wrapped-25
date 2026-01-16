"use client"
import { useState, useEffect, useRef } from "react";
import Sentiment from "sentiment";

let sentiment = new Sentiment();

export default function Receipt(props: {messages: any}) {
    const [messageSet, setMessageSet] = useState<[string, number][]>([
        props.messages[Math.floor(Math.random() * props.messages.length)],
        props.messages[Math.floor(Math.random() * props.messages.length)],
        props.messages[Math.floor(Math.random() * props.messages.length)]
    ]);

    const audioRef = useRef<HTMLAudioElement>(null);

    return (
        <div className="flex flex-col bg-[url('/receipt.avif')] bg-cover h-full w-[40vw] text-black font-[Fake-Receipt] p-5 overflow-hidden items-center">
            <audio ref={audioRef} src="/sounds/print-receipt.mp3" preload="auto" />
            <div className="w-[20vh] bg-black/15 p-2 rounded-full text-center">
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
            <audio autoPlay className="hidden" src="/sounds/paper.mp3" preload="auto"></audio>
            <div>
                <div className="flex m-2">
                    <div className="text-left w-4/5 text-[2.5vh]"><p>Message</p></div>
                    <div className="text-right w-1/5 text-[2.5vh]"><p>Sentiment</p></div>
                </div>
                {messageSet.map((message, i) => {
                    return (
                        <div key={i} className="flex m-2">
                            <div className="text-left w-4/5 text-[1.75vh]"><p>{message}</p></div>
                            <div className="text-right w-1/5 text-[1.75vh]"><p>{sentiment.analyze(message).score.toFixed(2)}</p></div>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}