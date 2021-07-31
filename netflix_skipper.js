function skipper() {
 let elem = null;

 setInterval(() => {
  console.debug('Polling for button...')
  elem = document.querySelector('.skip-credits');
  if (elem !== null) {
   console.debug(`Found ${elem}`)
   elem.children.item(0).click();
  }
 }, 1000);
}

skipper();
