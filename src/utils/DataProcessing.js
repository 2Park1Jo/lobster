export function calculateDDay(deadLine){
    let today = new Date();
    let deadLineData = new Date(deadLine);
    let gap = deadLineData.getTime() - today.getTime();
    let dDay = Math.ceil(gap / (1000 * 60 * 60 * 24));
    
    if (deadLine === null){
        return ""
    }

    if (dDay < 0){
        dDay = "+" + (dDay * -1);
    }
    else if (dDay > 0){
        dDay = "-" + dDay;
    }
    if (dDay === 0){
        return "D-day"
    }

    if (!isNaN(dDay)){
        return "D" + dDay;
    }
}