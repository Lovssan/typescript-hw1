"use strict";
const backgroundImage = document.querySelector('.container');
const volume = document.querySelector('#customRange2');
const soundsConainer = document.querySelector('.row');
const pauseSvg = '../assets/icons/pause.svg';
const summerBG = '../assets/summer-bg.jpg';
const winterBG = '../assets/winter-bg.jpg';
const rainBG = '../assets/rainy-bg.jpg';
class AudioWeather {
    constructor(audio, pictureBg) {
        this.toogle = (event) => {
            const target = event.target;
            const id = target.dataset.id;
            if (id === this.audioName && !this.audioState) {
                this.audio.play();
                this.audio.loop = true;
                this.audioState = true;
                this.audioImage.src = pauseSvg;
                backgroundImage.style.backgroundImage = `url(${this.pictureBg})`;
            }
            else {
                this.audio.pause();
                this.audioState = false;
                this.audioImage.src = this.audioImageSrc;
            }
        };
        this.soundLevel = () => {
            this.audio.volume = +volume.value;
        };
        this.audioName = audio;
        this.audio = new Audio(`../assets/sounds/${audio}.mp3`);
        this.pictureBg = pictureBg;
        this.audioImage = document.querySelector(`#${audio}`);
        this.audioImageSrc = this.audioImage.src;
        this.audioState = false;
        this.soundPlay();
    }
    soundPlay() {
        this.audio.volume = +volume.value;
        volume.addEventListener('input', this.soundLevel);
        soundsConainer.addEventListener('click', this.toogle);
    }
}
const winterAudio = new AudioWeather('winter', winterBG);
const summerAudio = new AudioWeather('summer', summerBG);
const rainAudio = new AudioWeather('rain', rainBG);
