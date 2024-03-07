import { useState } from "react"
import timelineItems from '../timelineItems';

Date.prototype.addDays = function(days) {
    let dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

const getDays = (init,end)=>{
    const days = [];
    let currentDay = init;
    while (currentDay <= end) {
      days.push(currentDay)
      currentDay = currentDay.addDays(1);
    }
    return days;
  }

const rowHeightInit = 24
const columnWidthInit = 55
const initTimeLineInit = new Date('2021-01-01')
const initTimeLineEnd = new Date('2021-02-28')
const initTimeLineDays = getDays (initTimeLineInit,initTimeLineEnd)
const timeLineItemsInit = timelineItems.map((item,index)=>{
    const initDate = new Date(item.start)
    const initDayIndex = initTimeLineDays.findIndex((element)=>element.getTime()===initDate.getTime())
    const endDate = new Date(item.end)
    const endDayIndex = initTimeLineDays.findIndex((element)=>element.getTime()===endDate.getTime())
    return {
        id:item.id,
        name:item.name,
        initDate,
        initDayIndex,
        endDate,
        endDayIndex,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    }
})

export const useTimeline=()=>{ 
    const [rowHeight,setRowHeight] = useState(rowHeightInit)
    const [columnWidth, setColumnWidth] = useState(columnWidthInit)
    const [timelineInit,setTimelineInit] = useState(initTimeLineInit)
    const [timelineEnd,setTimelineEnd] = useState(initTimeLineEnd)
    const [timelineDays,setTimelineDays] = useState(initTimeLineDays)
    const [timelineTasks, setTimelineTasks] = useState(timeLineItemsInit)
    const [zoomIndex,setZoomIndex] = useState(2.0)
    
    const zoomstep=0.25
        
    const updateScope=(initDate,endDate)=>{
        setTimelineInit(initDate);
        setTimelineEnd(endDate);
        setTimelineDays(getDays(initDate,endDate))
    }

    const updateTask=(index,newTask)=>{
        return timelineItems.map((task,indexmap)=>{
            if(indexmap!=index) return task
            return newTask
        })
    }

    const deleteTask=(index)=>{
        const newTasks = timelineItems.filter((task,indexmap)=>{
            if(indexmap!=index) return task
        })
        return newTasks
    }

    const resizeTask=(taskIndex, resizetype)=>{
        let  newTimelineTasks = []
        switch(resizetype){
            case 'INITIAL_SUBSTRACT_1':
            newTimelineTasks = timelineTasks.map((task,index)=>{
                if(index!=taskIndex) return task;
                if(timelineTasks[taskIndex].initDayIndex===0) return task;
                const newStart = task.initDate.addDays(-1)
                const initDayIndex = timelineDays.findIndex((element)=>element.getTime()===newStart.getTime())
                const updatedTask = {
                    ...task,
                    initDate: newStart,
                    initDayIndex,
                }
                return updatedTask
            }) 
            break;
            case 'INITIAL_ADD_1':
            newTimelineTasks = timelineTasks.map((task,index)=>{
                if(index!=taskIndex) return task;
                const newStart = task.initDate.addDays(1)
                const initDayIndex = timelineDays.findIndex((element)=>element.getTime()===newStart.getTime())
                const updatedTask = {
                    ...task,
                    initDate:newStart,
                    initDayIndex
                }
                return updatedTask
            }) 
            break;
            case 'END_SUBSTRACT_1':
            newTimelineTasks = timelineTasks.map((task,index)=>{
                if(index!=taskIndex) return task;
                const newEnd = task.endDate.addDays(-1)
                const endDayIndex = timelineDays.findIndex((element)=>element.getTime()===newEnd.getTime())
                const updatedTask = {
                    ...task,
                    endDate:newEnd,
                    endDayIndex
                }
                return updatedTask
            }) 
            break;
            case 'END_ADD_1':
            newTimelineTasks = timelineTasks.map((task,index, fullArray)=>{
                if(index!=taskIndex) return task;
                if(index===fullArray.length) return task;
                const newEnd = task.endDate.addDays(1)
                const endDayIndex = timelineDays.findIndex((element)=>element.getTime()===newEnd.getTime())
                const updatedTask = {
                    ...task,
                    endDate:newEnd,
                    endDayIndex
                }
                return updatedTask
            }) 
            break;
        }
        return newTimelineTasks
    }

    const zoomIn=async ()=>{
        console.log(zoomIndex)
        const newZoomIndex = zoomIndex+zoomstep
        console.log(newZoomIndex)
        await setZoomIndex(newZoomIndex)
        console.log("ZOOMIN")
    }

    const zoomOut=async ()=>{
        if(zoomIndex>1){
            console.log(zoomIndex)
            const newZoomIndex = zoomIndex-zoomstep
            console.log(newZoomIndex)
            await setZoomIndex(newZoomIndex)
            console.log("ZOOMOUT")
        }
    }

    const zoomReset=async ()=>{
        console.log(zoomIndex)
        await setZoomIndex(2)
        console.log("ZOOMRESET")
    }

    return {
        timelineTasks,
        setTimelineTasks,
        rowHeight,
        columnWidth,
        updateScope,
        updateTask,
        deleteTask,
        resizeTask,
        timelineInit,
        timelineEnd,
        timelineDays,
        zoomIndex,
        zoomIn,
        zoomOut,
        zoomReset
    }

}