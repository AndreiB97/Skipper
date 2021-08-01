
setInterval(() => {
    console.debug('Polling for button...')
    const buttons = document.body.getElementsByTagName('button');
    for (let button of buttons) {
        const buttonClass = button.getAttribute('class');
        if (buttonClass !== null && buttonClass.includes('skipelement')) {
            console.debug(`Found ${button}`)
            button.click();
        }
    }
}, 1000);
