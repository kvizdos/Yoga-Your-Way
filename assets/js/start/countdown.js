var cd;
var CountdownClock = function() {
    this.isPaused = false,
    this.countdown,
    this.activeAudio,
    this.togglePlay = (forcePause = false) => {        
        if(!this.isPaused || forcePause) { 
            $('#progress').removeClass("fas fa-pause-circle");
            $('#progress').addClass("fas fa-play-circle");
            try { document.getElementById('audioSource').pause() } catch { console.error("Failed to pause audio!") }
        }
        if(this.isPaused) {
            $('#progress').removeClass("fas fa-play-circle");
            $('#progress').addClass("fas fa-pause-circle");
            try { document.getElementById('audioSource').play() } catch { console.error("Failed to unpause audio!") }
        }
        this.isPaused = !this.isPaused;
    },
    this.stopCountdown = () => {
        $('#progress').removeClass("fas fa-pause-circle");
        $('#progress').addClass("fas fa-play-circle");
        try { document.getElementById('audioSource').pause() } catch { console.error("Failed to pause audio!") }
        window.clearInterval(cd);
        this.isPaused = false;
    },
    this.render = async (timeInSeconds, poseName, image, nextPoseName, audioSource, imageCount) => {
        $('#progress').removeClass("fas fa-play-circle");
        $('#progress').addClass("fas fa-pause-circle");
        let isPaused = this.isPaused;
        return new Promise((resolve, reject) => {

            image = './' + image;
            audioSource = './' + audioSource;

            $('#activePoseImg').attr('src',  image)
            $('.poseName').text(poseName);
            $('.secondsLeft').text((timeInSeconds) + " Seconds");
            $('#nextPoseNote').text(nextPoseName);

            this.activeAudio = audioSource;
    
            if(audioSource !== "./NO AUDIO") {
                console.log("STARTING AUDIO: " + audioSource);
                $('#audioSource').attr("src", audioSource);
                document.getElementById('audioSource').play()
            } else {
                $('#audioSource').attr("src", "");
                document.getElementById('audioSource').play()
            }

            let currentlyAt = (timeInSeconds);
            let currentlyShowing = image;

            let count = 0;
            let currentRot = 0;
            let secondsPast = 0;

            var _this = this;

            cd = setInterval(function() {
                if(!_this.isPaused) {
                    count++
                    if(currentRot % 360 === 0) currentRot = 0; 
                    if(count % 20 === 0) {
                        secondsPast++;

                        if(secondsPast % 4 == 0) {
                            let activeImg = parseInt(currentlyShowing.substr(currentlyShowing.length - 5, 1));
                            let nextImage;
                            if(activeImg < imageCount) {
                                nextImage = currentlyShowing.replace(activeImg.toString(), activeImg + 1);
                            } else {
                                nextImage = currentlyShowing.replace(activeImg.toString(), "1");
                            }

                            currentlyShowing = nextImage;
                            $('#activePoseImg').attr('src', nextImage)
                        }

                        currentlyAt--;
                        if(currentlyAt == 0) {
                            resolve("done");
                            clearInterval(cd);
                        } else {
                            $('.secondsLeft').text((currentlyAt) + " Seconds");
                        }
                    }
                    currentRot += 18.2;
                    // $('#progress')[0].style.transform = `rotate(${currentRot}deg)`;
                }
            }, 50)
                    
        })
    }
}