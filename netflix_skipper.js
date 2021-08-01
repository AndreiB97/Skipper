setInterval(() => {
    if (window.location.pathname.startsWith('/watch/')) {
        console.debug('Polling for button...')
        const elem = document.querySelector('.skip-credits');
        if (elem !== null) {
            console.debug(`Found ${elem}`)
            elem.children.item(0).click();
        }
    } else {
        console.debug(`Ignoring ${window.location.pathname} as it doesn't match video signature`);
    }
}, 1000);
