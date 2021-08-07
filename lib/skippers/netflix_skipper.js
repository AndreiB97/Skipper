const skipNetflix = 'skipNetflix';
const skipNetflixStorageKey = skipNetflix;

let enabled = false;

browser.storage.sync.get(skipNetflixStorageKey).then(
    (result) => {
        if (result.skipNetflix === undefined) {
            // default to true
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

browser.storage.onChanged.addListener((change) => {
    if (change.hasOwnProperty(skipNetflix)) {
        enabled = change.skipNetflix.newValue;
    }
});

// wait for skip button to be added to its parent div then click it
new MutationObserver(
    () => {
        if (enabled) {
            const elem = document.querySelector('.skip-credits');
            if (elem.textContent === 'Skip Intro') {
                console.debug(`Skipping intro`)
                elem.children.item(0).click();
            }
        }
    }
).observe(
    document.querySelector('.PlayerControlsNeo__layout'),
    {
        subtree: true,
        childList: true
    }
)
