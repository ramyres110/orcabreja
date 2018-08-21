//serviceWorker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () { console.log('Service Worker Registered'); });
}

let installModall = document.querySelector('#installModal');

let deferredPrompt;
document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('beforeinstallprompt', function (e) {
        alert("beforeinstallprompt Event fired");
        // e.userChoice will return a Promise.
        e.userChoice.then(function (choiceResult) {
            console.log(choiceResult.outcome);
            if (choiceResult.outcome == 'dismissed') {
                console.log('User cancelled home screen install');
            }
            else {
                console.log('User added to home screen');
            }
        });
    });
});

let btnCancel = document.querySelector('#installBtnCancel');
btnCancel.addEventListener('click', (e) => {
    console.log('User dismissed the A2HS prompt');
    installModall.style.display = 'none';
})

let btnAdd = document.querySelector('#installBtnAdd');
btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    installModall.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
});