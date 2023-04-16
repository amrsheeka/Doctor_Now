function getTimeList(startTime, endTime) {
    const timeList = [];
    var startDate = new Date("01/01/2000").getHours() + startTime;
    var endDate = new Date("01/01/2000").getHours() + endTime;

    var startHour = Number(startDate.split(':')[0].substring(3));
    var endHour = Number(endDate.split(':')[0].substring(3));

    var startMin = Number(startDate.split(':')[1].substring(0, 3));
    var endMin = Number(endDate.split(':')[1].substring(0, 3));
    var mode = startDate.substring(startDate.length - 2)

    // console.log(startDate,endDate,startHour, endHour, startMin, endMin, mode)
    timeList.push(startDate.substring(3))
    while (startHour <= endHour) {
        if (startHour == endHour && endMin <= startMin)
            break;
        startMin += 15;
        if (startMin >= 60) {
            startMin %= 60
            startHour++;
        }
        if (startMin.toString().length == 1)
            startDate = startHour + ":" + startMin + "0 " + mode;
        else
            startDate = startHour + ":" + startMin + " " + mode;
        timeList.push(startDate)
    }
    return timeList;
}

export default getTimeList;