"use client"

import data from "../public/data/output.json"
import WordBox from "./wordbox";
import ReportExtra from "./report-extra";
import Receipt from "./receipt";
import Reaction from "./reactions";
import { useState, useEffect } from "react";
import "./chart";
import { Bar } from "react-chartjs-2";


import SAM from 'sam-js';
import StockBoard from "./stockboard";
let sam = new SAM();

export default function Card(props: {id: number, userId: string}) {
  let user = data[props.userId as keyof typeof data];

  type Direction = "forwards" | "backwards";

  const [displayID, setDisplayID] = useState(0);
  const [forwardInAnimation, setForwardInAnimation] = useState(true);
  const [backwardInAnimation, setBackwardInAnimation] = useState(true);
  const [direction, setDirection] = useState<Direction>("forwards");
  
  type GraphView = {view: "month"} | {view: "day", month: number}

  const [graphView, setGraphView] = useState<GraphView>({view: "month"});

  useEffect(() => {
    let prevID = displayID;
    if (props.id > prevID) {
      setDirection("forwards");
      setForwardInAnimation(false);
      const timeout = setTimeout(() => {
        setDisplayID(props.id);
        setForwardInAnimation(true);
      }, 700);
      return () => clearTimeout(timeout);
    } else {
      setDirection("backwards");
      setBackwardInAnimation(false);
      const timeout = setTimeout(() => {
        setDisplayID(props.id);
        setBackwardInAnimation(true);
      }, 700);
      return () => clearTimeout(timeout);
    }
    
  }, [props.id]);



  let content, animation = "";
  const textAnimation = useAnimation("animate-fade-in", "animate-fade-out", "animate-fade-in", "animate-fade-out") + " font-[Typewriter]";
  switch (displayID) {
    case 0:
      content = <div className = {textAnimation}>The date is December 31st, 2024.</div>
      break;
    case 1:
      content = <div className = {textAnimation}>You receive a call, from a mysterious voice, claiming they can tell the future.</div>
      break;
    case 2:
      content = <div className = {textAnimation}>Your mind swirls at the idea of what the future could hold. Maybe you're going to be rich! Or maybe you'll have a car crash... </div>
      break;
    case 3:
      content = <div className = {textAnimation}>Hopping out of your car, you arrive at the address given to you: an abandoned warehouse.</div>
      break;
    case 4:
      content = <div className = {textAnimation}>After breaking a few windows and slamming through some doors, you finally make it inside.</div>
      break;
    case 5:
      content = <div className = {textAnimation}>However, you are only met with a vast collection of boxes.</div>
      break;
    case 6:
      content = <div className = {textAnimation}>Disappointed, you begin to turn to leave, when one box catches your eye...</div>
      break;
    case 7:
      content = (
        <div className = {"flex flex-col bg-[url('/cardboard.jpg')] bg-cover bg-center bg-no-repeat h-[80vh] w-[80vh] text-center justify-center"}>
          <p className=" font-[Marker] text-black text-[48pt]">{user.usernameDebug}</p>
          <p className=" font-[Marker] text-black text-[24pt]">circa 2025</p>
        </div>
      )
      animation = useAnimation("animate-box-up", "animate-box-down", "animate-box-up", "animate-box-down");
      break;
    case 8:
      content = <div className = {textAnimation}><i>How strange...</i> you think to yourself. <i>Is this my Discord nickname in All Inquiries in 2025?</i></div>
      break;
    case 9:
      content = <div className = {textAnimation}>
        You peer inside the box and find a random assortment of papers and doodads, reports and printers, balls and pits.
        </div>
      break;
    case 10:
      content = (
        <div className = "flex flex-col bg-[url(/fortune.png)] bg-cover h-9/10 w-[45vh] text-center justify-end pb-[25vh] rotate-[-7deg]">
          <p className = {`text-black font-[Libre-Bodoni] font-thin text-[24pt] ${useAnimation("animate-fade-in", "animate-fade-out", "animate-fade-in", "animate-fade-out")}`}>In 2025, you will post {user.totalMessages} messages...</p>
        </div>
      );
      animation = useAnimation("animate-pick-up", "", "", "animate-put-down");
      break;
    case 11:
      content = (
        <div className = "flex flex-col bg-[url(/fortune.png)] bg-cover h-9/10 w-[45vh] text-center justify-end pb-[18vh] rotate-[-7deg]">
          <p className = {`text-black font-[Libre-Bodoni] font-thin text-[24pt] ${useAnimation("animate-fade-in", "animate-fade-out", "animate-fade-in", "animate-fade-out")}`}>Of those your longest message will be {user.longestMessage} characters long...</p>
        </div>
      );
      break;
    case 12:
      content = (
        <div className = "flex flex-col bg-[url(/fortune.png)] bg-cover h-9/10 w-[45vh] text-center justify-end pb-[12vh] rotate-[-7deg]">
          <p className = {`text-black font-[Libre-Bodoni] font-thin text-[24pt] ${useAnimation("animate-fade-in", "animate-fade-out", "animate-fade-in", "animate-fade-out")}`}>
            Throughout those messages, it will be an average of {user.averageWordsPerMessage} words per message!
          </p>
        </div>
      );
      animation = useAnimation("", "animate-put-down", "animate-pick-up", "");
      break;
    case 13:
      content = <div className = {textAnimation}>
        "Woah!" you exclaim as you watch the words change on the card. "Am I tripping balls?" you wonder aloud. You also wonder what other whimsical items are in the box.
        </div>
      break;
    case 14:
      content = (
        <div className = "flex flex-col font-[Monserrat] font-bold text-center h-[90vh] w-[63vh] bg-white rotate-[7deg] p-5">
          <p className = "text-black text-[24pt]">2025 ANNUAL REPORT</p>
            <button
              onClick={() => setGraphView({ view: "month" })}
              className={"text-black flex pl-5"}
            >
              <p className = {graphView.view == "day" ? "hover-underline-animation" : ""}>{graphView.view == "month" ? "CLICK MONTH FOR CALENDAR VIEW" : "← BACK TO MONTHS"}</p>
            </button>
          <Bar
            datasetIdKey='id'
            data={getGraphView()}
            options={{
                onClick: (_: unknown, elements: any[]) => {
                  if (!elements.length) return;

                  if (graphView.view === "month") {
                    setGraphView({ view: "day", month: elements[0].index });
                  }
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                animation: {
                  duration: 500,
                  easing: 'easeOutCubic'
                }
              }}
          />
          <ReportExtra user={user}></ReportExtra>
        </div>
      );
      animation = useAnimation("animate-pick-up", "animate-put-down", "animate-pick-up", "animate-put-down");
      break;
    case 15:
      content = <div className = {textAnimation}>
        Immediately upon the sight of a report, which are for nerds, you get really bored and start to leave, when all of a sudden, a TV falls on you.
        </div>
      break;
    case 16:
      content = <StockBoard userId={props.userId}></StockBoard>
      animation = useAnimation("animate-box-up", "animate-box-down", "animate-box-up", "animate-box-down");
      break;
    case 17:
      content = <div className = {textAnimation}>
        Scared that another TV will fall on you, you run for the exit, only to trip over another box.
        </div>
      break;
    case 18:
      content = (
        <div className = {"bg-[url('/cardboard.jpg')] bg-cover bg-center bg-no-repeat h-[80vh] w-[80vh] text-center"}>
          <p className="fixed text-black font-[Marker] text-[24pt]">Your favorite words</p>
          <WordBox words = {user.words as [string, number][]}></WordBox>
        </div>
      )
      animation = useAnimation("animate-box-up", "animate-box-down", "animate-box-up", "animate-box-down");
      break;
    case 19:
      content = <div className = {textAnimation}>
        Having tripped and broken your neck, an ambulance takes you to the hospital, where they give you an itemized receipt that your clumsiness accrued.
        </div>
      break;
    case 20:
      content = (
        <Receipt messages={user.messages}></Receipt>
      )
      animation = useAnimation("animate-box-up", "animate-box-down", "animate-box-up", "animate-box-down");
      break;
    case 21:
      content = <div className = {textAnimation}>
        As you wheel yourself out of the hospital, you think yourself: <i>Man, 2025 will be a crazy year.</i> But then you suddenly feel the urge to write down your favorite Discord reactions!
        </div>
      break;
    case 22:
      content = <Reaction reactions={user.reactions}></Reaction>
      animation = useAnimation("animate-pick-up", "animate-put-down", "animate-pick-up", "animate-put-down");
      break;
    default:
      content = <div>ERR CARD NOT FOUND!</div>
      break;
  }
  
  
  return (
    <div className={`flex items-center justify-center h-full ${animation}`}>
      {content}
    </div>
  );

  function useAnimation(inAnimationForward: string, outAnimationForward: string, inAnimationBackward: string, outAnimationBackward: string) {
    if (direction == "forwards")
      return forwardInAnimation ? inAnimationForward : outAnimationForward;
    else
      return backwardInAnimation ? inAnimationBackward : outAnimationBackward;
  }

  function getGraphView() {
    const MONTH_ARR: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    if (graphView.view == "month") 
      return {
        labels: MONTH_ARR,
        datasets: [
          {
            label: '',
            data: user.months,
          },
        ],
      }
    else {
      let month: number = graphView.month;
      let result = {
        labels: new Array(user.calendar[month].length).fill(0),
        datasets: [
          {
            label: '',
            data: user.calendar[month],
          },
        ],
      }
      for (let i = 0; i < result.labels.length; i++)
        result.labels[i] = `${MONTH_ARR[month]} ${i + 1}`;
      return result
    }
      
  }
}

