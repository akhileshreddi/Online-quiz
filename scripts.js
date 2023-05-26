export const lab = document.getElementById('myLab');


export function update()
{
    var date = new Date();
    lab.innerHTML = formatTime(date);
    date.get

    function formatTime(date)
    {
       let year = date.getFullYear();
       let month = date.getMonth() + 1;
       let day = date.getDay();

       let Hours = date.getHours();
       let Min = date.getMinutes();
       let seconds = date.getSeconds();
       let milli = date.getMilliseconds();

       Hours = (Hours%12) || 12;

       let amPm = Hours>=12 ? "am":"pm";

       Hours= formatzeros(Hours);
       Min= formatzeros(Min);
       seconds= formatzeros(seconds);

       return `${Hours}:${Min}:${seconds} ${amPm}`;

    }
    function formatzeros(time)
    {
        time = time.toString();
        return time.length<2 ? "0"+time : time;
    }
}




