export function calculateDDay(deadLine){
    let today = new Date();
    let deadLineData = new Date(deadLine);
    let gap = deadLineData.getTime() - today.getTime();
    let dDay = Math.round(gap / (1000 * 60 * 60 * 24));
    
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

export function calculateProgress(creationDate, deadline){
    console.log(deadline)
    let today = new Date();
    let creationDateData = new Date(creationDate+"T00:00:00");
    let deadlineData = new Date(deadline+"T23:59:59");

    let wholePeriod = deadlineData.getTime() - creationDateData.getTime();
    let RemainingPeriod = deadlineData.getTime() - today.getTime();

    let progress =  Math.ceil(((wholePeriod - RemainingPeriod) / wholePeriod) * 100);
    return progress
}