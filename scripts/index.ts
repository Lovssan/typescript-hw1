const backgroundImage = <HTMLElement>document.querySelector('.container')
const volume= <HTMLInputElement>document.querySelector('#customRange2')
const soundsConainer = <HTMLElement>document.querySelector('.row')

const pauseSvg = '../assets/icons/pause.svg'
const summerBG = '../assets/summer-bg.jpg'
const winterBG = '../assets/winter-bg.jpg'
const rainBG = '../assets/rainy-bg.jpg'
console.log('awd');


class AudioWeather{
    audio: HTMLAudioElement
    pictureBg: string
    audioImage: HTMLImageElement
    audioImageSrc: string
    audioStatePlay: boolean

    constructor(audio: string, pictureBg: string){
        this.audio = new Audio(`../assets/sounds/${audio}.mp3`)
        this.pictureBg = pictureBg
        this.audioImage = <HTMLImageElement>document.querySelector(`#${audio}`)
        this.audioImageSrc = this.audioImage.src
        this.audioStatePlay = false
        this.sound()
    }
    sound(): void {
        this.audio.volume = +volume.value
        volume.addEventListener('input', this.soundLevel)
    }
    stop(): void {
        this.audio.pause()
        this.audioStatePlay = false
        this.audioImage.src = this.audioImageSrc
    }
    toogle(): void {
        if(!this.audioStatePlay){
            this.audio.play()
            this.audioStatePlay = true
            this.audioImage.src = pauseSvg
            backgroundImage.style.backgroundImage=`url(${this.pictureBg})`
        }else{
            this.stop()
        }
    }
    soundLevel=():void=>{
        this.audio.volume  = +volume.value
    }
}
const winterAudio = new AudioWeather('winter', winterBG)
const summerAudio = new AudioWeather('summer', summerBG)
const rainAudio = new AudioWeather('rain', rainBG)

soundsConainer.addEventListener('click', (event: Event)=>{
    const target = event.target as HTMLElement
    const id = target.dataset.id
    switch (id) {
        case 'summer':
            summerAudio.toogle()
            winterAudio.stop()
            rainAudio.stop()
            break;
        case 'winter':
            summerAudio.stop()
            winterAudio.toogle()
            rainAudio.stop()
            break;
        case 'rain':
            summerAudio.stop()
            winterAudio.stop()
            rainAudio.toogle()
            break;
    }
})