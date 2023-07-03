const backgroundImage = <HTMLElement>document.querySelector('.container')
const volume= <HTMLInputElement>document.querySelector('#customRange2')
const soundsConainer = <HTMLElement>document.querySelector('.row')

const pauseSvg: string = '../assets/icons/pause.svg'
const summerBG: string = '../assets/summer-bg.jpg'
const winterBG: string = '../assets/winter-bg.jpg'
const rainBG: string = '../assets/rainy-bg.jpg'

class AudioWeather{
    audioName: string
    audio: HTMLAudioElement
    pictureBg: string
    audioImage: HTMLImageElement
    audioImageSrc: string
    audioState: boolean

    constructor(audio: string, pictureBg: string){
        this.audioName = audio
        this.audio = new Audio(`../assets/sounds/${audio}.mp3`)
        this.pictureBg = pictureBg
        this.audioImage = <HTMLImageElement>document.querySelector(`#${audio}`)
        this.audioImageSrc = this.audioImage.src
        this.audioState = false
        this.soundPlay()
    }
    soundPlay(): void {
        this.audio.volume = +volume.value
        volume.addEventListener('input', this.soundLevel)
        soundsConainer.addEventListener('click', this.toogle)
    }
    toogle=(event: Event): void =>{
        const target = event.target as HTMLElement
        const id = target.dataset.id
        if(id===this.audioName&&!this.audioState){
            this.audio.play()
            this.audio.loop=true
            this.audioState=true
            this.audioImage.src = pauseSvg
            backgroundImage.style.backgroundImage=`url(${this.pictureBg})`
        }else{
            this.audio.pause()
            this.audioState=false
            this.audioImage.src = this.audioImageSrc
        }
    }
    soundLevel=():void=>{
        this.audio.volume  = +volume.value
    }
}
const winterAudio = new AudioWeather('winter', winterBG)
const summerAudio = new AudioWeather('summer', summerBG)
const rainAudio = new AudioWeather('rain', rainBG)

