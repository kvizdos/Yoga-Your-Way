const transition = (element = '.page.active', direction = 'up', cb = () => {}) => {
    const els = document.querySelector(element).children;
    let undo = [];

    for(let i in els) {
        const initEl = els[i]
        const subEls = initEl.children;
    
        if(subEls != undefined && subEls.length == 0) {
            let el = els[i];
            el.style.transition = ".25s";
            el.style.transform = generateTranslation(direction, el);
            undo.push(el);
        }

        for(let x in subEls) {
            let el2 = subEls[x]
            if(typeof el2 != 'object') {
                continue;
            }
            undo.push(el2);
            el2.style.transition = ".35s";
            el2.style.transform = generateTranslation(direction, el2);
        }

        setTimeout(function() {
            cb();
            for(let x of undo) {
                x.style.transition = 'inherit';
                x.style.transform = 'inherit';
            }
        }, 350)
    }
}

const swipeIndividual = (els, duration = 100, direction = 'left', i = 1, allEls = []) => {
    const el = els.shift();
    el.style.transform = generateTranslation(direction, el);
    el.style.visibility = 'inherit'
    el.style.opacity = 0;

    // if(i == 1) {
    //     allEls = els;
    //     for(el2 of allEls) {
    //             console.log("Resetting")
    //             el2.style.transition = "0s";
    //             el2.style.transform = 'inherit';
    //             el2.style.opacity = 'inherit';
    //         }
    // }

    setTimeout(function() {
        el.style.transition = .45 / i + "s";
        el.style.transform = '';
        el.style.opacity = 1;
        if(els.length > 0) {
            swipeIndividual(els, duration, direction, i++, allEls)
        } else {
            console.log("In hererer")
            
        }
    }, duration / i);
}

const pop = (el, duration = 100) => {
    el.style.transform = "scale(0)";
    el.style.visibility = 'inherit';
    el.style.transition = '.35s';
    setTimeout(function() {
        el.style.transform = "scale(1)";
        el.style.opacity = 1;
    }, duration)
}

const generateTranslation = (direction, el) => {
    let translation = '';
    switch(direction) {
        case 'up':
            translation = `translate(0, -${el.getBoundingClientRect().top + el.offsetHeight}px)`
            break;
        case 'bottom':
            translation = `translate(0, ${el.getBoundingClientRect().top + el.offsetHeight}px)`
            break;
        case 'left':
            translation = `translate(${el.getBoundingClientRect().right + el.offsetWidth}px, 0)`
            break;
        case 'right':
            translation = `translate(-${el.getBoundingClientRect().right + el.offsetWidth}px, 0)`
            break;
    }

    return translation;
}