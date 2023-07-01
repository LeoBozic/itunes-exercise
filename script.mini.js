const songs=document.getElementById("songs"),input=document.getElementById("inputSong"),searchButton=document.getElementById("searchButton");function addArtistName(e,t){let n=document.createElement("h4");n.innerText=t.artistName,e.appendChild(n)}function addSongName(e,t){let n=document.createElement("h5");n.innerText=t.trackName,e.appendChild(n)}function addArtwork(e,t){let n=document.createElement("img");n.src=t.artworkUrl100.replace("100x100","200x200"),e.appendChild(n)}function addPreview(e,t){let n=document.createElement("audio");n.src=t.previewUrl,n.controls=!0,n.preload="none",e.appendChild(n)}function showItemsOnScreen(e){let t=document.createElement("li");addArtwork(t,e),addArtistName(t,e),addSongName(t,e),addPreview(t,e),songs.appendChild(t)}function clearList(){songs.innerHTML=""}function search(){let e=new XMLHttpRequest;e.open("GET",`https://itunes.apple.com/search?term=${input.value}&entity=song`,!0),""!=input.value&&(songs.innerHTML='<div class="loader"></div>'),e.onload=function(e){let t=JSON.parse(e.currentTarget.response);if(console.log(t),0==t.resultCount)return songs.innerHTML="<h6>Nema rezultata za navedeno pretrazivanje :(</h6>";for(clearList(),i=0;i<t.resultCount;i++)console.log(`${t.results[i].artistName} - ${t.results[i].trackName}`),showItemsOnScreen(t.results[i])},e.send()}searchButton.addEventListener("click",search);