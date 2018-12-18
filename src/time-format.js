export { timeFormat, timeRemaining };

function timeFormat(date, format = 'yyyy-MM-dd hh:mm:ss') {
    date = new Date(date);
    const YEAR = date.getFullYear();
    const MONTH = date.getMonth() + 1;
    const DATE = date.getDate();
    const HOURS = date.getHours();
    const MINUTES = date.getMinutes();
    const SECONDS = date.getSeconds();
    const DAY = WEEK_DAY[date.getDay()];
    const MILLISECONDS = date.getMilliseconds();
    const WEEK_DAY = ['日', '一', '二', '三', '四', '五', '六'];

    return format
        .replace(/yyyy/i, YEAR)
        .replace(/MM/, pad(MONTH, 2))
        .replace(/dd/i, pad(DATE, 2))
        .replace(/HH/i, pad(HOURS, 2))
        .replace(/mm/, pad(MINUTES, 2))
        .replace(/ss/i, pad(SECONDS, 2))

        .replace(/M/, MONTH)
        .replace(/d/i, DATE)
        .replace(/H/i, HOURS)
        .replace(/m/, MINUTES)
        .replace(/s/i, SECONDS)

        .replace(/fff/i, pad(MILLISECONDS, 3))
        .replace(/w/i, DAY);
};

const pad = (number, length) =>
    number.toString().padStart(length, '0');

function timeRemaining(deadline) {
    const start = Date.now();
    const end = new Date(deadline).getTime();
    let milliseconds = Math.max(end - start, 0);
    const timeout = !milliseconds;
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const hours = pad(Math.floor(milliseconds / HOUR), 2);
    milliseconds %= HOUR;
    const minutes = pad(Math.floor(milliseconds / MINUTE), 2);
    milliseconds %= MINUTE;
    const seconds = pad(Math.floor(milliseconds / SECOND), 2);
    milliseconds %= SECOND;
    milliseconds = pad(Math.floor(milliseconds), 3);
    return { hours, minutes, seconds, milliseconds, timeout };
};
