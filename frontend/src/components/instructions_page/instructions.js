import React from 'react';
import './instructions.scss';

class Instructions extends React.Component {
    constructor(props) {
        super(props)
        this.piglet = new Image();
        this.piglet.src = 'https://i.imgur.com/f0z68qE.png';

    }

    render() {
        return (
            <div className="instructions-page">
                Ins
                <img src='https://i.imgur.com/f0z68qE.png'></img>
                <img src={this.piglet.src}></img>
            </div>
        )
    }
}

export default Instructions