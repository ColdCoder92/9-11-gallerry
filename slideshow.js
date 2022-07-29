$(function() {
    let photos = ["images/stock1.jpg", "images/stock2.jpg"];
    var index = 0;

    back();
    forward();

    function back() {
        $("#leftArrow").on("click", function() {
            if (index != 0){
                index--;    
                $("#main").css("animation-name", "back");
                $("#offset").css("animation-name", "backwardAppear");
            } 
            else {
                index = photos.length - 1;
                $("#offset").css("animation-name", "forwardAppear");
                $("#main").css("animation-name", "forward");
            }
            animationToggle();   
        });
        $("#leftArrow").on("click", function() {
            assign();
        });
    }

    function forward() {
        manual();
        auto();
        function manual() {
            $("#rightArrow").on("click", function() {
                if (index != photos.length - 1){
                    index++;  
                    $("#main").css("animation-name", "forward");
                    $("#offset").css("animation-name", "forwardAppear");
                }
                else {
                    index = 0;
                    $("#offset").css("animation-name", "backwardAppear");
                    $("#main").css("animation-name", "back");
                }    
                animationToggle();
            });
            $("#rightArrow").on("click", function() {
                assign();
            });
        }
        function auto() {
            setInterval(function() {
                if (index != photos.length - 1){
                    index++;  
                    assign();
                    $("#main").css("animation-name", "forward");
                    $("#offset").css("animation-name", "forwardAppear");
                }
                else {
                    index = 0;
                    assign();
                    $("#offset").css("animation-name", "backwardAppear");
                    $("#main").css("animation-name", "back");
                }    
                animationToggle();    
            }, 3000);
        }
    }

    function animationToggle() {
        if ($("#main").css("animation-play-state") == "paused" 
        && $("#offset").css("animation-play-state") == "paused"){
            $("#main").css("animation-play-state", "running");
            $("#offset").css("animation-play-state", "running");
        }
         else {
            $("#main").css("animation-play-state", "paused");
            $("#offset").css("animation-play-state", "paused");
        }
        setTimeout(function() {
            $("#main").css("animation-play-state", "paused");
            $("#offset").css("animation-play-state", "paused");
        }, 1000);
    }

    function assign() {
        $("#offset").attr("src", photos[index]);
        if (index == 0){
            $("#main").attr("src", photos[index + 1]);
        }
        else {
            $("#main").attr("src", photos[index - 1]);
        }
        console.log("Main Index: " + index);
    }
});