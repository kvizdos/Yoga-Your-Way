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
    const previousCarouselItems = document.querySelectorAll('#carousel .item.prev');
    const paddleLeft = document.querySelector('.carouselPaddle.left');
    const paddleRight = document.querySelector('.carouselPaddle.right');

    if(previousCarouselItems.length > 0) {
        const activeCarouselItem = document.querySelector('#carousel .item.active');
        activeCarouselItem.classList.add('next')
        activeCarouselItem.classList.remove('active')
        
        previousCarouselItems[previousCarouselItems.length - 1].classList.add('active');
        previousCarouselItems[previousCarouselItems.length - 1].classList.remove('prev');
    
        if(previousCarouselItems.length == 0) {
            paddleLeft.disabled = true
        } 

        const nextCarouselItems = document.querySelectorAll('#carousel .item.next');

        if(nextCarouselItems.length > 0) {
            paddleRight.disabled = false
        }
    }
}

const sliderRight = () => {
    const nextCarouselItems = document.querySelectorAll('#carousel .item.next');
    const paddleLeft = document.querySelector('.carouselPaddle.left');
    const paddleRight = document.querySelector('.carouselPaddle.right');

    if(nextCarouselItems.length > 0) {
        const activeCarouselItem = document.querySelector('#carousel .item.active');
        const nextCarouselItems = document.querySelectorAll('#carousel .item.next');

        activeCarouselItem.classList.add('prev')
        activeCarouselItem.classList.remove('active')
        
        nextCarouselItems[0].classList.add('active');
        nextCarouselItems[0].classList.remove('next');

        if(nextCarouselItems.length == 0) {
            paddleRight.disabled = true
        } 

        const previousCarouselItems = document.querySelectorAll('#carousel .item.prev');

        if(previousCarouselItems.length > 0) {
            paddleLeft.disabled = false
        }
    }
}