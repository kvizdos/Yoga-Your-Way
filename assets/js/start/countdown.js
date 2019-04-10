var CountdownClock = function() {
    this.render = async (timeInSeconds, poseName, image, nextPoseName, audioSource, imageCount) => {
        return new Promise((resolve, reject) => {

            $('#activePoseImg').attr('src', image)
            $('.poseName').text(poseName);
            $('.secondsLeft').text((timeInSeconds) + " Seconds");
            $('#nextPoseNote').text(nextPoseName);
    
            if(audioSource !== "NO AUDIO") {
                console.log("STARTING AUDIO")
                $('#audioSource').attr("src", audioSource);
                document.getElementById('audioSource').play()
            }

            let currentlyAt = (timeInSeconds);
            let currentlyShowing = image;

            let count = 0;
            let currentRot = 0;
            let secondsPast = 0;
            let countdown = setInterval(function() {
                count++
                if(currentRot % 360 === 0) currentRot = 0; 
                if(count % 20 === 0) {
                    secondsPast++;

                    if(secondsPast % 4 == 0) {
                        let activeImg = parseInt(currentlyShowing.substr(currentlyShowing.length - 5, 1));
                        let nextImage;
                        if(activeImg < imageCount) {
                            nextImage = currentlyShowing.replace(activeImg.toString(), activeImg + 1);
                            console.log("NEXT IAMGE!")
                        } else {
                            nextImage = currentlyShowing.replace(activeImg.toString(), "1");
                            console.log("GO BACK");
                        }

                        currentlyShowing = nextImage;
                        $('#activePoseImg').attr('src', nextImage)
                    }

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