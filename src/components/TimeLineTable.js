import { TimeLineRow } from "./TimeLineRow";

export const TimeLineTable=({zoomIndex, timelineTasks, deleteTask})=>{
    return (
        <g className="bar">
          {timelineTasks.map((item,index)=>{
              return(
                  <TimeLineRow key={index} element={item} index={index} deleteTask={deleteTask} zoomIndex={zoomIndex}></TimeLineRow>
              )
          })}
        </g>
    )
}