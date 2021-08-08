const enabled = '✓';
const disabled = '✕';

const skipNetflix = 'skipNetflix';
const skipNetflixIntro = `${skipNetflix}Intro`
const skipNetflixRecap = `${skipNetflix}Recap`
const skipNetflixIntroButton = document.body.querySelector(`#${skipNetflixIntro}`);
const skipNetflixRecapButton = document.body.querySelector(`#${skipNetflixRecap}`);
const skipNetflixText = 'Skip Netflix';
const skipNetflixIntroText = `${skipNetflixText} Intros`;
const skipNetflixRecapText = `${skipNetflixText} Recaps`;

const skipPrime = 'skipPrime';
const skipPrimeIntro = `${skipPrime}Intro`;
const skipPrimePromo = `${skipPrime}Promo`;
const skipPrimePromoButton = document.body.querySelector(`#${skipPrimePromo}`);
const skipPrimeIntroButton = document.body.querySelector(`#${skipPrimeIntro}`);
const skipPrimeText = 'Skip Prime'
const skipPrimeIntroText = `${skipPrimeText} Intros`;
const skipPrimePromoText = `${skipPrimeText} Promos`;

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

async function setButtonText() {
    await updateButtonText(skipNetflixIntroButton, skipNetflixIntro, skipNetflixIntroText);
    await updateButtonText(skipNetflixRecapButton, skipNetflixRecap, skipNetflixRecapText);
    await updateButtonText(skipPrimeIntroButton, skipPrimeIntro, skipPrimeIntroText);
    await updateButtonText(skipPrimePromoButton, skipPrimePromo, skipPrimePromoText);
}

async function setup() {

    await setDefault(skipNetflixIntro);
    await setDefault(skipNetflixRecap);
    await setDefault(skipPrimeIntro);
    await setDefault(skipPrimePromo);

    addOnClick(skipNetflixIntroButton, skipNetflixIntro, skipNetflixIntroText);
    addOnClick(skipNetflixRecapButton, skipNetflixRecap, skipNetflixRecapText);
    addOnClick(skipPrimeIntroButton, skipPrimeIntro, skipPrimeIntroText);
    addOnClick(skipPrimePromoButton, skipPrimePromo, skipPrimePromoText);

    if (document.readyState !== 'loading') {
        await setButtonText();
    } else {
        document.addEventListener("DOMContentLoaded", setButtonText)
    }
}

setup().then()  // blank then so IDE doesn't complain about promise