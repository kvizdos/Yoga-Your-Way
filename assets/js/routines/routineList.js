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
            var newRoutine = new Routine(this.routines[i].name, this.routines[i].description, this.routines[i].poses, this.routines[i].duration);
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
        $('.' + this.container).empty();
        let pagination = "";
        for(let i = 0; i < this.routines.length; i++) {
            var classname = 'bubble';
            if(i == this.currentlyShowing) classname += " active";
            pagination += "<div class='"+classname+"'>&nbsp;</div>"
        }
        $('.' + this.container).append(`  
        <div class="routine">
            <img src="assets/MaleFrontView.svg">
            <div class="routineText">
                <div class="pagination">
                ${pagination}
                </div>
                <p class="routineHeader">${this.routines[this.currentlyShowing].name}</p>
                <p class="routineDesc">${this.routines[this.currentlyShowing].description}</p>
            </div>
            <div class="routineDescription">
            # of poses: ${this.routines[this.currentlyShowing].poses !== undefined ? this.routines[this.currentlyShowing].poses.length : 0 }<br>
            Estimated Duration: ${this.routines[this.currentlyShowing].duration}<br>
            <button class="button">Play</button>
            <button class="button">Edit</button>

            </div>
        </div>
        `)
    },
    this.handleSwipes = () => {

        Hammer(document.getElementsByClassName(this.container)[0]).on('panright', (e) => {
            //$('.' + this.container)[0].style.transform = `translateX(${e.deltaX}px)`;

            if(e.isFinal) {
                this.currentlyShowing -= 1;
                if(this.routines[this.currentlyShowing] !== undefined) {
                    this.render();
                } else {
                    this.currentlyShowing += 1;
                }
                $('.' + this.container)[0].style.transform = `none`;
                
            }

        })

        Hammer(document.getElementsByClassName(this.container)[0]).on('panleft', (e) => {
            //$('.' + this.container)[0].style.transform = `translateX(${e.deltaX}px)`;
            
            if(e.isFinal) {
                this.currentlyShowing += 1;
                if(this.routines[this.currentlyShowing] !== undefined) {
                    this.render();
                } else {
                    this.currentlyShowing -= 1;
                }
                $('.' + this.container)[0].style.transform = `none`;

            }
        })
    }
}