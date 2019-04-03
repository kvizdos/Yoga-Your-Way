var Transition = function() {
    this.show = (splashText, x, y, goto, extras, cb, hideNavbar = false) => {
        let tapX = x;
        let tapY = y;

        let transitionCircle = document.createElement('div');
        transitionCircle.style.position = 'absolute';
        transitionCircle.style.left = tapX - 25 + "px";
        transitionCircle.style.top = tapY - 25 + "px";
        transitionCircle.style.zIndex = 999;
        transitionCircle.style.width = "50px";
        transitionCircle.style.height = "50px";
        transitionCircle.style.borderRadius = "100%";
        transitionCircle.style.backgroundColor = "#F69F0C";
        transitionCircle.style.transition = "500ms";
        transitionCircle.style.overflow = "hidden";

        transitionCircle.style.display = "flex";
        transitionCircle.style.justifyContent = "center";
        transitionCircle.style.alignContent = "center";
        transitionCircle.style.alignItems = "center";

        transitionCircle.style.fontSize = "18pt";
        transitionCircle.style.color = "white";

        transitionCircle.innerHTML = splashText;

        transitionCircle.id = "transitionCircle";

        document.getElementsByTagName('body')[0].appendChild(transitionCircle);

        setTimeout(function() {
            transitionCircle.style.left = "0";
            transitionCircle.style.top = "0";
            transitionCircle.style.width = "100vw";
            transitionCircle.style.height = "100vh";
            transitionCircle.style.borderRadius = "0";
        }, 1)

        setTimeout(function() {
            navigateTo(goto, extras, (r) => {cb(r)}, hideNavbar);
            transitionCircle.style.width = "0";
            transitionCircle.style.height = "0";
            transitionCircle.style.left = "50vw";
            transitionCircle.style.top = "50vh";
            transitionCircle.style.borderRadius = "100%";
            setTimeout(function() {
                $('#transitionCircle').remove();
            }, 501)
        }, 2000)
    }
}