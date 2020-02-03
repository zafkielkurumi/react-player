import React from 'react';
import './volume.scss';
import PropTypes from 'prop-types';
import { dragHandle } from '../../drag_handle';

export class Volume extends React.Component {
    // todo audio 属于volume
    static propTypes = {
        audio: PropTypes.element
    }
    constructor(props) {
        super(props);
        this.state = {
            transform: 'translate3d(0px , -90px, 1px)',
            currentVol: 90,
            volControl: false
        }
    }

    volItem = React.createRef();

    componentDidMount() {
        dragHandle(this.volItem.current, this.onMouseMove);
    }

    onMouseDown = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    // vol拖动
    onMouseMove = (pos) => {
        if (this.props.audio) {
            const y = Math.abs(pos.y);
            const volPercent = y / 90;
            this.setState({
                transform: `translate3d(0px , ${pos.y}px, 1px)`,
                currentVol: `${y}px`
            })
            this.props.audio.volume = volPercent;
        }

    }

    volControlClick = () => {
        this.setState({ volControl: !this.state.volControl })
    }

    render() {
        const state = this.state;
        return (
            <div className="vol">
                <div onClick={this.volControlClick} className='vol-controller'></div>
                <div style={{ visibility: state.volControl ? 'visible' : 'hidden' }} className='vol-progress-bg'>
                    <div className="vol-inside">
                        <div style={{ height: state.currentVol }} className="vol-current"></div>
                        <span onMouseDown={this.onMouseDown} style={{ transform: state.transform }} ref={this.volItem} className="vol-item"></span>
                    </div>


                </div>
            </div>
        )
    }
}