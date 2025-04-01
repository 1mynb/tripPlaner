import React, { useEffect, useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";

// Define FMCSA-style log positions
const STATUS_MAP = {
"Off Duty": 40,       // Off Duty position
"Rest": 40,           // Same as Off Duty
"Break": 40,          // Same as Off Duty
"Sleeper Berth": 90,  // Separate position for Sleeper Berth
"Driving": 140,       // Driving position
"Fueling": 190,          // Same as On Duty
"On Duty": 140        // On Duty position
};

// Visible status to be seen on log sheet
const VISIBLE_STATUS = {
    "Off Duty": 40,      
    "Sleeper Berth": 90,  
    "Driving": 140,       
    "On Duty": 190        
};

//constants for graphs
const HOURS_PER_DAY = 24;
const GRAPH_WIDTH = 570;
//const GRAPH_HEIGHT = 220;
const HOUR_WIDTH = GRAPH_WIDTH / HOURS_PER_DAY;
const LEFT_PADDING = 80; // Space for labels
const LABEL_WIDTH = 80


/*
method: getEndOfDay
description: method to get the end of the given date
args:
    startDateString: the start date in string format
returns:
    the end of the given date
*/
const getEndOfDay = (startDateString) => {
    const startDate = new Date(startDateString);
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const day = startDate.getDate();
  
    const endDate = new Date(year, month, day, 23, 59, 59); // 23:59:59
  
    return endDate;
}


/*
method: getStartOfDay
description: method to get the start of the given date
args:
    endDateString: the end date in string format
returns:
    the start of the given date
*/
const getStartOfDay = (endDateString) => {
    const endDate = new Date(endDateString);
    const year = endDate.getFullYear();
    const month = endDate.getMonth();
    const day = endDate.getDate();
  
    const startDate = new Date(year, month, day, 0, 0, 0); // 00:00:00
  
    return startDate;
}

/*
method: getRemainingHrs
description: method to get the remaing hours if it reaches the end of the date
args:
    prevStatus: the status of the previous log sheet date
    dailyLogs: the next day log sheet
returns:
    an object contaiing status of the previous log sheet date, the status of the current log sheet, startDate & endDate of the current log sheet
*/
const getRemainingHrs = (prevStatus, dailyLogs) =>{
    const first_log = dailyLogs[0]
    const startDate = getStartOfDay(first_log.date)
    const endDate = new Date(first_log.date)
    const currStatus = first_log.status

    const remainingHrs = {prevStatus, currStatus, startDate, endDate}
    return remainingHrs
    
}

/*
method: splitLogsByDay
description: method to split the log sheet by day for multiple log sheet. take the day as key of dict and store the remaing data as value
args:
    logSheet: the given log sheet
returns:
    log sheet of each day
*/
const splitLogsByDay = (logSheet) => {
    const logsByDay = {};

    logSheet.forEach(entry => {
        const dateKey = entry.date.split(" ")[0]; // Extract only YYYY-MM-DD
        if (!logsByDay[dateKey]) logsByDay[dateKey] = [];
        logsByDay[dateKey].push(entry);
    });

    return logsByDay;
};

/*
method: processMultiDayLogSheet
description: method to process multiple day log sheet
args:
    logSheet: the given log sheet
returns:
    dictionary of lines(startX, startY, endX, endY) of each date
*/
const processMultiDayLogSheet = (logSheet) =>{
    const logsByDay = splitLogsByDay(logSheet);
    const dailyLines = {};

    let remainingHrs = null

    //take keys
    const keys = Object.keys(logsByDay)
    //store last index of the logs
    const lastIndex = keys.length - 1

    keys.forEach((dateKey, idx) => {
        dailyLines[dateKey] = [];
        const dailyLogs = logsByDay[dateKey];
        const startDate = new Date(dailyLogs[0].date);
        const startHour = startDate.getHours() + startDate.getMinutes() / 60;
        let startX = LEFT_PADDING + (startHour * HOUR_WIDTH);

        //check if we have remaining hours if we reach the end of the date so that we can draw on the next day log sheet
        if (remainingHrs){
            const startDate = remainingHrs.startDate
            const endDate = remainingHrs.endDate
            const prevStatus = remainingHrs.prevStatus
            const currStatus = remainingHrs.currStatus

            const startHour = startDate.getHours() + startDate.getMinutes() / 60;
            const endHour = endDate.getHours() + endDate.getMinutes() / 60;
            const startX = LEFT_PADDING + (startHour * HOUR_WIDTH);

            const startY = STATUS_MAP[prevStatus] || 0;
            const endY = STATUS_MAP[prevStatus] || 0;
            const endX = startX + (endHour - startHour) * HOUR_WIDTH;

            const endYY = STATUS_MAP[currStatus] || 0;
            dailyLines[dateKey].push([startX, startY, endX, endY]);
            dailyLines[dateKey].push([endX, endY, endX, endYY]);

        }

        //check if the daily log has only one entry, in this case we dont have the an option to take the date of the nexe entry
        if (dailyLogs.length === 1){
            const startDate = new Date(dailyLogs[0].date);
           
            const endDate = getEndOfDay(dailyLogs[0].date);

            const startHour = startDate.getHours() + startDate.getMinutes() / 60;
            const endHour = endDate.getHours() + endDate.getMinutes() / 60;

            const startY = STATUS_MAP[dailyLogs[0].status] || 0;
            const endY = STATUS_MAP[dailyLogs[0].status] || 0;

            const endX = startX + (endHour - startHour) * HOUR_WIDTH;

            dailyLines[dateKey].push([startX, startY, endX, endY]);
         
            startX = endX;

            //check if it is not the last day log sheet. for last day log sheet we don't have to an option to draw the remaining hrs
            if(idx !== lastIndex){
                const lastKey = keys[idx + 1];
                remainingHrs = getRemainingHrs(dailyLogs[0].status,logsByDay[lastKey])
            }
  
        } else{ // if we have more than one entry, we can take the date of the next entry as end date.
            for (let i = 0; i < dailyLogs.length; i++) {
                const startDate = new Date(dailyLogs[i].date);
                let endDate;
                //check whether its the last entry for that day log sheet
                if (i + 1 === dailyLogs.length){
                    endDate = getEndOfDay(dailyLogs[i].date)
                    
                } else{
                    endDate = new Date(dailyLogs[i + 1].date);
                }
                
                const startHour = startDate.getHours() + startDate.getMinutes() / 60;
                const endHour = endDate.getHours() + endDate.getMinutes() / 60;
    
                const startY = STATUS_MAP[dailyLogs[i].status] || 0;
                const endY = STATUS_MAP[dailyLogs[i].status] || 0;
                
    
                const endX = startX + (endHour - startHour) * HOUR_WIDTH;
    
                //check whether its the last entry for that day log sheet
                if (i + 1 === dailyLogs.length){
                    dailyLines[dateKey].push([startX, startY, endX, endY]);
                } else{
                    const endYY = STATUS_MAP[dailyLogs[i + 1].status] || 0;
                    dailyLines[dateKey].push([startX, startY, endX, endY]);
                    dailyLines[dateKey].push([endX, endY, endX, endYY]);
                }
                
    
                startX = endX;

                //check we don't reach the last day log sheet and we are on the last entry of that day log sheet
                if(idx !== lastIndex && i + 1 === dailyLogs.length){
                    const lastKey = keys[idx + 1];
                    remainingHrs = getRemainingHrs(dailyLogs[i].status,logsByDay[lastKey])
                }
  
            }
           
        }
        
    });
    return dailyLines;
}

function LogSheet({ logSheet }) {
    console.log('log sheet:', logSheet)
    const dailyLogLines = processMultiDayLogSheet(logSheet);
    const logSheetDates = Object.keys(dailyLogLines); // Get all log sheet dates
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const currentDate = logSheetDates[currentIndex]; // Get the current date key
    const currentLogLines = dailyLogLines[currentDate];

    

    const getGraphSize = () => {
        const screenWidth = window.innerWidth;
        let width, height;

        if (screenWidth < 480) { // Extra small screens (phones)
            height = 130;
            width = screenWidth - 120; 
        
          } else if (screenWidth < 768) {
            height = 210;
            width = screenWidth * 0.55; // Small screens (tablets)
          } else if (screenWidth < 1024) {
            height = 220;
            width = screenWidth * 0.6; // Medium screens (laptops) → Adjust dynamically
          } else if (screenWidth < 1128) {
            height = 240;
            width = screenWidth * 0.6; // Large screens (desktops)
          } else{
            height = 300;
            width = screenWidth * 0.4; // Large screens (desktops)
          }

          return {width, height}
    };
      
    const [graphSize, setGraphSize] = useState(getGraphSize());

    useEffect(() => {
        const handleResize = () => {
          setGraphSize(getGraphSize()); // Update width on resize
        };
      
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, [graphSize]);

      console.log('screen width:', window.innerWidth)
      console.log('graph width:', graphSize)
    return (
        <div className="log-sheet-div">
            <p className="prompts-title">Your Log Sheet Detail</p>
            <div className="log-sheet">
                <p className="log-sheet-title">Log Sheet for {currentDate}</p>
                <Stage width={graphSize.width + LEFT_PADDING} height={graphSize.height}>
                    <Layer scaleX={graphSize.width / GRAPH_WIDTH} scaleY={graphSize.width / GRAPH_WIDTH}>
                        {/* Horizontal Lines (Red) for Statuses */}
                        {Object.values(STATUS_MAP).map((y, index) => (
                            <Line key={index} points={[LEFT_PADDING, y, GRAPH_WIDTH + LEFT_PADDING, y]} stroke="red" strokeWidth={1} />
                        ))}

                        {/* Vertical Hour Markers (Black) */}
                        {Array.from({ length: HOURS_PER_DAY + 1 }).map((_, i) => (
                            <Line key={i} points={[i * HOUR_WIDTH + LEFT_PADDING, 0, i * HOUR_WIDTH + LEFT_PADDING, GRAPH_WIDTH]} stroke="black" strokeWidth={1} />
                        ))}

                        {/* Status Labels on the Left */}
                        {Object.entries(VISIBLE_STATUS).map(([status, y]) => (
                            <Text key={status} x={5} y={y - 10} text={status} fontSize={14} fontStyle="bold" width={LABEL_WIDTH} align="left" font fill="black" />
                        ))}

                        {/* Log Line Graph (Blue) */}
                        {currentLogLines.map((line, index) => (
                            <Line key={index} points={line} stroke="blue" strokeWidth={3} />
                        ))}

                        {/* Time Labels (Top and Bottom) */}
                        {Array.from({ length: HOURS_PER_DAY }).map((_, i) => (
                            <>
                                <Text key={`top-${i}`} x={i * HOUR_WIDTH + LEFT_PADDING} y={0} text={`${i}`} fontSize={12} fill="black" fontStyle="bold" />
                            </>
                        ))}
                    </Layer>
                </Stage>
            </div>
            
            {/* Carousel Navigation */}
            <div className="carousel-buttons">
               
                <button onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))} disabled={currentIndex === 0} className="prevNext">
                    Previous
                </button>
                
                <button onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, logSheetDates.length - 1))} disabled={currentIndex === logSheetDates.length - 1} className="prevNext">
                        Next
                </button>
                
                
                
            </div>
        </div>
    );
}

export default LogSheet;