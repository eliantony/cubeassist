import React from 'react';

export default class PlayNotification extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.audio = new Audio('cubeassist/audio/beep.wav')
        this.audio.load()
        this.playAudio()
    }

    playAudio() {
        const audioPromise = this.audio.play()
        if (audioPromise !== undefined) {
            audioPromise
                .then(_ => {
                    // autoplay started
                    console.log("test")
                })
                .catch(err => {
                    // catch dom exception
                    console.info(err)
                })
        }
    }

    render() {
        return "";
    }

}

