// Initialize the Variables
let songIndex = 0;
let pastIndex = 0;
let audioElement = new Audio('music/music-1.mp3');
let audioElement1 = new Audio('music/music-1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Music-1", filePath: "music/music-0.mp3", coverPath: "images/music-0.jpg", timestamp: "03:18"},
    {songName: "Music-2", filePath: "music/music-1.mp3", coverPath: "images/music-1.jpg", timestamp: "02:30"},
    {songName: "Music-3", filePath: "music/music-2.mp3", coverPath: "images/music-2.jpg", timestamp: "03:08"},
    {songName: "Music-4", filePath: "music/music-3.mp3", coverPath: "images/music-3.jpg", timestamp: "04:02"},
    {songName: "Music-5", filePath: "smusic/music-4.mp3", coverPath: "images/music-4.jpg", timestamp: "03:46"},
    {songName: "Music-6", filePath: "music/music-5.mp3", coverPath: "images/music-5.jpg", timestamp: "03:39"},
    {songName: "Music-7", filePath: "music/music-6.mp3", coverPath: "images/music-6.jpg", timestamp: "04:06"},
    {songName: "Music-8", filePath: "music/music-7.mp3", coverPath: "images/music-7.jpg", timestamp: "00:26"},
    {songName: "Music-9", filePath: "music/music-8.mp3", coverPath: "images/music-8.jpg", timestamp: "00:26"},
    {songName: "Music-10", filePath: "music/music-9.mp3", coverPath: "images/music-9.jpg", timestamp: "03:18"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
 

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        
    })
}
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        let song_ = document.getElementById(`${songIndex}`);
        audioElement.play();
        document.getElementById("bdy").style.background='url(images/music-'+songIndex+'.jpg)';
        document.getElementById("bdy").style.backgroundSize='cover';
        song_.classList.remove('fa-play-circle');
        song_.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        
    }
    else{
        audioElement.pause();
        makeAllPlays();
        
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    console.log(parseFloat(audioElement.duration)); 
    
    myProgressBar.value = progress;
    // document.getElementsByClassName("timestamp")[0].innerText= parseInt(parseFloat(audioElement.currentTime)); 
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
       
        audioElement1.src = `music/music-${songIndex}.mp3`;
        if(songIndex==pastIndex && !audioElement.paused){
            console.log(pastIndex);
            console.log(songIndex);
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
        else{
            audioElement.src = `music/music-${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            audioElement.play();
            gif.style.opacity = 1;
            pastIndex=songIndex;
            console.log("coverpath");
           
            document.getElementById("bdy").style.background='url(images/music-'+songIndex+'.jpg)';
            document.getElementById("bdy").style.backgroundSize='cover';
        }

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    makeAllPlays();
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    let song_ = document.getElementById(`${songIndex}`);
   
    audioElement.src = `music/music-${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    document.getElementById("bdy").style.background='url(images/music-'+songIndex+'.jpg)';
    document.getElementById("bdy").style.backgroundSize='cover';
    audioElement.currentTime = 0;
    audioElement.play();
    song_.classList.remove('fa-play-circle');
    song_.classList.add('fa-pause-circle');
    pastIndex=songIndex;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    makeAllPlays();
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `music/music-${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    let song_ = document.getElementById(`${songIndex}`);
    document.getElementById("bdy").style.background='url(images/music-'+songIndex+'.jpg)';
    document.getElementById("bdy").style.backgroundSize='cover';
    pastIndex=songIndex;
    audioElement.play();
    song_.classList.remove('fa-play-circle');
    song_.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})