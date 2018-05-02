var shareImageButton = document.querySelector("#share-image-button");
var createPostArea = document.querySelector("#create-post");
var closeCreatePostModalButton = document.querySelector(
  "#close-create-post-modal-btn"
);
var sharedMomentsArea = document.querySelector("#shared-moments");

function openCreatePostModal() {
  createPostArea.style.display = "block";
  if (deferedPrompt) {
    deferedPrompt.prompt();

    deferedPrompt.userChoice.then(function(choiceResults) {
      console.log(choiceResults.outcome);

      if (choiceResults.outcome === "dismissed") {
        console.log("user canclled installation");
      } else {
        console.log(`User added to homeScreen`);
      }
      deferedPrompt = null;
    });
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = "none";
}

shareImageButton.addEventListener("click", openCreatePostModal);

closeCreatePostModalButton.addEventListener("click", closeCreatePostModal);

// function onSaveButtonClicked(event) {
//   console.log("clicked");
//   if ("caches" in window) {
//     caches.open("user-requested").then(function(caches) {
//       caches.add("../src/images/new-york.jpg");
//       caches.add("https://httpbin.org/get");
//     });
//   }
// }

function createCard() {
  var cardWrapper = document.createElement("div");
  cardWrapper.className = "shared-moment-card mdl-card mdl-shadow--2dp";
  var cardTitle = document.createElement("div");
  cardTitle.className = "mdl-card__title";
  cardTitle.style.backgroundImage = 'url("/src/images/new-york.jpg")';
  cardTitle.style.backgroundSize = "cover";
  cardTitle.style.height = "180px";
  cardWrapper.appendChild(cardTitle);
  var cardTitleTextElement = document.createElement("h2");
  cardTitleTextElement.style.color = "white";
  cardTitleTextElement.className = "mdl-card__title-text";
  cardTitleTextElement.textContent = "New York Trip";
  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText = document.createElement("div");
  cardSupportingText.className = "mdl-card__supporting-text";
  cardSupportingText.textContent = "In New York";
  cardSupportingText.style.textAlign = "center";
  // var cardSaveButton = document.createElement("button");
  // cardSaveButton.textContent = "Save";
  // cardSaveButton.addEventListener("click", onSaveButtonClicked);
  // cardSupportingText.appendChild(cardSaveButton);
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

function clearCard() {
  while (sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

// const url = "https://pwa-prograssive-web-app.firebaseio.com/posts.json";

const url1 = "https://httpbin.org/get";
let networkData = false;

fetch(url1)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log(data);
    networkData = true;
    clearCard();
    createCard();
  });

if ("caches" in window) {
  fetch(url1)
    .then(function(response) {
      if (response) {
        return response.json();
      }
    })
    .then(function(data) {
      console.log(data);
      if (!networkData) {
        clearCard();
        createCard();
      }
    });
}
