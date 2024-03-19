export function getTimestamp() {
    return (new Date()).getTime();
}

export function diffTimestamp(startTimestamp, endTimestamp, isJustCalc = false) {
    var diff = startTimestamp - endTimestamp;

    var minutes = Math.floor((diff / 1000) / 60);
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    return {
        hour: hours,
        minutes,
        isJustCalc
    }
}


export const getMsFromHour = hours => 1000 * 60 * 60 * hours;

export const convertDiffToString = ({ hour, minutes }) => {
    const hourAsInt = Math.abs(hour)
    const minsAsInt = Math.abs(minutes)
    if (hour && minutes) {
        console.log(hour)
        return hour === -1
            ? `${minsAsInt}m ago`
            : hour < 0 || minutes < 0 ? `${hourAsInt - 1}h ${minsAsInt}m ago`
                : `in ${hourAsInt}h ${minsAsInt}m`
    }
    if (hour) {
        return hour < 0
            ? `${hourAsInt} hour ago`
            : `in ${hourAsInt} hour`
    }
    if (minutes) {
        return minutes < 0
            ? `${minsAsInt} minutes ago`
            : `in ${minsAsInt} minutes`
    }
    return 'Right now'
}