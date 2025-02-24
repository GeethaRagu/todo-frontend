export function extractTime(dateString){
    const date = new Date(dateString);
    const getdate = date.getDate();
    const getmonth = date.getMonth();
    const getyear = date.getFullYear();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${getdate}/${getmonth}/${getyear} ${hours}:${minutes}`;

    }

 function padZero(number)   {
    return number.toString().padStart(2, "0");
 }