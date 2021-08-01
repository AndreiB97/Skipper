const skipNetflix = 'skipNetflix';
const skipNetflixStorageKey = skipNetflix;

let enabled = false;

browser.storage.sync.get(skipNetflixStorageKey).then(
    (result) => {
        if (result.skipNetflix === undefined) {
            browser.storage.sync.set({skipNetflixStorageKey: true}).then(
                () => {
                    enabled = true;
                }
            )
        } else {
            enabled = result.skipNetflix;
        }
    }
)

setInterval(() => {
    if (enabled) {
        if (window.location.pathname.startsWith('/watch/')) {
            console.debug('Polling for button...')
            const elem = document.querySelector('.skip-credits');
            if (elem !== null) {
                console.debug(`Skipping intro`)
                elem.children.item(0).click();
            }
        } else {
            console.debug(`Ignoring ${window.location.pathname} as it doesn't match video signature`);
        }
    }
}, 1000);

browser.storage.onChanged.addListener((change) => {
    if (change.hasOwnProperty(skipNetflix)) {
        enabled = change.skipNetflix.newValue;
    }
});
