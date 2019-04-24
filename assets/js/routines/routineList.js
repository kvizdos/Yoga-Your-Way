var _Transition = new Transition();

var routineList = function(container, prev, current, next) {
    this.routines = JSON.parse(localStorage.getItem('routines')) !== null ? JSON.parse(localStorage.getItem('routines')) : [],
    this.currentlyShowing = 0,

    this.container = container,
    this.prev = prev,
    this.current = current,
    this.next = next,

    this.setup = (parent) => {
        let newRoutines = [];
        for(i in this.routines) {
            var newRoutine = new Routine(this.routines[i].name, this.routines[i].description, this.routines[i].poses, this.routines[i].duration, this.routines[i].image);
            newRoutines.push(newRoutine);
        }
        $(parent).append('<div class="routineContainer"></div>')

        this.routines = newRoutines;
        return newRoutines;
    }
    this.getRoutines = () => { return this.routines },
    this.addRoutine = (routine) => { 
        this.routines.push(routine) 
        localStorage.setItem('routines', JSON.stringify(this.routines));
    },
    this.render = () => {
        
        let pagination = "";
        for(let i = 0; i < this.routines.length; i++) {
            var classname = 'bubble';
            if(i == this.currentlyShowing) classname += " active";
            pagination += "<div class='"+classname+"'>&nbsp;</div>"
        }
        
        let PL = "";
        for(p in this.routines[this.currentlyShowing].poses) {
            let currentP = this.routines[this.currentlyShowing].poses[p];

            PL += `
            <div class="poseListItem">
                <p>${currentP.name}</p>
                <p class="duration">${currentP.duration}s</p>
            </div><br>
            `
        }

        PL += "<button id='playRoutine'>Start</button><br><!--<button id='editRoutine'>Edit Routine</button>-->"


        if($('.' + this.container).children().length == 0) {
            $('.' + this.container).append(`  
            <div class="routine">
                <img src="${this.routines[this.currentlyShowing].image}">
                <div class="routineSwiper">
                    <div class="routineText">
                    <i class="fas fa-chevron-up" style="
                        /* display: block; */
                        /* background-color: gold; */
                        font-size: 20pt;
                        transition: 500ms;
                    " id="showMoreInfo"></i>
                        <div class="pagination">
                        ${pagination}
                        </div>
                        <p class="routineHeader">${this.routines[this.currentlyShowing].name}</p>
                        <p class="routineDesc">${this.routines[this.currentlyShowing].description}</p>
                    </div>
                    <div class="routineDescription">
                        <div class="routineSplitRow">
                            <div class="routineSplit">
                                <i class="fas fa-list"></i><br>
                                <span class="routinePoseCount">${this.routines[this.currentlyShowing].poses !== undefined ? this.routines[this.currentlyShowing].poses.length : 0 } poses</span>
                            </div>
                            <div class="routineSplit">
                                <i class="far fa-clock"></i><br>
                                <span class="routineDuration">${this.routines[this.currentlyShowing].duration}</span>
                            </div><br>
                        </div>
 
                        <div class="routineShowMore">
                            <div class="poseListContainer">
                                ${PL}
                            </div>
                        </div>
                        <!--
                        <button class="button" id="playRoutine">Play</button>
                        <button class="button" id="editRoutine">Edit</button>
                        -->
                    </div>
                </div>
            </div>
            `)

            $('#playRoutine').on('touchend', (e) => {
                playRoutine(this.routines[this.currentlyShowing].name, this.getRoutines(), e)
            })

            $('#editRoutine').on('touchend', (e) => {
                editRoutine(this.routines[this.currentlyShowing].name, this.getRoutines(), e)
            })

        } else {
            $('.routineHeader').text(this.routines[this.currentlyShowing].name)
            $('.routineDesc').text(this.routines[this.currentlyShowing].name)
            $('.pagination').html(pagination)
            $('.routinePoseCount').text(this.routines[this.currentlyShowing].poses.length + " poses")
            $('.routineDuration').text(this.routines[this.currentlyShowing].duration)
            $('.poseListContainer').html(PL);

            $("#page-browse > div > div > img").attr('src', this.routines[this.currentlyShowing].image);

            $('#playRoutine').off('touchend');
            $('#editRoutine').off('touchend');

            $('#playRoutine').on('touchend', (e) => {
                playRoutine(this.routines[this.currentlyShowing].name, this.getRoutines(), e)
            })

            $('#editRoutine').on('touchend', (e) => {
                editRoutine(this.routines[this.currentlyShowing].name, this.getRoutines(), e)
            })
        }
        
    },
    this.toggleShowMore = (onoff) => {
        if(!onoff) {
            $('.routineShowMore')[0].style.opacity = 0;
            setTimeout(function() {
                $('.routineShowMore')[0].style.display = 'none';
            }, 250)
        } else {
            $('.routineShowMore')[0].style.display = 'block';
            setTimeout(function() {
                $('.routineShowMore')[0].style.opacity = 1;
            }, 250)
        }
    
    },
    this.handleSwipes = () => {

        $('#showMoreInfo').on('touchend', (e) => {
            showMore = !showMore;
            this.toggleShowMore(showMore);

            if(showMore) $('#showMoreInfo')[0].style.transform = "rotate(180deg)";
            if(!showMore) $('#showMoreInfo')[0].style.transform = "rotate(0deg)";

        })

        Hammer(document.getElementsByClassName('routineContainer')[0].children[0].children[0]).on('panright', (e) => {
            $('.' + this.container + " img")[0].style.transform = `translateX(${e.deltaX / 3}px)`;

            if(e.isFinal) {
                this.currentlyShowing -= 1;
                if(this.routines[this.currentlyShowing] !== undefined) {
                    this.render();
                } else {
                    this.currentlyShowing += 1;
                }
                $('.' + this.container + " img")[0].style.transform = `none`;
                
            }

        })

        Hammer(document.getElementsByClassName('routineContainer')[0].children[0].children[0]).on('panleft', (e) => {
            $('.' + this.container + " img")[0].style.transform = `translateX(${e.deltaX / 3}px)`;
            
            if(e.isFinal) {
                this.currentlyShowing += 1;
                if(this.routines[this.currentlyShowing] !== undefined) {
                    this.render();
                } else {
                    this.currentlyShowing -= 1;
                }
                $('.' + this.container + " img")[0].style.transform = `none`;

            }
        });

        var swipeStart = 0;
        var showMore = false;
        var isActive = false;

        $('.routineText').not($('.routineShowMore')[0]).on('touchstart', (e) => {
            swipeStart = e.targetTouches[0].clientY;
        });
        $('.routineText').not($('.routineShowMore')[0]).on('touchmove', (e) => {
            let h = document.getElementsByClassName('routineSwiper')[0].children[0].clientHeight + document.getElementsByClassName('routineSwiper')[0].children[1].clientHeight;

            var dist = (-(e.targetTouches[0].clientY - swipeStart));
            var threshCheck = (swipeStart - e.targetTouches[0].clientY);

            if(threshCheck > 0) {
                $('.routineSwiper')[0].style.bottom = `${dist}px`

                if(threshCheck > 200) {
                    showMore = true;
                    hideMore = false;
                } else {
                    showMore = false;
                    hideMore = true;
                }
            } else {
                showMore = false;
                if(isActive) {
                    if(threshCheck < -100) {
                        $('.routineSwiper')[0].style.bottom = `0px`
                    } else {
                        $('.routineSwiper')[0].style.bottom = `calc(100vh - ${h + Math.abs(threshCheck / 2)}px)`

                        if(showMore) $('#showMoreInfo')[0].style.transform = "rotate(180deg)";
                        if(!showMore) $('#showMoreInfo')[0].style.transform = "rotate(0deg)";
                        curH = Math.abs(threshCheck / 2);
                    }
                }
            }

        })
        $('.routineText').not($('.routineShowMore')[0]).on('touchend', (e) => {
            let h = document.getElementsByClassName('routineSwiper')[0].children[0].clientHeight + document.getElementsByClassName('routineSwiper')[0].children[1].clientHeight;

            if(showMore) {
                isActive = true;
                $('.routineSwiper')[0].style.bottom = `calc(100vh - ${h}px)`;
                

                $('#showMoreInfo')[0].style.transform = "rotate(180deg)";
                this.toggleShowMore(true);
            } else if(!showMore) {
                $('.routineSwiper')[0].style.bottom = `0`;

                $('#showMoreInfo')[0].style.transform = "rotate(0deg)";
                this.toggleShowMore(false);
            }

        });
    }
}

function playRoutine(name, allRoutines, event) {
    var currentRoutine = allRoutines.filter((r) => {
        return r.name == name;
    })

    _Transition.show("Loading...", event.changedTouches[0].clientX, event.changedTouches[0].clientY, 'page-start', currentRoutine, (r) => {
        setCurrentRoutine(r); 
        _StartPage.setup()
    }, true)
}

function editRoutine(name){
    alert("Editing: " + name);
}