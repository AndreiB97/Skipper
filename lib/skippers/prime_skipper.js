const skipPrime = 'skipPrime';
const skipPrimeStorageKey = skipPrime;

let enabled = false;

browser.storage.sync.get(skipPrimeStorageKey).then(
    (result) => {
        if (result.skipPrime === null) {
            browser.storage.sync.set({skipPrimeStorageKey: true}).then(
                () => {
                    enabled = true;
                }
            )
        } else {
            enabled = result.skipPrime;
        }
    }
)

setInterval(() => {
    if (enabled) {
        console.debug('Polling for button...')
        const buttons = document.body.getElementsByTagName('button');
        for (let button of buttons) {
            const buttonClass = button.getAttribute('class');
            if (buttonClass !== null && buttonClass.includes('skipelement')) {
                console.debug(`Skipping`)
                button.click();
            }
        }
    }
}, 1000);

browser.storage.onChanged.addListener((change) => {
    if (change.hasOwnProperty(skipPrime)) {
        enabled = change.skipPrime.newValue;
    }
});
