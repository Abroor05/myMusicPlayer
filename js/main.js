const clock = document.querySelector("#clock");
const play = document.querySelector(".play");
const cover = document.querySelector(".cover");
const audio = document.querySelector("audio");
const playBtn = document.querySelector(".playBtn");
const body = document.querySelector("body");
const next = document.querySelector(".next");
const back = document.querySelector(".back");
const songTitle = document.querySelector(".songTitle");
const startTime = document.querySelector(".startTime");
const endTime = document.querySelector(".endTime");
const lengths = document.querySelector(".lengths");
const length = document.querySelector(".length");
const volume = document.querySelector(".volume");
const shufle = document.querySelector(".shuffle");
const again = document.querySelector(".again");
const musicList = document.querySelector(".musicList")
const bars = document.querySelector(".bars")
const modal = document.querySelector(".modal")
const cress = document.querySelector(".cress")


var isShuffle = false;
var isAgain = false;

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  clock.innerText = `${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 60000);

var musics = ["flowers", "my_love", "weather", "with_smail"];

var index = 0;

const changeMusic = () => {
  cover.setAttribute("src", `./img/${musics[index]}.jpg`);
  audio.setAttribute("src", `./audio/${musics[index]}.m4a`);
  songTitle.textContent = musics[index];
};

changeMusic();

playBtn.addEventListener("click", () => {
  body.classList.toggle("played");
  if (body.classList.contains("played")) {
    audio.play();
  } else {
    audio.pause();
  }
});

next.addEventListener("click", () => {
  if (isShuffle) {
    index = Math.floor(Math.random() * musics.length);
    changeMusic();
    if (body.classList.contains("played")) {
      audio.play();
    } else {
      audio.pause();
    }
  } else {
    if (musics.length - 1 > index) {
      index++;
    } else if (index > 0) {
      index = 0;
    }
    changeMusic();
    if (body.classList.contains("played")) {
      audio.play();
    } else {
      audio.pause();
    }
  }
});

back.addEventListener("click", () => {
  if (index > 0) {
    index--;
  } else {
    index = musics.length - 1;
  }
  changeMusic();
  if (body.classList.contains("played")) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("ended", () => {
  if (isAgain) {
    changeMusic();
    audio.play();
  } else {
    if (index < musics.length - 1) {
      index++;
    } else {
      index = 0;
    }
    changeMusic();
    audio.play();
  }
});

changeForm = (time) => {
  var minut =
    Math.floor(time / 60) < 10
      ? "0" + Math.floor(time / 60)
      : Math.floor(time / 60);

  var secund =
    Math.floor(time % 60) < 10
      ? "0" + Math.floor(time % 60)
      : Math.floor(time % 60);

  if (isNaN(minut)) {
    return `00:00`;
  } else {
    return `${minut} : ${secund}`;
  }
};

const progres = (e) => {
  var currentTime = e.srcElement.currentTime;
  var duration = e.srcElement.duration;

  startTime.textContent = changeForm(currentTime);
  endTime.textContent = changeForm(duration);

  var a = (currentTime * 100) / duration;

  length.style.width = `${a}%`;
};

const setProgress = (e) => {
  console.log(e.offsetX);
  console.log(lengths.clientWidth);

  audio.currentTime = (e.offsetX * audio.duration) / lengths.clientWidth;
};

volume.addEventListener("input", () => {
  audio.volume = volume.value / 100;
});

lengths.addEventListener("click", setProgress);

audio.addEventListener("timeupdate", progres);

again.addEventListener("click", () => {
  isAgain = !isAgain;

  again.classList.toggle("active");
});

shufle.addEventListener("click", () => {
  isShuffle = !isShuffle;

  shufle.classList.toggle("active");
});


musics.forEach((item, i)=> {


  musicList.innerHTML += `
   <li onclick="selectMusic(${i})" >${item}</li>
  `
})

const selectMusic = (id)=>{
  index = id
  changeMusic()
  body.classList.add("played")
  audio.play()
}

bars.addEventListener("click", ()=> {
  modal.classList.add("active")
})

cress.addEventListener("click", ()=> {
  modal.classList.remove("active")
})













document.addEventListener("keypress", (e)=> {

if(e.code == "Space") {
  body.classList.toggle("played");
  if (body.classList.contains("played")) {
    audio.play();
  } else {
    audio.pause();
  }
}

if(e.key == "w") {
  if (isShuffle) {
    index = Math.floor(Math.random() * musics.length);
    changeMusic();
    if (body.classList.contains("played")) {
      audio.play();
    } else {
      audio.pause();
    }
  } else {
    if (musics.length - 1 > index) {
      index++;
    } else if (index > 0) {
      index = 0;
    }
    changeMusic();
    if (body.classList.contains("played")) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}

if(e.key == "s") {
  if (index > 0) {
    index--;
  } else {
    index = musics.length - 1;
  }
  changeMusic();
  if (body.classList.contains("played")) {
    audio.play();
  } else {
    audio.pause();
  }
}


})

