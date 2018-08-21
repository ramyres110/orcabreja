//serviceWorker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () { console.log('Service Worker Registered'); });
}

const Installer = function (root) {
    let promptEvent;
    const install = function (e) {
        if (promptEvent) {
            promptEvent.prompt();
            promptEvent.userChoice
                .then(function (choiceResult) {
                    // The user actioned the prompt (good or bad).
                    // good is handled in 
                    promptEvent = null;
                    root.classList.remove('available');
                })
                .catch(function (installError) {
                    // Boo. update the UI.
                    promptEvent = null;
                    root.classList.remove('available');
                });
        }
    };

    const installed = function (e) {
        promptEvent = null;
        // This fires after onbeforinstallprompt OR after manual add to homescreen.
        root.classList.remove('available');
    };

    const beforeinstallprompt = function (e) {
        promptEvent = e;
        promptEvent.preventDefault();
        root.classList.add('available');
        return false;
    };

    window.addEventListener('beforeinstallprompt', beforeinstallprompt);
    window.addEventListener('appinstalled', installed);

    root.addEventListener('click', install.bind(this));
    root.addEventListener('touchend', install.bind(this));
};

window.addEventListener('load', function() {
    const installEl = document.getElementById('installer');
    const installer = new Installer(installEl);
})