import React from 'react';

export default class PlayNotification extends React.Component {
    constructor(props) {
        console.log("Constructor")
        super(props);
        this.state = {
            sound: props.sound,
            id: props.id,
            audioContext: null,
            audioElement: null,
            onMount: props.onMount
        }
    }

    componentDidMount() {
        // this.audio = new Audio(this.state.sound);
        // this.audio.load();
        // this.playAudio();
        console.log("Hiiiiii")
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const  audioContext = new AudioContext();
        this.setState({audioContext: audioContext})
        const audioElement = document.querySelector('#' + this.state.id);
        console.log(audioElement);

        this.setState({audioElement:audioElement})
        // const track = audioContext.createMediaElementSource(audioElement);
        // track.connect(audioContext.destination);
        this.state.onMount({ audioElement : audioElement, id: this.state.id} )
    }

    render() {
        return <audio id={this.state.id} src={this.state.sound}></audio>;
    }
}

