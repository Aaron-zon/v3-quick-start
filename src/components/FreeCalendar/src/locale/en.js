import En from 'dayjs/locale/en';
const fc = {
    "datepicker": {
        "activeMonth": "month",
        "activeWeek": "week",
        "activeDay": "day",
        "activeList": "list",
        "prevMonth": "<",
        "nextMonth": ">",
        "toDay": "toDay",
        "month": {
            "1": "January",
            "2": "February",
            "3": "March",
            "4": "April",
            "5": "May",
            "6": "June",
            "7": "July",
            "8": "August",
            "9": "September",
            "10": "October",
            "11": "November",
            "12": "December",
        },
        "year": " ",
        "weeks": {
            "sun": 'sun',
            "mon": 'mon',
            "tue": 'tue',
            "wed": 'wed',
            "thu": 'thu',
            "fri": 'fri',
            "sat": 'sat',
        }
    }
};

En.weekdaysMin = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
En.fc = fc;

export default En;