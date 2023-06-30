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
        this.soundLevel = () => {
            this.audio.volume = +volume.value;
        };
        this.audio = new Audio(`../assets/sounds/${audio}.mp3`);
        this.pictureBg = pictureBg;
        this.audioImage = document.querySelector(`#${audio}`);
        this.audioImageSrc = this.audioImage.src;
        this.audioStatePlay = false;
        this.sound();
    }
    sound() {
        this.audio.volume = +volume.value;
        volume.addEventListener('input', this.soundLevel);
    }
    stop() {
        this.audio.pause();
        this.audioStatePlay = false;
        this.audioImage.src = this.audioImageSrc;
    }
    toogle() {
        if (!this.audioStatePlay) {
            this.audio.play();
            this.audioStatePlay = true;
            this.audioImage.src = pauseSvg;
            backgroundImage.style.backgroundImage = `url(${this.pictureBg})`;
        }
        else {
            this.stop();
        }
    }
}
const winterAudio = new AudioWeather('winter', winterBG);
const summerAudio = new AudioWeather('summer', summerBG);
const rainAudio = new AudioWeather('rain', rainBG);
soundsConainer.addEventListener('click', (event) => {
    const target = event.target;
    const id = target.dataset.id;
    switch (id) {
        case 'summer':
            summerAudio.toogle();
            winterAudio.stop();
            rainAudio.stop();
            break;
        case 'winter':
            summerAudio.stop();
            winterAudio.toogle();
            rainAudio.stop();
            break;
        case 'rain':
            summerAudio.stop();
            winterAudio.stop();
            rainAudio.toogle();
            break;
    }
});