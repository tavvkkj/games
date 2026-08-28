let leadthepath = location.pathname;
let showtheway = leadthepath.replace(/(?:.(?!\/))+$/g, "");
console.log(showtheway);
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(showtheway + '/sw.js').then((registration) => {
    console.log('Service worker registration succeeded:', registration);
  }, (error) => {
    console.error(`Service worker registration failed: ${error}`);
  });
} else {
  console.error('Service workers are not supported.');
}