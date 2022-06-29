calendar();
// Overall Manipulation of the Calendar in its page
function calendar(){
    let prevBtn = document.getElementById("prev");
    let nextBtn = document.getElementById("next");

    let months = ["January", "February", "March", "April", "May", "June", "July",
     "August", "September", "October", "November", "December"];

    let selectedMonth = document.getElementById("month");
    let selectedYear = document.getElementById("year");
    let daysOfMonth = document.getElementsByClassName("days");
    let extraWeeks = document.getElementsByClassName("extraWeeks");

    let monthIndex = months.indexOf(selectedMonth.innerText);

    let timesArea = document.getElementById("buttonTimes");

    makeTimes();
    previous();
    next();
    // Creates Buttons showing each hour from 8am to 8pm
    function makeTimes(){
        for (let h = 8; h < 21; h++){
            let button = document.createElement("button");
            button.className = "btn btn-light";
            button.style.margin = "0em 1em";
            if (h >= 12){
                if (h == 12){
                    button.innerText = (h + "PM");
                }
                else {
                    button.innerText = (h - 12 + "PM");
                }
            }
            else {
                button.innerText = (h + "AM");
            }
            timesArea.append(button);
        }
    }
    // Shifts to the calendar for the previous month
    function previous(){
        prevBtn.addEventListener("click", function(){
            if (monthIndex == 0){
                monthIndex = months.length - 1;
                selectedYear.innerText = parseInt(selectedYear.innerText) - 1;
                selectedMonth.innerText = months[monthIndex];
            }
            else {
                selectedMonth.innerText = months[--monthIndex];
            }
            addToCalendar();
        });
    }
    // Shifts to the calendar for the next month
    function next(){
        nextBtn.addEventListener("click", function(){
            if (monthIndex == months.length - 1){
                monthIndex = 0;
                selectedYear.innerText = parseInt(selectedYear.innerText) + 1;
                selectedMonth.innerText = months[monthIndex];
            }
            else {
                selectedMonth.innerText = months[++monthIndex];
            }
            addToCalendar();
        });
    }
    // Automatically adds in the days of the month to the calendar
    function addToCalendar(){
        let endPrevDate = new Date(
            new Date(parseInt(selectedYear.innerText), monthIndex, 1) - 1
            );
        let endCurrDate = new Date(
            new Date(parseInt(selectedYear.innerText), monthIndex + 1, 1) - 1
            );
        let endPrevWeekDay = endPrevDate.getDay();
        let endDay = endCurrDate.getDate();
    
        for (let d = 0; d < daysOfMonth.length; d++){
            if (d > endDay + endPrevWeekDay || d <= endPrevWeekDay){
                daysOfMonth[d].innerText = "";
            }
            else {
                daysOfMonth[d].innerText = (d - endPrevWeekDay);
            }
        }
        /* If either first or last row is empty, hide it completely. Otherwise,
           show it in line with the other rows of the calendar. */
        console.log("Last Week is Empty: " + weekEmpty(extraWeeks[0]));
        for (let w = 0; w < extraWeeks.length; w++){
            if (weekEmpty(extraWeeks[w])){
                extraWeeks[w].style.display = "none";
            }
            else {
                extraWeeks[w].style.display = "";
            }
        }
        // Test Commands for the first part of the function
        console.log("previous month taking final day: " + months[endPrevDate.getMonth()]);
        console.log("final day of current month: " + endDay);
        console.log("final weekday of previous month: " + endPrevWeekDay);    
    }
    // Determines whether a row in the Calendar is empty
    function weekEmpty(extraWeek){
        let extraDays = extraWeek.children;
        for (let c = 0; c < extraDays.length; c++){
            if (extraDays[c].innerText != ""){
                return false;
            }
        }
        return true;
    }
}