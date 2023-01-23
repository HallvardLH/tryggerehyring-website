
window.mySwipe = new Swipe(document.getElementById('slider'), {
    startSlide: 0,
    speed: 400,
    auto: 5000,
    draggable: false,
    continuous: true,
    disableScroll: false,
    stopPropagation: false,
    ignore: ".scroller",
    callback: function(index, elem, dir) {},
    transitionEnd: function(index, elem) {}
});

let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');

prevBtn.onclick = mySwipe.prev;
nextBtn.onclick = mySwipe.next;