//default element class
class Elem {
    constructor(e) {
        this.elem = e;
        this.depth = e.dataset.depth;
        this.offset = e.parentElement.getBoundingClientRect().top + scrollY;
    }
}

//default parallax element parent object
var ElemGroup = {}

//get the parallax elements
var elems = document.querySelectorAll('.parallax');

//put all of the parallax elements into the parent element using the Elem class as a template
function rebuildObjects() {
    var loop = 0;
    elems.forEach(elem => {
        ElemGroup['elem' + loop] = new Elem(elem);
        loop ++;
    });
    scrolling();
}

//move the elements to match the scroll position
function scrolling() {
    for (var key in ElemGroup) {
        ElemGroup[key].elem.style.top = "calc(50% - " + -((window.scrollY / ElemGroup[key].depth) - (ElemGroup[key].offset / ElemGroup[key].depth)) + "px)";
    }
}

//add neccisary listeners
document.addEventListener('scroll', scrolling);
window.addEventListener('load', scrolling);
;['resize', 'load'].forEach(key => {window.addEventListener(key, rebuildObjects);})