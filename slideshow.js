slideshow();

function slideshow(){
    let leftArrow = document.getElementById("leftArrow");
    let rightArrow = document.getElementById("rightArrow");
    let imgMain = document.getElementById("main");
    let imgOffset = document.getElementById("offset");
    let photos = ["images/stock1.jpg", "images/stock2.jpg"];
    var index = 0;

    back();
    forward();

    function back() {
        leftArrow.addEventListener("click", function() {
            if (index != 0){
                imgMain.style.animationName = "back";
                imgOffset.style.animationName = "backwardAppear";
                animationToggle();
                index--;    
                assign();
            }    
        });
    }

    function forward() {
        rightArrow.addEventListener("click", function() {
            if (index != photos.length - 1){
                imgMain.style.animationName = "forward";
                imgOffset.style.animationName = "forwardAppear";
                animationToggle();
                index++;  
                assign();  
            }    
        });
    }

    function animationToggle(){
        if (imgMain.style.animationPlayState == "paused" 
        && imgOffset.style.animationPlayState == "paused"){
            imgMain.style.animationPlayState = "running";
            imgOffset.style.animationPlayState = "running";
        }
         else {
            imgMain.style.animationPlayState = "paused";
            imgOffset.style.animationPlayState = "paused";
        }
        setTimeout(function() {
            imgMain.style.animationPlayState = "paused";
            imgOffset.style.animationPlayState = "paused";
        }, 1000);
    }

    function assign(){
        imgMain.setAttribute("src", photos[index]);
        if (index == 0){
            imgOffset.setAttribute("src", photos[index + 1]);
        }
        else {
            imgOffset.setAttribute("src", photos[index - 1]);
        }
    }
}