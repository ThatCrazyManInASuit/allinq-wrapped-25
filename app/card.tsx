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
  const textAnimation = useAnimation("animate-fade-in", "animate-fade-out", "animate-fade-in", "animate-fade-out") + " font-[Typewriter] text-center text-[2vh]";
  switch (displayID) {
    case 0:
      content = <div className = {textAnimation}>The date is December 31st, 2024.</div>
      break;
    case 1:
      content = <div className = {textAnimation}>
        <audio autoPlay className="hidden" src="/sounds/phone.mp3" preload="auto"></audio>
        You receive a call, from a mysterious voice, claiming they can tell the future.
        </div>
      break;
    case 2:
      content = <div className = {textAnimation}>
        <audio autoPlay className="hidden" src="/sounds/open-car-door.mp3" preload="auto"></audio>
        As you hop in your car, your mind swirls at the idea of what the future could hold. This knowledge could give you so much power... 
        </div>
      break;
    case 3:
      content = <div className = {textAnimation}>
        <audio autoPlay className="hidden" src="/sounds/close-car-door.mp3" preload="auto"></audio>
        Hopping out of your car, you arrive at the address given to you: an abandoned warehouse.
        </div>
      break;
    case 4:
      content = <div className = {textAnimation}>
        <audio autoPlay className="hidden" src="/sounds/glass-breaking.mp3" preload="auto"></audio>
        After breaking a few windows and slamming through some doors, you finally make it inside.
        </div>
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
          <p className="font-[Acki-Preschool] font-bold text-black text-[8vh]">{user.usernameDebug}</p>
          <p className="font-[Acki-Preschool] text-black text-[4vh] font-bold">circa 2025</p>
        </div>
      )
      animation = useAnimation("animate-box-up", "animate-box-down", "animate-box-up", "animate-box-down");
      break;
    case 8:
      content = <div className = {textAnimation}><i>How strange...</i> you think to yourself. <i>Is that my Discord nickname?</i></div>
      break;
    case 9:
      content = <div className = {textAnimation}>
        <audio autoPlay className="hidden" src="/sounds/box-open.mp3" preload="auto"></audio>
        You open the box and find a random assortment of papers and doodads, reports and printers, balls and pits.
        </div>
      break;
    case 10:
      content = (
        <div className = "flex flex-col bg-[url(/fortune.png)] bg-cover h-9/10 w-[45vh] text-center justify-end pb-[25vh] rotate-[-7deg]">
          <audio autoPlay className="hidden" src="/sounds/card.mp3" preload="auto"></audio>
          <p className = {`text-black font-[Libre-Bodoni] font-thin text-[4vh] ${useAnimation("animate-fade-in", "animate-fade-out", "animate-fade-in", "animate-fade-out")}`}>In 2025, you will post {user.totalMessages} messages...</p>
        </div>
      );
      animation = useAnimation("animate-pick-up", "", "", "animate-put-down");
      break;
    case 11:
      content = (
        <div className = "flex flex-col bg-[url(/fortune.png)] bg-cover h-9/10 w-[45vh] text-center justify-end pb-[18vh] rotate-[-7deg]">
          <p className = {`text-black font-[Libre-Bodoni] font-thin text-[4vh] ${useAnimation("animate-fade-in", "animate-fade-out", "animate-fade-in", "animate-fade-out")}`}>
            Of those, your longest message will be {user.longestMessage} characters long...
          </p>
        </div>
      );
      break;
    case 12:
      content = (
        <div className = "flex flex-col bg-[url(/fortune.png)] bg-cover h-9/10 w-[45vh] text-center justify-end pb-[12vh] rotate-[-7deg]">
          <p className = {`text-black font-[Libre-Bodoni] font-thin text-[4vh] ${useAnimation("animate-fade-in", "animate-fade-out", "animate-fade-in", "animate-fade-out")}`}>
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
          <audio autoPlay className="hidden" src="/sounds/paper.mp3" preload="auto"></audio>
          <p className = "text-black text-[4vh]">2025 ANNUAL REPORT</p>
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
        Thouroughly freaked out, you step away from the mysterious box. When before you know it...
        </div>
      break;
    case 16:
      content = <div className = {textAnimation}>
        <audio autoPlay className="hidden" src="/sounds/crash.mp3" preload="auto"></audio>
        ...some kind of giant screen falls on you.
        </div>
      break;
    case 17:
      content = <StockBoard userId={props.userId}></StockBoard>
      animation = useAnimation("animate-box-up", "animate-box-down", "animate-box-up", "animate-box-down");
      break;
    case 18:
      content = <div className = {textAnimation}>
        Scared that another TV will fall on you, you run for the exit, only to trip over another box.
        </div>
      break;
    case 19:
      content = (
        <div className = {"bg-[url('/cardboard.jpg')] bg-cover bg-center bg-no-repeat h-[80vh] w-[80vh]"}>
          <audio autoPlay className="hidden" src="/sounds/ball-pit.mp3" preload="auto"></audio>
          <div className="fixed text-black font-[Acki-Preschool] font-extrabold p-5">
            <p className="text-[6vh]">Your favorite words</p>
            <p className="text-[2vh]">{"(Yes, you can throw them around)"}</p>
          </div>
          <WordBox words = {user.words as [string, number][]}></WordBox>
        </div>
      )
      animation = useAnimation("animate-box-up", "animate-box-down", "animate-box-up", "animate-box-down");
      break;
    case 20:
      content = <div className = {textAnimation}>
        <audio autoPlay className="hidden" src="/sounds/neck-bye-bye.mp3" preload="auto"></audio>
        Having tripped and sprained your ankles, an ambulance takes you to the hospital, where they give you an itemized receipt that your clumsiness accrued.
        </div>
      break;
    case 21:
      content = (
        <Receipt messages={user.messages}></Receipt>
      )
      animation = useAnimation("animate-box-up", "animate-box-down", "animate-box-up", "animate-box-down");
      break;
    case 22:
      content = <div className = {textAnimation}>
        Crutches in hand, you see one last strange occurrence fly through the wind and land in front of you. 
        </div>
      break;
    case 23:
      content = <Reaction reactions={user.reactions}></Reaction>
      animation = useAnimation("animate-pick-up", "animate-put-down", "animate-pick-up", "animate-put-down");
      break;
    case 24:
      content = <div className = {textAnimation}>
        <audio autoPlay className="hidden" src="/sounds/crumple.mp3" preload="auto"></audio>
        Crumbling the paper in your hand, you think to yourself: <i>Maybe it wasn't worth knowing. Maybe it wasn't worth getting hurt over.</i>
        </div>
      break;
    case 25:
      content = <div className = {textAnimation}>
        <i>Maybe, just maybe, everything will be just fine.</i>
        </div>
      break;
    case 26:
      content = <div className = {textAnimation}>
        Now home, you start to relax. It has been an exhausting day. You boot up your computer, open Discord, and look forward to the times you will have with your friends.
        </div>
      break;
    case 27:
      content = <div className = {textAnimation}>
        <p>Thank you for viewing the All Inquiries Wrapped 2025!</p>
        <p>While you're here, take a look at the other All Inquirite projects made or updated in 2025!</p>
        <div className="mt-5">
          <div className="flex gap-5 justify-center m-5">
            <a href="https://funnycarrotnetwork.fandom.com/wiki/All_Inqueries_Wiki" target="_blank" className="hover-underline-animation-white"> 
              <img src="funnycarrotwiki.png" alt="https://funnycarrotnetwork.fandom.com/wiki/All_Inqueries_Wiki" title="All Inqueries Fandom Wiki" className="h-[7vh]"/> 
            </a>
            <a href="https://allinquiries.boards.net/" target="_blank" className="hover-underline-animation-white"> 
              <img src="allinqbutton2.gif" alt="https://allinquiries.boards.net/" title="Proud user of All Inquiries forum 2.0!!" className="h-[7vh]"/> 
            </a>
          </div>
          <div className="flex gap-5 justify-center m-5">
            <a href="https://digifox.space/" target="_blank" className="hover-underline-animation-white"> 
              <img src="digi88by31.png" alt="digifox.space" title="digifox.space" className="h-[7vh]"/> 
            </a>
            <a href="https://starlightreactor.neocities.org/" target="_blank" className="hover-underline-animation-white"> 
              <img src="starlightbutton.png" alt="starlightreactor.neocities.org" title="starlightreactor.neocities.org" className="h-[7vh]"/> 
            </a>
            <a href="https://linkstew.neocities.org/" target="_blank" className="hover-underline-animation-white"> 
              <img src="linkstewbutton.gif" alt="https://linkstew.neocities.org/" title="linkstew.neocities.org" className="h-[7vh]"/> 
            </a>
          </div>
          <a href="https://stantoncomet.github.io/" target="_blank" className="hover-underline-animation-white"> 
            <img src="a_cat_house_logo.png" alt="https://stantoncomet.github.io/" title="https://stantoncomet.github.io/" className="h-[7vh]"/> 
          </a>
        </div>
        <a className="hover-underline-animation-white" target="_blank" href="https://thatcrazymaninasuit.github.io/wrapped/i_could_have_sworn_there_was_something_here.html">
          <p>Are you ready for 2026?</p>
        </a>
      </div>
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

