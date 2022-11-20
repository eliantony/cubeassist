import React from 'react';

export default class CountDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.duration ? props.duration : 5,
            onTick : props.onTick

        }
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            let { count } = this.state;
            this.setState({
                count: count - 1
            })
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.count !== this.state.count && this.state.count === 0) {
            clearInterval(this.timer);
            if (this.props.onTimesup) {
                this.props.onTimesup();
            }
        }
    }

    fmtMSS(s) { 
        this.props.onTick(s);
        return s;
     }


    render() {
        let { count } = this.state;
        return (
            <div className='time-control'>
                <span className="Time">{this.fmtMSS(count)}</span>
                <span className='timer-second-unit'>s</span>
            </div>
        )
    }
}

