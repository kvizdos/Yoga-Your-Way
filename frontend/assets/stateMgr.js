const pages = {
    login: true,
    home: false,
    routine: false,
    create: false
}

window.onload = function() {
    // slider();
    if(localStorage.getItem("name") != undefined) {
        setUserInfo();
        loadPoses();
        loadPosesList();
        navigateTo('home');
        
    } else {
        const loginEls = [...document.querySelector('#loginHeader').children];

        setTimeout(function() {
            swipeIndividual(loginEls, undefined, 'up')
            pop(document.getElementById("signIn"));
        }, 500)
    }
}

const getActivePage = () => {
    return Object.keys(pages)[Object.values(pages).findIndex(el => el == true)]
}

const navigateTo = (page, instant = false) => {
    if(pages[page] != undefined) {
        pages[Object.keys(pages)[Object.values(pages).findIndex(el => el == true)]] = false
        pages[page] = true;
        transition(undefined, undefined, () => {
            document.querySelector('.page.active').classList.remove('active')
            document.querySelector(`.page#${page}`).classList.add('active')

            if(!instant) {
                switch(page) {
                    case "home":
                        const headerEls = [...document.querySelector('#header').children];
                        const footerEls = [...document.querySelector('#bottom').children];
                        const sliderEls = [document.querySelector('#carousel .item.active')];

                        swipeIndividual(headerEls)
                        swipeIndividual(footerEls, undefined, 'bottom')
                        setTimeout(function() {
                            if(document.querySelector('#carousel .item.active.temp') != null) document.querySelector('#carousel .item.active.temp').classList.remove('temp');
                            swipeIndividual(sliderEls, 500, 'bottom');
                            const paddles = [...document.querySelectorAll("#middler > button.carouselPaddle")];
                            
                            setTimeout(function() {
                                pop(paddles[0], 300, 'up');
                                pop(paddles[1], 300, 'up');
                            }, 100)
                        }, 200)
                        break;
                    case "login":
                        const loginEls = [...document.querySelector('#loginHeader').children];
                        
                        swipeIndividual(headerEls)
                        swipeIndividual(footerEls, undefined, 'bottom')
                        document.getElementById("signIn").style.transform = "scale(0)"
                        setTimeout(function() {
                            swipeIndividual(loginEls, undefined, 'up')
                            pop(document.getElementById("signIn"));
                        }, 500)
                        break;
                    case "create":
                        const poseListEls = [...document.querySelector('#create .poseEditor').children];
                        
                        setTimeout(function() {
                            swipeIndividual(poseListEls, undefined, 'right')
                        }, 100)
                        break;
                    default:
                        break;
                }
            }
        })
    }
}