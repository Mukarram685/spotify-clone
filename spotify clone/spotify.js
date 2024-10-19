console.log("Welcome in Java Script");
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".left").style.left = "0";
});
document.querySelector(".cross").addEventListener("click", () => {
  document.querySelector(".left").style.left = "-100%";
});

const newsong = new Audio;
let song = [];
let current_song_index = 0;


async function allsongs() {
  let b = await fetch("http://127.0.0.1:3000/songs/");
  let name = await b.text();
  console.log(name);

  let makdiv = document.createElement("div")
  makdiv.innerHTML = name;
  let nam = makdiv.getElementsByTagName("a")
  console.log(nam);


  for (let index = 0; index < nam.length; index++) {
    const element = nam[index];
    if (element.href.endsWith(".m4a")) {
      song.push(element.href.split("/songs/")[1])
    }
  }
  return song;
}


const playgany = (trick) => {
  // let audio = new Audio("/songs/" + trick)
  // audio.play();
  newsong.src = "/songs/" + trick
  newsong.play();
  play2.src = "pause.png";
  
  document.querySelector(".songinfo").innerHTML = trick.replace(/%20/g, " ");
  document.querySelector(".duration").innerHTML = "00:00 / 00:00";

}

const play_next_song = ()=>{
  current_song_index = (current_song_index + 1) % song.length;
  playgany(song[current_song_index]);
}

const play_previous_song = ()=>{
  current_song_index = (current_song_index - 1+ song.length) % song.length;
  playgany(song[current_song_index]);
}



async function main() {
  let gany = await allsongs()
  console.log(gany);

  let songul = document.querySelector(".songsname").getElementsByTagName("ul")[0]
  for (const song of gany) {
    songul.innerHTML = songul.innerHTML + `
    <li class="songlist flex spb"><img class="invert" src="music.svg" alt="music">
    <div class="s1">${song.replaceAll("%20", " ")}</div>
    <div><img class="invert play1" src="icons8-play-50.png" alt="play">
    </div>
</li>`;

    Array.from(songul.getElementsByTagName("li")).forEach(e => {
      // console.log(e);
      e.addEventListener("click", () => {
        console.log(e.querySelector(".s1").innerHTML)
        playgany(e.querySelector(".s1").innerHTML.trim())
      })
    })
  }

  var audio = new Audio(song[0]);
  // audio.play();

  audio.addEventListener("loadeddata", () => {
    let duration = audio.duration;

    console.log(duration);

  })

  play2.addEventListener("click", () => {
    if (newsong.paused) {
      newsong.play();
      play2.src = "pause.png";
    }
    else {
      newsong.pause();
      play2.src = "icons8-play-50.png";

    }
  })

document.querySelector(".next").addEventListener("click", play_next_song);  
document.querySelector(".previous").addEventListener("click", play_previous_song);  


  

}

main(); 

// let a = 5;           a starts from 1;                 if divisor is larger than dividend the the output is divisor;
// let b = [2,3,4,5,6];
// let c = (a + 1) % b.length;
// console.log(c);
