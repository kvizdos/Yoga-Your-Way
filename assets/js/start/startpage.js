let Countdown = new CountdownClock()
const Transitioner = new Transition();

let currentRoutine;
var setCurrentRoutine = (routine) => {
    currentRoutine = routine;
}

var StartPage = function() {
    this.parent = "",
    this.handleTaps = () => {
        console.log("Handling tapperoos");
        $('#progress').on('touchend', (e) => {
            console.log("TAPPPPED");
            Countdown.togglePlay();
        })

        $('#leaveRoutine').on('touchend', (e) => {
            Countdown.stopCountdown();
            Transitioner.show("All done!", "50vw", "50vh", "page-browse", [], () => {});
        });
    },
    this.render = (parent) => {
        this.parent = parent;
        $(parent).append(`
            <div class="activePoseContainer">
                <div class="activePose">
                    <img id="activePoseImg" src="" width="100%" />
                </div>

                <div class="activePoseInfo">
                    <i id="progress" class="fas fa-pause-circle"></i>
                    <!--<div id="progress" class="shapeshifter play" style="background-image: url(./assets/images/playpause.svg)"></div>-->

                    <div id="audio">
                        <audio id="audioSource"></audio>
                    </div>
                </div>
                <div class="progressInternals">
                    <span class="secondsLeft">10 seconds</span><br>
                    <span class="poseName">Pose Name</span>
                    <br>
                    <span class="nextPose">Up Next: <span id="nextPoseNote">X</span></span>
                    <br>
                    <button id="leaveRoutine"><i class="fas fa-arrow-circle-left"></i> Stop</button>
                </div>
            </div>
        `);
        this.handleTaps();
    },
    this.runCountdown = async (poses) => {
        return new Promise((resolve, reject) => {
            let pose = poses[0].name;
            let duration = poses[0].duration;
            let nextPose = poses[1] !== undefined ? poses[1].name : "You're Done!";

            let audio = _SettingsHandler.getSetting('voice') == "male" ? poses[0].audio.replace('.mp3', '_m.mp3') : poses[0].audio.replace('.mp3', '_f.mp3');

            console.log(audio);

            Countdown.render(duration, pose, poses[0].image, nextPose, audio, poses[0].amountOfImages).then((r) => {
                poses = poses.slice(1);
                if(poses.length > 0) {
                    return new Promise((r, j) => {
                        resolve(this.runCountdown(poses));
                    })
                } else {
                    resolve({complete: true});
                }
            });
            
        })
    },
    this.setup = () => {                
        var currPoses = currentRoutine[0].poses;
        var newPoses = [{name: "Get ready!", duration: 5, image: currentRoutine[0].poses[0].image, audio: "NO AUDIO"}];

        for(var item in currPoses) {
            item = currPoses[item];
            newPoses.push(item);

            newPoses.push({name: "Break", duration: 8, image: currentRoutine[0].poses[0].image, audio: "NO AUDIO"})
        }
        this.runCountdown(newPoses).then((r) => {
            Transitioner.show("You're all done!", "50vw", "50vh", "page-browse", [], () => {});
        });
    }
}