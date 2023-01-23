const navigation = {
    sidenav_state: false,
    toggle_sidenav: function() {
        if(!this.sidenav_state) {
            document.getElementById("sidenav").style.width = "250px";
            document.getElementById("sidenav").style.right = "0px";
            this.sidenav_state = true;
        } else {
            document.getElementById("sidenav").style.width = "0";
            document.getElementById("sidenav").style.right = "-100px";
            this.sidenav_state = false;
        }
    }
}

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    if(isMobile()) {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-100px";
        }
        prevScrollpos = currentScrollPos;
    }
}

/**
 * Checks the style of the class "is-mobile"
 * Which is determined by a CSS media query
 * That changes its accent-color style
 * When the screen is smaller than 700px
 * @returns boolean
 */
function isMobile() {
    style = getComputedStyle(document.querySelector(".is-mobile"));
    if(style.accentColor == "rgb(0, 128, 0)") {
        return true
    } else {
        return false
    }
}