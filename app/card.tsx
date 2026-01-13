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
  switch (displayID) {
    case 0:
      content = <div className = {useAnimation("animate-fade-in", "animate-fade-out", "animate-fade-in", "animate-fade-out")}>Hello {user.usernameDebug}!</div>
      //sam.speak(`Hello ${user.usernameDebug}`);
      break;
    case 1:
      content = <div className = {useAnimation("animate-fade-in", "animate-fade-out", "animate-fade-in", "animate-fade-out")}>Are you ready for 2026?</div>
      //sam.speak("Are you ready for twenty twenty six?");
      break;
    case 2:
      content = (
        <div className = "flex flex-col bg-[url(/fortune.png)] bg-cover h-9/10 w-[45vh] text-center justify-end pb-[25vh] rotate-[-7deg]">
          <p className = {`text-black font-[Libre-Bodoni] font-thin text-[24pt] ${useAnimation("animate-fade-in", "animate-fade-out", "animate-fade-in", "animate-fade-out")}`}>In 2025, you will have posted {user.totalMessages} messages...</p>
        </div>
      );
      animation = useAnimation("animate-pick-up", "", "", "animate-put-down");
      break;
    case 3:
      content = (
        <div className = "flex flex-col bg-[url(/fortune.png)] bg-cover h-9/10 w-[45vh] text-center justify-end pb-[12vh] rotate-[-7deg]">
          <p className = {`text-black font-[Libre-Bodoni] font-thin text-[24pt] ${useAnimation("animate-fade-in", "animate-fade-out", "animate-fade-in", "animate-fade-out")}`}>
            Throughout those messages, you had an average of {user.averageWordsPerMessage} words per message
          </p>
        </div>
      );
      animation = useAnimation("", "animate-put-down", "animate-pick-up", "");
      break;
    case 4:
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
    case 5:
      content = <StockBoard userId={props.userId}></StockBoard>
      animation = useAnimation("animate-box-up", "animate-box-down", "animate-box-up", "animate-box-down");
      break;
    case 6:
      content = (
        <div className = {"bg-[url('/cardboard.jpg')] bg-cover bg-center bg-no-repeat h-[80vh] w-[80vh] text-center"}>
          <WordBox words = {user.words as [string, number][]}></WordBox>
        </div>
      )
      animation = useAnimation("animate-box-up", "animate-box-down", "animate-box-up", "animate-box-down");
      break;
    case 7:
      content = (
        <Receipt messages={user.messages}></Receipt>
      )
      animation = useAnimation("animate-box-up", "animate-box-down", "animate-box-up", "animate-box-down");
      break;
    case 8:
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

