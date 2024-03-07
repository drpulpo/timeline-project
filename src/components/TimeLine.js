import "../index.css"
import { useState } from "react";
import { useTimeline } from "../hooks/useTimeLine";
import { TimeLineTable } from "./TimeLineTable";
import { ZoomButton } from "./ZoomButton";

export const TimeLine = () => {
    const {timelineInit,timelineEnd, updateScope, timelineDays, timelineTasks, rowHeight, columnWidth, zoomIndex, zoomIn, zoomOut, zoomReset, deleteTask, setTimelineTasks} = useTimeline()
    const [tasks, setTasks] = useState(timelineTasks)
    const rowNumber = tasks.length
    const colNumber = timelineDays.length
    const timeLineWidth = colNumber*columnWidth*zoomIndex
    
    const handleZoomIn=async ()=>{
        zoomIn()      
    }

    const handleZoomOut=async ()=>{
       zoomOut()
    }

    const handleZoomReset=async ()=>{
        zoomReset()
    }

    const handleDeleteTask= async (index)=>{
        const newTasks = deleteTask(index)
        await setTimelineTasks(newTasks)
        debugger
        setTasks(newTasks)
    }


    return (
      <section className="timeline-container">
        <section>
            <ZoomButton zoomtype="ZOOM_OUT" handleClick={handleZoomOut} />
            <ZoomButton zoomtype="ZOOM_RESET" handleClick={handleZoomReset}/>
            <ZoomButton zoomtype="ZOOM_IN" handleClick={handleZoomIn}/>
        </section>        
          <svg className="gantt" height={70+rowNumber*rowHeight} width={timeLineWidth}>
            <g className="grid">
              <rect
                x="0"
                y="0"
                width={timeLineWidth}
                height={rowNumber*rowHeight}
                className="grid-background"
              ></rect>
              <g>
                {tasks.map((tlItem,index)=>{
                    return(
                        <rect
                            key={index}
                            x="0"
                            y={49+rowHeight*index}
                            width={timeLineWidth}
                            height={rowHeight}
                            className="grid-row"
                        />
                    )
                })}
              </g>
              <rect
                x="0"
                y="0"
                width={timeLineWidth*zoomIndex}
                height="40"
                className="grid-header"
              ></rect>
              {timelineDays.map((el,index)=>{
                return(
                    <path key={index} d={"M "+columnWidth*zoomIndex*index+" 49 v 418"} className="tick"></path>
                )
              })}
             
            </g>
            <g className="date">
              {timelineDays.map((el,index)=>{
                return(
                <text key={index} x={60*zoomIndex+index*columnWidth*zoomIndex} y="25" className="lower-text">
                    {`${el.getUTCFullYear()}-${el.getUTCMonth()+1}-${el.getUTCDate()}`}
                </text>
              )
              })}
            </g>
            <g className="arrow"></g>
            <g className="progress"></g>
            <TimeLineTable deleteTask={handleDeleteTask} timelineTasks={tasks} zoomIndex={zoomIndex}/>
          </svg>
      </section>
    );
  };
  