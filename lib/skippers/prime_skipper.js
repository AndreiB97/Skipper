const skipPrime = 'skipPrime';
const skipPrimeIntro = `${skipPrime}Intro`;
const skipPrimePromos = `${skipPrime}Promo`

let skipIntroEnabled;
let skipPromoEnabled;

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
            // the class name for the skip button has some random characters in it
            // so we need to iterate through all buttons and check for it
            for (let button of document.body.getElementsByTagName('button')) {
                const buttonClass = button.getAttribute('class');
                if (buttonClass !== null && buttonClass.includes('skipelement')) {
                    console.debug(`Skipping Intro`)
                    button.click();
                }
            }
        }
    })
}

function skipPromo() {
    onBodyChange(() => {
        if (skipPromoEnabled) {
            // the skip button is a div with classes that contain random characters
            // so we need to pass through all of them and check if there's a skip button
            const divs = document.getElementsByTagName('div')
            for (let i = 0; i < divs.length; i++) {
                if (divs.item(i).textContent === 'Skip') {
                    console.debug('Skipping Promo')
                    divs.item(i).click()
                }
            }
        }
    })
}

async function skipper() {
    browser.storage.onChanged.addListener((change) => {
        if (change.hasOwnProperty(skipPrimeIntro)) {
            skipIntroEnabled = change[skipPrimeIntro].newValue;
        }
        if (change.hasOwnProperty(skipPrimePromos)) {
            skipPromoEnabled = change[skipPrimePromos].newValue;
        }
    });
    // for some reason this gets the script stuck if done outside of a function
    skipIntroEnabled = await getConfigFromStorage(skipPrimeIntro);
    skipPromoEnabled = await getConfigFromStorage(skipPrimePromos);
    skipIntro();
    skipPromo();
}

skipper().then()  // blank then so IDE doesn't complain about promise
