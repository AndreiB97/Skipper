class SkipperUI {
    constructor(serviceType) {
        this.serviceType = serviceType;
        this.buttons = [
            {
                text: `Skip ${this.serviceType} Intros`,
                ref: document.body.querySelector(`#skip${serviceType}Intro`)
            },
            {
                text: `Skip ${this.serviceType} Recap`,
                ref: document.body.querySelector(`#skip${serviceType}Recap`)
            }
        ]
    }
}

class NetflixSkipperUI extends SkipperUI {
    constructor() {
        super('Netflix');
    }
}

class PrimeSkipperUI extends SkipperUI {
    constructor() {
        super('Prime');
        this.buttons.push({
            text: `Skip ${this.serviceType} Promos`,
            ref: document.body.querySelector(`#skipPrimePromo`)
        });
    }
}

const enabled = '✓';
const disabled = '✕';

function addOnClick(button, storageKey, buttonText) {
    button.addEventListener('click', async () => {
        const result = await browser.storage.sync.get(storageKey);
        const newKey = {};
        if (result[storageKey] === true) {
            newKey[storageKey] = false;
            await browser.storage.sync.set(newKey);
            button.textContent = `${disabled} ${buttonText}`;
        } else if (result[storageKey] === false) {
            newKey[storageKey] = true;
            await browser.storage.sync.set(newKey);
            button.textContent = `${enabled} ${buttonText}`;
        }
    });
}

async function setDefault(storageKey) {
    const result = await browser.storage.sync.get(storageKey)
    if (result[storageKey] === undefined) {
        const newKey = {};
        newKey[storageKey] = true;
        await browser.storage.sync.set(newKey);
    }
}

async function updateButtonText(button, storageKey, buttonText) {
    const result = await browser.storage.sync.get(storageKey)
    if (result[storageKey] === true) {
        button.textContent = `${enabled} ${buttonText}`;
    } else if (result[storageKey] === false) {
        button.textContent = `${disabled} ${buttonText}`;
    }
}

async function setup() {
    const netflixSkipperUi = new NetflixSkipperUI();
    const primeSkipperUi = new PrimeSkipperUI();
    const uis = [netflixSkipperUi, primeSkipperUi];

    for (const ui of uis) {
        for (const button of ui.buttons) {
            await setDefault(button.ref.id);
            addOnClick(button.ref, button.ref.id, button.text);
            await updateButtonText(button.ref, button.ref.id, button.text);
        }
    }
}

window.onload=setup;
