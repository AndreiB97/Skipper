const skipNetflix = 'skipNetflix';
const skipNetflixIntro = `${skipNetflix}Intro`;
const skipNetflixRecap = `${skipNetflix}Recap`;

let skipIntroEnabled = false;
let skipRecapEnabled = false;


// duplicate code because firefox doesn't like imports for some reason
async function getConfigFromStorage(storageKey) {
    const result = await browser.storage.sync.get(storageKey);
    if (result[storageKey] === undefined) {
        // default to true
        const newConfig = {};
        newConfig[storageKey] = true;
        await browser.storage.sync.set(newConfig);
        return true;
    }
    return result[storageKey];
}

function onBodyChange(callback) {
    // wait for skip button to be added to its parent div then click it
    new MutationObserver(callback).observe(
        document.body,
        {
            subtree: true,
            childList: true
        }
    )
}

function skipIntro() {
    onBodyChange(() => {
        if (skipIntroEnabled) {
            const elem = document.querySelector('.skip-credits');
            if (elem.textContent === 'Skip Intro') {
                console.debug(`Skipping intro`)
                elem.children.item(0).click();
            }
        }
    })
}

function skipRecap() {
    onBodyChange(() => {
        if (skipRecapEnabled) {
            const elem = document.querySelector('.skip-credits');
            if (elem.textContent === 'Skip Recap') {
                console.debug(`Skipping recap`)
                elem.children.item(0).click();
            }
        }
    })
}

async function skipper() {
    browser.storage.onChanged.addListener((change) => {
        if (change.hasOwnProperty(skipNetflixIntro)) {
            skipIntroEnabled = change[skipNetflixIntro].newValue;
        }
        if (change.hasOwnProperty(skipNetflixRecap)) {
            skipRecapEnabled = change[skipNetflixRecap].newValue;
        }
    });
    // for some reason this gets the script stuck if done outside of a function
    skipIntroEnabled = await getConfigFromStorage(skipNetflixIntro);
    skipRecapEnabled = await getConfigFromStorage(skipNetflixRecap);
    skipIntro();
    skipRecap();
}

skipper().then()  // blank then so IDE doesn't complain about promise
