export default function Reaction(props: {reactions: any}) {
    return (
        <div className="flex flex-col bg-[url(/notebook-paper.png)] bg-center bg-contain h-[64vh] w-[115vh] text-[5vh] items-center justify-center text-black font-[Acki-Preschool] rotate-[2deg]">
            <audio autoPlay className="hidden" src="/sounds/paper.mp3" preload="auto"></audio>
            <b>You gave {props.reactions.given} reactions this year</b>
            <b>and received {props.reactions.received}!</b>
            <div className="text-center text-[2vh]">
                <p>{props.reactions.frequencies[0][0]}</p>
                <b> used {props.reactions.frequencies[0][1]} times</b>
            </div>
            <div className="flex gap-5">
                <div className="text-center text-[2vh]">
                    <p>{props.reactions.frequencies[1][0]}</p>
                    <b> used {props.reactions.frequencies[1][1]} times</b>
                </div>
                <div className="text-center text-[2vh]">
                    <b>←You loved {props.reactions.frequencies[0][0]}, but these were pretty nice too→</b>
                </div>
                <div className="text-center text-[2vh]">
                    <p>{props.reactions.frequencies[2][0]}</p>
                    <b> used {props.reactions.frequencies[2][1]} times</b>
                </div>
            </div>
        </div>
    )
}