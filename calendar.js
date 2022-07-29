// Overall Manipulation of the Calendar in its page
$(function() {
    let months = ["January", "February", "March", "April", "May", "June", "July",
     "August", "September", "October", "November", "December"];
    let monthIndex = months.indexOf($("#month").text());
    
    let todayDate = new Date();

    let selectedDate = todayDate;
    let selectedTime;

    let ticketPrices = [15.00, 10.00, 20.00];

    /* When the calendar page appears, the cart sections won't appear until the
       buy or purchase button is pressed.*/
    $("#cart1").hide();
    $("#cart2").hide()
    makeTimes();
    today();
    previous();
    next();
    goTo();
    buy();
    /* Takes the user to the cart page after using the input of the day button
       and ticket amount to process the total cost */
    function buy() {
        $(".details").eq(5).css("font-weight", "bolder");
        $("#cartBtn").on("click", function() {
            let ticketZero = $("#ticket1").val() == "0" 
            && $("#ticket2").val() == "0" && $("#ticket3").val() == "0";
            let ticketEmpty = $("#ticket1").val() == "" 
            && $("#ticket2").val() == "" && $("#ticket3").val() == "";
            if (selectedTime != undefined 
            && (!ticketEmpty && !ticketZero)) {
                $("#calendar").hide(1000);
                $("#cart1").show(1000);
                $("#bottomDivider").removeClass("nav-tabs");
                let sum = 0.00;
                $("#dateCart p").eq(0).text(selectedDate.getDate() + " " + months[monthIndex]);
                $("#dateCart p").eq(1).text(selectedTime);
                for (let t = 0; t < $("#ticketCart").children().length; t++) {
                    let ticketAmount = $("#ticket" + (t + 1)).val();
                    console.log("ticket" + t + ": " + ticketAmount);
                    if (ticketAmount == "") {
                        ticketAmount = 0;
                    }
                    $(".tktCount").eq(t).text(ticketAmount);
                    $(".tktReceipt").eq(t).text(ticketAmount);
                    if ($(".tktReceipt").eq(t).text() == "0") {
                        $(".tktToggle").eq(t).hide();
                    }
                    else {
                        $(".tktToggle").eq(t).show();
                    }
                    $(".tktPrice").eq(t).text(ticketPrices[t] * parseInt(ticketAmount) + ".00"); 
                    sum += parseInt($(".tktPrice").eq(t).text());
                }
                $("#subtotal").text(sum + ".00");
                $("#tax").text(sum * 0.15);
                roundToCent($("#tax"));
                $(".total").text(sum + parseFloat($("#tax").text()));
            }
            else if (selectedTime == undefined) {
                alert("Please select a time");
            }
            else {
                alert("Please enter the number of tickets needed for purchase")
            }
        });
        /* The back buttons in the cart and purchase section takes the user 
           back to the calendar section */
        for (let i = 1; i <= 2; i++) {
            $("#calendarBack" + i).on("click", function() {
                $("#cart" + i).hide(1000);
                $("#calendar").show(1000);
                $("#bottomDivider").addClass("nav-tabs");
            });     
        }
        /* The purchase button takes the user to a confirmation page that, 
           after the user enters their payment details, confirms that the 
           payment is made. */
        $("#purchase").on("click", function() {
            if (validate()) {
                $("#cart1").hide(1000);
                $("#cart2").show(1000);
                $("#name").text($("#nameInput").val());
                $("#email").text($("#emailInput").val());
                for (let p = 0; p < $(".payType").length - 2; p++) {
                    if ($(".payType").eq(p).css("opacity") == "0.5") {
                        let paySrc = $(".payType").eq(p).attr("src");
                        $(".payType").eq($(".payType").length - 1).attr("src", paySrc);
                    }
                }
                if ($("#mastercard").css("opacity") == "0.5") {
                    $("#cc-end").text($("#input-cc").val().substring($("i#nput-cc").val().length - 6));
                }
                else {
                    $("#cc-end").text($("#input-cc").val().substring($("#input-cc").val().length - 5));
                }    
            }
        });
        // Rounds numbers inside elements to the nearest cent
        function roundToCent(element) {
            if (element.text().indexOf(".") == -1) {
                element.text(element.text() + ".00");
            }
            else if (element.text().length < 4) {
                element.text(element.text() + ("0" * (4 - $("#tax").text().length)));
            }
            else {
                element.text(Math.round(parseFloat(element.text()) * 100) / 100);
            }
        }
        // Credit/Debit Card Number Input
        new Cleave ('#input-cc', {
            creditCard: true,
            onCreditCardTypeChanged: function(type) {
                if (type == "unknown") {
                    $(".payType").css("opacity", "1");
                }
                $("#" + type).css("opacity", "0.5");
                if (type == "discover") {
                    $("#input-cc-cvc").attr("maxlength", "4");
                }
                else {
                    $("#input-cc-cvc").attr("maxlength", "3");
                }
            }
        });
        // Credit/Debit Card Date Input
        new Cleave ('#input-cc-date', {
            date: true,
            datePattern: ["m", "y"],
        }); 
        // Credit/Debit Card CVC Input
        new Cleave ('#input-cc-cvc', {
            numericOnly: true,
        });
        // Ensures that the input is correct as formatted
        function validate() {
            if ($("#nameInput").val() == "" || $("#emailInput").val() == "") {
                return false;
            }
            if ($("#input-cc").val() == "" || $("#input-cc-date").val() == "" 
            || $("#input-cc-cvc").val() == "") {
                return false;
            }
            if ($("#visa").css("opacity") == "1" 
            && $("#mastercard").css("opacity") == "1" 
            && $("#americanexpress").css("opacity") == "1" 
            && ("#discover").css("opacity") == "1") {
                alert("Invalid Card Type");
                return false
            }
            if (($("#americanexpress").css("opacity") == "0.5" 
            && $("#input-cc").val().length != 17) 
            || (($("#visa").css("opacity") == "0.5" 
            || $("#mastercard").css("opacity") == "0.5" 
            || $("#discover").css("opacity") == "0.5") 
            && $("#input-cc").val().length != 19)) {
                alert("Invalid Card Length");
                console.log("Current Card Length: " + $("#input-cc").val().length);
                return false;
            }
            return true;
        }
    }
    // Creates an input for the date the person will want the tickets for
    function selectDay() {
        selectedDate = new Date(parseInt($("#year").text()), monthIndex, parseInt($(this).text()));
        console.log(selectedDate);
    }
    // Changes the calendar based on the date entered on the input
    function goTo(){
        $("#dateInput").on("input", function(){
            console.log($("#dateInput").val());
            let dateEntry = new Date($("#dateInput").val());
            monthIndex = dateEntry.getMonth();
            $("#month").text(months[monthIndex]);
            $("#year").text(dateEntry.getFullYear());
            addToCalendar();    
        });
    }
    // Creates Buttons showing each hour from 8am to 8pm
    function makeTimes(){
        for (let h = 8; h < 21; h++){
            let button = $("<button></button>");
            button.addClass("btn btn-light");
            button.css({
                "margin": "1em",
                "width": "5em"
            });
            if (h >= 12){
                if (h == 12){
                    button.text(h + ":00 PM");
                }
                else {
                    button.text(h - 12 + ":00 PM");
                }
            }
            else {
                button.text(h + ":00 AM");
            }
            button.on("click", function(){
                selectedTime = button.text();
                console.log(selectedTime);
            });
            $("#buttonTimes").append(button);
        }
    }
    function today(){
        console.log(todayDate);
        monthIndex = todayDate.getMonth();
        $("#year").text(parseInt(todayDate.getFullYear()));
        $("#month").text(months[monthIndex]);
        addToCalendar();
    }
    // Shifts to the calendar for the previous month
    function previous(){
        $("#prev").on("click", function(){
            if (monthIndex == 0){
                monthIndex = months.length - 1;
                $("#year").text(parseInt($("#year").text()) - 1);
                $("#month").text(months[monthIndex]);
            }
            else {
                $("#month").text(months[--monthIndex]);
            }
            addToCalendar();
        });
    }
    // Shifts to the calendar for the next month
    function next(){
        $("#next").on("click", function(){
            if (monthIndex == months.length - 1){
                monthIndex = 0;
                $("#year").text(parseInt($("#year").text()) + 1);
                $("#month").text(months[monthIndex]);
            }
            else {
                $("#month").text(months[++monthIndex]);
            }
            addToCalendar();
        });
    }
    // Automatically adds in the days of the month to the calendar
    function addToCalendar(){
        let endPrevDate = new Date(
            new Date(parseInt($("#year").text()), monthIndex, 1) - 1
            );
        let endCurrDate = new Date(
            new Date(parseInt($("#year").text()), monthIndex + 1, 1) - 1
            );
        let endPrevWeekDay = endPrevDate.getDay();
        let endDay = endCurrDate.getDate();
        let endYear = endCurrDate.getFullYear();
    
        for (let d = 0; d < $(".days").length; d++){
            let selectBtn = $(".days").eq(d).children().eq(0);
            let isWeekend = $(".days").eq(d).hasClass("saturday") 
            || $(".days").eq(d).hasClass("sunday");
            let beforeToday = endYear < todayDate.getFullYear() 
            || (endYear == todayDate.getFullYear() && monthIndex < todayDate.getMonth()) 
            || (monthIndex == todayDate.getMonth() && (d - endPrevWeekDay) < todayDate.getDate());
            if (d > endDay + endPrevWeekDay || d <= endPrevWeekDay){
                if (!isWeekend) {
                    selectBtn.html("");
                    selectBtn.addClass("empty");
                    selectBtn.off("click");
                }
                $(".days").eq(d).text("");
            }
            else {
                if (isWeekend) {
                    $(".days").eq(d).text(d - endPrevWeekDay);     
                    $(".days").eq(d).css("color", "gray");
                }
                else {
                    if (beforeToday) {
                        console.log(d);
                        if (!(selectBtn.hasClass("empty"))){
                            selectBtn.addClass("empty");
                        }
                        selectBtn.off("click");
                        $(".days").eq(d).text(d - endPrevWeekDay);
                        $(".days").eq(d).css("color", "gray");
                    }
                    else {
                        $(".days").eq(d).text("").css("color", "black");
                        if ($(".days").eq(d).html().length == 0){
                            selectBtn = $("<button></button>");
                            selectBtn.addClass("btn btn-dark");
                        }
                        selectBtn.html((d - endPrevWeekDay) + "<br/>•");
                        if (selectBtn.hasClass("empty")) {
                            selectBtn.removeClass("empty");
                        }
                        selectBtn.on("click", selectDay);
                        $(".days").eq(d).append(selectBtn);    
                    }
                }
            }
        }
        /* If either first or last row is empty, hide it completely. Otherwise,
           show it in line with the other rows of the calendar. */
        for (let w = 0; w < $("tr").length; w++){
            if (weekEmpty($("tr").eq(w))){
                $("tr").eq(w).hide();
            }
            else {
                $("tr").eq(w).show();
            }
        }
        // Test Commands for the first part of the function
        console.log("previous month taking final day: " + months[endPrevDate.getMonth()]);
        console.log("final day of current month: " + endDay);
        console.log("final weekday of previous month: " + endPrevWeekDay);    
    }
    // Determines whether a row in the Calendar is empty
    function weekEmpty(extraWeek){
        let extraDays = extraWeek.children();
        for (let c = 0; c < extraDays.length; c++){
            if (extraDays.eq(c).text() != ""){
                if ((extraDays.eq(c).hasClass("saturday") 
                || extraDays.eq(c).hasClass("sunday"))){
                    //console.log(extraDays.eq(c).text());
                    return false;
                }
                else if (!(extraDays.eq(c).children().eq(0).hasClass("empty"))){
                    //console.log(extraDays.eq(c).html());
                    return false;
                }    
            }
        }
        return true;
    }
});