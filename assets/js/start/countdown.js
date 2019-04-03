var CountdownClock = function() {
    this.render = async (timeInSeconds, poseName, image, nextPoseName) => {
        return new Promise((resolve, reject) => {
            $('#activePoseImg').attr('src', image)
            $('.poseName').text(poseName);
            $('.secondsLeft').text((timeInSeconds) + " Seconds");
            $('#nextPoseNote').text(nextPoseName);
            let currentlyAt = timeInSeconds;
            let count = 0;
            let currentRot = 0;
            let countdown = setInterval(function() {
                count++
                if(currentRot % 360 === 0) currentRot = 0; 
                if(count % 20 === 0) {
                    currentlyAt--;
                    if(currentlyAt == 0) {
                        resolve("done");
                        clearInterval(countdown);
                    } else {
                        $('.secondsLeft').text((currentlyAt) + " Seconds");
                    }
                }
                currentRot += 18.2;
                $('#progress')[0].style.transform = `rotate(${currentRot}deg)`;

            }, 50)
                    
        })
    }
}