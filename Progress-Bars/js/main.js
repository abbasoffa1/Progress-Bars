$(document).ready(function () {
    var interval, timeInterval,startSpam,startSapmValue,prBarValue,prBar;
    
    function Start() {
        var AllProgressBars = $(".item")
        for (var prbar of AllProgressBars) {
            finishSpam = Number($(prbar).find(".finishSpam").text());
            startSpam = $(prbar).find(".startSpam");
            startSapmValue = Number($(prbar).find(".startSpam").text())
            prBarValue = Number($(prbar).find(".progress-bar").attr("aria-valuenow"));
            prBar = $(prbar).find(".progress-bar");
            var hesabla = (100 * 10) / finishSpam;
            prBarValue += hesabla;
            prBar.attr("aria-valuenow", prBarValue)
            if (startSapmValue < finishSpam) {
                startSapmValue += 10;
                prBar.css("width", prBarValue + "%")
                startSpam.text(startSapmValue)
                if (startSapmValue > finishSpam) {
                    startSpam.text(finishSpam);
                    var icon = document.createElement("i");
                    icon.className = "fas fa-check iconColor";
                    $(prbar).append(icon)
                }
            }
        }
    }
    $(".start").click(function () {
        interval = setInterval(Start, 1000);
        var timer = document.querySelector(".timer");
        var data = {
            minute: Number(timer.innerText.split(":")[0]),
            second: Number(timer.innerText.split(":")[1])
        }
        timeInterval = setInterval(function () {
            data.second++;

            if (data.second > 59) {
                data.minute++;
                data.second = 00;
            }
            timer.innerText = formatTime(data.minute, data.second);
        }, 1000);
        function formatTime(min, sec) {
            var r = "";
            if (min < 10) {
                r += "0" + min;
            } else {
                r += min;
            }
            r += ":";
            if (sec < 10) {
                r += "0" + sec;
            } else {
                r += sec;
            }
            return r;
        }
    })
    $(".resume").click(function () {
        clearInterval(interval)
        clearInterval(timeInterval)
    })
    $(".stop").click(function(){
        clearInterval(interval);
        clearInterval(timeInterval)
        var timer = $(".timer").text("00:00");
        var sPam=$(".startSpam").text("0");
        var progressBar=$(".progress-bar").attr("aria-valuenow","0");
        progressBar.css("width",0+"%");
        var icon=$(".iconColor").remove();
    })
});


