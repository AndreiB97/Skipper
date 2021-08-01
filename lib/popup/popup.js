const skipNetflixButton = document.body.querySelector('#skipNetflix');
const skipNetflixStorageKey = 'skipNetflix';
const skipNetflixEnabledText = '✓ Skip Netflix Intros';
const skipNetflixDisabledText = '✕ Skip Netflix Intros';

const skipPrimeButton = document.body.querySelector('#skipPrime');
const skipPrimeStorageKey = 'skipPrime';
const skipPrimeEnabledText = '✓ Skip Prime Intros';
const skipPrimeDisabledText = '✕ Skip Prime Intros';

function addOnClick(button, storageKey, enabledText, disabledText) {
    button.addEventListener('click', (_) => {
        browser.storage.sync.get(storageKey).then(
            (result) => {
                const newKey = {}
                if (result[storageKey] === true) {
                    newKey[storageKey] = false
                    browser.storage.sync.set(newKey).then(
                        () => {
                            button.textContent = disabledText;
                        }
                    )
                } else if (result[storageKey] === false) {
                    newKey[storageKey] = true
                    browser.storage.sync.set(newKey).then(
                        () => {
                            button.textContent = enabledText;
                        }
                    )
                }
            },
            console.error
        )
    })
}

function setDefault(storageKey) {
    browser.storage.sync.get(storageKey).then(
        (result) => {
            if (result[storageKey] === undefined) {
                const newKey = {}
                newKey[storageKey] = true
                browser.storage.sync.set(newKey)
            }
        }
    )

}

function setButtonText(button, storageKey, enabledText, disabledText) {
    browser.storage.sync.get(storageKey).then(
        (result) => {
            if (result[storageKey] === true) {
                button.textContent = enabledText;
            } else if (result[storageKey] === false) {
                button.textContent = disabledText;
            }
        },
        console.error
    )
}

setDefault(skipNetflixStorageKey);
setDefault(skipPrimeStorageKey);

addOnClick(skipNetflixButton, skipNetflixStorageKey, skipNetflixEnabledText, skipNetflixDisabledText);
addOnClick(skipPrimeButton, skipPrimeStorageKey, skipPrimeEnabledText, skipPrimeDisabledText);

document.addEventListener("DOMContentLoaded", function(_) {
    setButtonText(skipNetflixButton, skipNetflixStorageKey, skipNetflixEnabledText, skipNetflixDisabledText);
    setButtonText(skipPrimeButton, skipPrimeStorageKey, skipPrimeEnabledText, skipPrimeDisabledText);
})
