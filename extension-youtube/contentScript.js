console.log("exec in the page context");

var mode = 0;

function wait(n) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, n);
  });
}

window.addEventListener("load", async () => {
  console.log("exec in the page context 2");
  await wait(1500);

  // Créez un élément link pour inclure votre fichier CSS
  // const link = document.createElement('link');
  // link.rel = 'stylesheet';
  // link.type = 'text/css';
  // link.href = 'styles.css';
  // Ajoutez l'élément link au head de la page
  // document.head.appendChild(link);

  // For observe the DOM and detect when a new element is added
  // and then execute the function execMode
  const parentElement = document.querySelector("#contents");
  // Créez une instance de MutationObserver
  const observer = new MutationObserver( async (mutationsList, observer) => {
    // Itérez sur la liste des mutations observées
    for (let mutation of mutationsList) {
      // Vérifiez si des enfants ont été ajoutés à l'élément parent
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        // Faites quelque chose ici, par exemple afficher un message
        console.log(
          "Un ou plusieurs enfants ont été ajoutés à l'élément parent."
        );
        await execMode(mode);
      }

      console.log("mutation : ", mutation);
    }
  });
  // Configurez les options de l'observer
  const observerConfig = { childList: true };
  // Commencez l'observation en passant l'élément parent et les options de configuration
  observer.observe(parentElement, observerConfig);


  let nouvelElement = document.createElement("div");

  // All
  let newButton = document.createElement("button");
  newButton.innerHTML = "Afficher tout";
  newButton.onclick = () => {
    console.log("click");
    mode = 0;
    execMode(mode);
  };
  newButton.id = "buttonAll";
  nouvelElement.appendChild(newButton);

  // Only videos
  newButton = document.createElement("button");
  newButton.innerHTML = "Afficher les vidéos";
  newButton.onclick = () => {
    console.log("click");
    mode = 1;
    execMode(mode);
  };
  nouvelElement.appendChild(newButton);

  // Only shorts
  newButton = document.createElement("button");
  newButton.innerHTML = "Afficher les shorts";
  newButton.onclick = () => {
    console.log("click");
    mode = 2;
    execMode(mode);
  };
  nouvelElement.appendChild(newButton);
  
  const divYoutube = this.document.querySelector(
    "#dismissible > div.grid-subheader.style-scope.ytd-shelf-renderer"
  );

  // Add buttons in the DOM
  divYoutube.appendChild(nouvelElement);
});

// Exec mode of display
const execMode = async (mode) => {
  await wait(500);
  console.log('execMode : ', mode)

  displayAll();
  switch (mode) {
    case 0:
      displayAll();
      break;
    case 1:
      displayOnlyVideos();
      break;
    case 2:
      displayOnlyShorts();
      break;
    default:
      displayAll();
      break;
  }
};

// For see only videos
const displayOnlyVideos = () => {
  console.log("displayOnlyVideos");
  document
    .querySelectorAll("#contents > ytd-item-section-renderer")
    .forEach((elementDOM) => {
      const array = elementDOM.querySelectorAll(
        "#items > ytd-grid-video-renderer"
      );

      console.log("array length : ", array.length);

      array.forEach((element) => {
        if (
          element.querySelector(
            'ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]'
          ) !== null
        ) {
          element.style.display = "none";
        }
      });
    });
};

// For see only shorts
const displayOnlyShorts = () => {
  console.log("displayOnlyShorts");
  document
    .querySelectorAll("#contents > ytd-item-section-renderer")
    .forEach((elementDOM) => {
      const array = elementDOM.querySelectorAll(
        "#items > ytd-grid-video-renderer"
      );

      console.log("array length : ", array.length);

      let cache = 0;

      array.forEach((element) => {
        if (
          element.querySelector(
            'ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]'
          ) === null
        ) {
          element.style.display = "none";
          cache++;
        }
      });

      console.log("cache : ", cache);
    });
};

// For see all
const displayAll = () => {
  console.log("displayAll");
  document
    .querySelectorAll("#contents > ytd-item-section-renderer")
    .forEach((elementDOM) => {
      const array = elementDOM.querySelectorAll(
        "#items > ytd-grid-video-renderer"
      );

      console.log("array length : ", array.length);

      array.forEach((element) => {
        element.style.display = "block";
      });
    });
};
