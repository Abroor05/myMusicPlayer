const clock = document.querySelector("#clock")
const play = document.querySelector(".play")
const cover = document.querySelector(".cover")
const audio = document.querySelector("audio")
const playBtn = document.querySelector(".playBtn")
const body = document.querySelector("body")
const next = document.querySelector(".next")
const back = document.querySelector(".back")
const songTitle = document.querySelector(".songTitle")



function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    clock.innerText = `${hours}:${minutes}`;
  }

  updateClock(); 
  setInterval(updateClock, 60000);

  var musics = ["flowers", "my_love", "weather", "with_smail"];

  var index = 0

  const changeMusic = ()=>{
    cover.setAttribute("src", `./img/${musics[index]}.jpg`)
    audio.setAttribute("src", `./audio/${musics[index]}.m4a`)
    songTitle.textContent = musics[index]
  }

  changeMusic()


  playBtn.addEventListener("click", ()=>{
    body.classList.toggle("played")
    if(body.classList.contains("played")) {
      audio.play()
    } else{
      audio.pause() 
    }
  })

  next.addEventListener("click", ()=>{
    if(musics.length-1 > index) {
      index++
    } else if(index > 0){
      index = 0
    }
    changeMusic()
    if(body.classList.contains("played")) {
      audio.play();
    } else {
      audio.pause();
    }
  })


  back.addEventListener("click", ()=>{
    if(index > 0) {
      index--
    } else{
      index = musics.length-1
    }
    changeMusic()
    if(body.classList.contains("played")) {
      audio.play();
    } else {
      audio.pause();
    }
  })


  audio.addEventListener("ended", () => {
    if(index < musics.length - 1) {
      index++;
    } else {
      index = 0;
    }
    changeMusic();
    audio.play();
  });
  