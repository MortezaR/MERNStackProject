import React from 'react';
import TopNav from '../top_nav/top_nav';
import Canvas from '../canvas/canvas';

class MapEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickEffect: 'obstacle'
        }
        this.handleClickEffect = this.handleClickEffect.bind(this);
    }

    componentDidMount () {
        const doKeyDown = (e) => {
            console.log(e.keyCode)
            switch(e.keyCode) {
              case 82: 
                this.setState({
                  clickEffect: 'remove'
                })
                break;
              case 79:
                this.setState({
                  clickEffect: 'obstacle'
                })
                break;
              case 84:
                this.setState({
                  clickEffect: 'food'
                })
                break;
              case 72:
                this.setState({
                  clickEffect: 'house'
                })
                break;
              default:
                return null;
            }
  
        }
        window.addEventListener( "keydown", doKeyDown, true);
    }

    handleClickEffect(clickEffect) {
        this.setState({
            clickEffect: clickEffect
        })
    }

    render () {
        return (
            <div className="map-editor">
                <TopNav clickEffect={this.state.clickEffect} handleClickEffect={this.handleClickEffect}/>
                <Canvas clickEffect={this.state.clickEffect} handleClickEffect={this.handleClickEffect}/>
            </div>
        )

    }
}

export default MapEditor;