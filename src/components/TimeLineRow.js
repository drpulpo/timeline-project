import { useState } from "react";
import { useTimeline } from "../hooks/useTimeLine";

export const TimeLineRow=({element,index, zoomIndex, deleteTask})=>{
    const {rowHeight,columnWidth, resizeTask, setTimelineTasks, timelineTasks, updateTask } = useTimeline()
    const [item,setItem] = useState(element)
    const [editMode, setEditMode]=useState(true)
    const taskStart=(columnWidth+item.initDayIndex*columnWidth)*zoomIndex
    const taskWidth=zoomIndex*columnWidth*(item.endDayIndex-item.initDayIndex)
    
    const handleResize=async (resizetype)=>{
        const newTasks = resizeTask(index, resizetype)
        await setTimelineTasks(newTasks)
        setItem(newTasks[index])
        
    }

    const handleInputChange=async (event)=>{
        const newItem = {
            ...item,
            name:event.target.value
        }
        const newTasks = updateTask(index, newItem)
        await setTimelineTasks(newTasks)
        setItem(newTasks[index])
    }

    return(
        <g className="bar-wrapper TOS" data-id="SEMA0000097474">
                <g className="bar-group">
                  <rect
                    x={taskStart}
                    y={53+index*rowHeight}
                    width={taskWidth}
                    height="15"
                    rx="3"
                    ry="3"
                    fill={item.color}
                  >
                    <animate
                      attributeName="width"
                      from="0"
                      to={taskWidth}
                      dur="0.4s"
                      begin="0.1s"
                      calcMode="spline"
                      values={`0;${taskWidth}`}
                      keyTimes="0; 1"
                      keySplines="0 0 .58 1"
                    ></animate>
                  </rect>
                  <rect
                    x="20"
                    y={58+index*rowHeight}
                    width="0"
                    height="15"
                    rx="3"
                    ry="3"
                    className="bar-progress"
                  >
                    <animate
                      attributeName="width"
                      from="0"
                      to="0"
                      dur="0.4s"
                      begin="0.1s"
                      calcMode="spline"
                      values="0;0"
                      keyTimes="0; 1"
                      keySplines="0 0 .58 1"
                    ></animate>
                  </rect>
                  
                { editMode?
                    <foreignObject x={(taskStart+taskWidth/2)-50} y={50+index*rowHeight} width={200} height={20}>
                        <input className="input-task-name" value={item.name} onChange={handleInputChange} />
                    </foreignObject>:
                    <text x={taskStart+taskWidth/2} y={61+index*rowHeight} className="bar-label">
                        {item.name}
                    </text>
                }
                  
                </g>
                <g className="handle-group">
                    <g>
                        <rect
                            x={taskStart-18}
                            y={2.1*rowHeight+index*rowHeight}
                            width="18"
                            height="20"
                            rx="1"
                            ry="1"
                            className="handle handle-container"
                        ></rect>
                        <text
                            onClick={()=>handleResize("INITIAL_SUBSTRACT_1")} 
                            className="handle move"
                            x={taskStart-18}
                            y={2.8*rowHeight+index*rowHeight}>
                                &lt;&lt;
                        </text>
                    </g>
                    <g>
                        <rect 
                            x={taskStart}
                            y={2.1*rowHeight+index*rowHeight}
                            width="18"
                            height="20"
                            rx="1"
                            ry="1"
                            className="handle handle-container"
                        ></rect>      
                        <text
                            onClick={()=>handleResize("INITIAL_ADD_1")}
                            className="handle move"  
                            x={taskStart}
                            y={2.8*rowHeight+index*rowHeight}>
                                &gt;&gt;
                        </text>
                    </g>
                    <g >
                        <rect
                            x={taskStart+taskWidth-18}
                            y={2.1*rowHeight+index*rowHeight}
                            width="18"
                            height="20"
                            rx="1"
                            ry="1"
                            className="handle handle-container"
                        ></rect>
                         <text
                            onClick={()=>handleResize("END_SUBSTRACT_1")} 
                            className="handle move" 
                            x={taskStart+taskWidth-18}
                            y={2.8*rowHeight+index*rowHeight}>
                                &lt;&lt;
                        </text>
                    </g>
                    <g>
                        <rect
                            x={taskStart+taskWidth}
                            y={2.1*rowHeight+index*rowHeight}
                            width="18"
                            height="20"
                            rx="1"
                            ry="1"
                            className="handle handle-container"
                        ></rect>
                         <text
                            onClick={()=>handleResize("END_ADD_1")}  
                            className="handle move"
                            x={taskStart+taskWidth}
                            y={2.8*rowHeight+index*rowHeight}>
                                &gt;&gt;
                        </text>
                    </g>
                </g>
              </g>
    )
}