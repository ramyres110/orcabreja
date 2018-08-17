//serviceWorker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () { console.log('Service Worker Registered'); });
}
//materialize
document.addEventListener('DOMContentLoaded', function () {
    const optionsSidenav = {
        edge: "left",
        draggable: true,
        preventScrolling: true
    };
    const sidenav = document.querySelectorAll('.sidenav');
    const sidenavInstances = M.Sidenav.init(sidenav, optionsSidenav);

    const optionsfixbtn = {
        direction: 'up',
        hoverEnabled: false
    };
    const fixedbutton = document.querySelectorAll('.fixed-action-btn');
    const fixedbuttonInstances = M.FloatingActionButton.init(fixedbutton, optionsfixbtn);


    const modaloptions = {};
    const modals = document.querySelectorAll('.modal');
    const modalsInstances = M.Modal.init(modals, modaloptions);

    const optionsparallax = {};
    const parallax = document.querySelectorAll('.parallax');
    const instances = M.Parallax.init(parallax, optionsparallax);
});