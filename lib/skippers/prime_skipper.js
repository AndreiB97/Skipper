const skipPrime = 'skipPrime';
const skipPrimeStorageKey = skipPrime;

let enabled = false;

browser.storage.sync.get(skipPrimeStorageKey).then(
    (result) => {
        if (result.skipPrime === null) {
            // default to true
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

browser.storage.onChanged.addListener((change) => {
    if (change.hasOwnProperty(skipPrime)) {
        enabled = change.skipPrime.newValue;
    }
});

// wait for skip button to be added to its parent div then click it
new MutationObserver(
    () => {
        if (enabled) {
            // the class name for the skip button has some random characters in it
            // so we need to iterate through all buttons and check for it
            for (let button of document.body.getElementsByTagName('button')) {
                const buttonClass = button.getAttribute('class');
                if (buttonClass !== null && buttonClass.includes('skipelement')) {
                    console.debug(`Skipping`)
                    button.click();
                }
            }
        }
    }
).observe(
    document.body,
    {
        subtree: true,
        childList: true
    }
)

