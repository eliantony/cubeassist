import React from 'react';

export default class PlayNotification extends React.Component {
    constructor(props) {
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
        
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const  audioContext = new AudioContext();
        this.setState({audioContext: audioContext})
        const audioElement = document.querySelector('#' + this.state.id);

        this.setState({audioElement:audioElement})
        this.state.onMount({ audioElement : audioElement, id: this.state.id} )
    }

    render() {
        return <audio id={this.state.id} src={this.state.sound}></audio>;
    }
}

