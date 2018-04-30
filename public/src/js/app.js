let deferedPrompt;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../service-worker.js")
    .then(e => console.log("Service Worker is registered"))
    .catch(e => console.log("Error While is registered " + e));
}

window.addEventListener("beforeinstallprompt", function(event) {
  console.log(`before install fired`);

  // event.prompt();

  event.preventDefault();
  deferedPrompt = event;
  return false;
  // return true;
});
