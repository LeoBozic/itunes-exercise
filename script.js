const songs = document.getElementById("songs");
const input = document.getElementById("inputSong");
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", search);
//bilo je dosta bug-ova sa automatskim pretrazivanjem pa sam stavio button
//input.addEventListener("input", search);

function addArtistName(item, data) {
  const newName = document.createElement("h4");
  newName.innerText = data.artistName;
  item.appendChild(newName);
}

function addSongName(item, data) {
  const newName = document.createElement("h5");
  newName.innerText = data.trackName;
  item.appendChild(newName);
}

function addArtwork(item, data) {
  const newImg = document.createElement("img");
  newImg.src = data.artworkUrl100.replace("100x100", "200x200");
  item.appendChild(newImg);
}

function addPreview(item, data) {
  const newPreview = document.createElement("audio");
  newPreview.src = data.previewUrl;
  newPreview.controls = true;
  newPreview.preload = "none";
  item.appendChild(newPreview);
}

function showItemsOnScreen(data) {
  const item = document.createElement("li");
  addArtwork(item, data);
  addArtistName(item, data);
  addSongName(item, data);
  addPreview(item, data);
  songs.appendChild(item);
}

function clearList() {
  songs.innerHTML = "";
}

function search() {
  const request = new XMLHttpRequest();

  request.open(
    "GET",
    `https://itunes.apple.com/search?term=${input.value}&entity=song`,
    true
  );

  if (input.value != "") {
    songs.innerHTML = '<div class="loader"></div>';
  }

  request.onload = function (result) {
    const res = JSON.parse(result.currentTarget.response);
    console.log(res);

    if (res.resultCount == 0) {
      return (songs.innerHTML =
        "<h6>Nema rezultata za navedeno pretrazivanje :(</h6>");
    }

    clearList();
    for (i = 0; i < res.resultCount; i++) {
      console.log(`${res.results[i].artistName} - ${res.results[i].trackName}`);
      showItemsOnScreen(res.results[i]);
    }
  };

  request.send();
}
