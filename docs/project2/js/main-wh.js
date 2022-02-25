document.getElementById("menu").addEventListener("click", function() {
    document.getElementById("information").classList.toggle("close");
    this.classList.toggle("close");

    document.getElementById("information2").classList.toggle("close");
});
document.getElementById("information").addEventListener("click", function() {
    this.classList.toggle("close");
    document.getElementById("information2").classList.toggle("close");
});
// const toggle_btn = document.querySelector('.js_toggle');
// const panel = document.querySelector('.panel');
// toggle_btn.onclick = function(e) {
//     // e.preventDefault();
//     panel.classList.toggle("panelClose"); //https://www.runoob.com/jsref/prop-element-classlist.html

// };