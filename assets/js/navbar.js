var Navbar = function(active) {
    this.active = active;
    this.pages = [],
    this.addPage = (name, icon, showOnBar, onrender) => {
        let newPage = new Page(name, icon, showOnBar, onrender);
        this.pages.push(newPage);
    }
    this.render = () => {
        let navList = "";
        for(page in this.pages) {
            if(this.pages[page].showOnBar) {
                let classList = "fas fa-"+this.pages[page].icon+"";
                
                navList += "<i class='fas fa-"+this.pages[page].icon+"' onclick='navigateTo(`"+this.pages[page].selector+"`)'></i>"
                
            }
            this.pages[page].render();
        }

        $('body').append(`
        <div id="navbar">
            ${navList}
        </div>
        `)        

        this.pages[0].show();
    }
}

const navigateTo = (page, extras = [], cb = () => {}, hideNavbar = false, el = "NO") => {
    if(hideNavbar) $('#navbar').hide();
    if(!hideNavbar) $('#navbar').show();

    $('.activeNavbar').removeClass('.activeNavbar');
    if(el !== "NO") {
        console.log(el);
        $(el).addClass('activeNavbar');
    }

    $('[id^="page-"]').hide();
    $('#' + page).show();
    cb(extras);
}

const toggleNavbar = (onoff = true) => {
    if(onoff) $('#navbar').show();
    if(!onoff) $('#navbar').hide();
}


var Page = function(name, icon, showOnBar, onrender) {
    this.name = name,
    this.icon = icon,
    this.showOnBar = showOnBar,
    this.selector = 'page-' + this.name.toLowerCase(),
    this.id = Math.floor(Math.random() * 50),
    this.render = () => { 
        $('#pageHolder').append('<div id="'+this.selector+'"></div>');
        $("#" + this.selector).append(onrender("#" + this.selector));
    },
    this.show = () => {
        $('[id^="page-"]').hide();
        $("#" + this.selector).show();
    }
}