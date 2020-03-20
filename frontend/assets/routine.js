let activeRoutine = "";
let allPoses = [];

const loadPoses = () => {
    allPoses = [
        {
            name: "Pose 1"
        },
        {
            name: "Pose 2"
        },
        {
            name: "Pose 3"
        }
    ]
}

const beginRoutine = () => {
    activeRoutine = document.querySelector(".item.active").getAttribute('data-for');
    navigateTo('routine');
}

const exitRoutine = () => {
    navigateTo('home', true);
}

const loadPosesList = (poses = allPoses) => {
    let append = "";
    let i = 0;
    for(pose of poses) {
        append += ` 
        <li data-for="${i++}" onclick="selectPose(this)">
            <article class="posePreviewContainer circular">
                <article class="poseSelected">
                        <i class="fas fa-check"></i>
                </article>
                <!-- <img src="https://lh3.googleusercontent.com/fkkuDVw053xsii0rdRpQIWl_a1yGb-MoYudMmptMZwBXMp7M5vxK6fwc5ZuSiLBf5vwunz1ZEBFx23TCXO_7=w1366-h625" /> -->
            </article>
            <p>${pose.name}</p>
        </li>
        `
    }
    document.querySelectorAll('.poseEditor').forEach(el => {
        el.innerHTML = append;
    })
}

const selectPose = (el) => {
    console.log("Selecting");
    if(el.children[0].children[0].classList.contains('selected')) {
        el.children[0].children[0].classList.remove('selected');
    } else {
        el.children[0].children[0].classList.add("selected");
    }
}

const createRoutine = () => {
    navigateTo('home');
}

const sliderLeft = () => {
    if(document.querySelectorAll('#carousel .item.prev').length > 0) {
        document.querySelector('#carousel .item.active').classList.add('next')
        document.querySelector('#carousel .item.active').classList.remove('active')
        document.querySelectorAll('#carousel .item.prev')[document.querySelectorAll('#carousel .item.prev').length - 1].classList.add('active');

        document.querySelectorAll('#carousel .item.prev')[document.querySelectorAll('#carousel .item.prev').length - 1].classList.remove('prev');
    
        if(document.querySelectorAll('#carousel .item.prev').length == 0) {
            document.querySelector('.carouselPaddle.left').disabled = true
        } 
        if(document.querySelectorAll('#carousel .item.next').length > 0) {
            document.querySelector('.carouselPaddle.right').disabled = false
        }
    }
}

const sliderRight = () => {
    if(document.querySelectorAll('#carousel .item.next').length > 0) {
        document.querySelector('#carousel .item.active').classList.add('prev')
        document.querySelector('#carousel .item.active').classList.remove('active')
        
        document.querySelectorAll('#carousel .item.next')[0].classList.add('active');
        document.querySelectorAll('#carousel .item.next')[0].classList.remove('next');

        if(document.querySelectorAll('#carousel .item.next').length == 0) {
            document.querySelector('.carouselPaddle.right').disabled = true
        } 
        if(document.querySelectorAll('#carousel .item.prev').length > 0) {
            document.querySelector('.carouselPaddle.left').disabled = false
        }
    }
}