import React from 'react';
import TopNav from '../top_nav/top_nav';
import Canvas from '../canvas/canvas';
import './map_editor.scss'

class MapEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickEffect: 'obstacle',
            hidden: 'hidden'
        }
        this.handleClickEffect = this.handleClickEffect.bind(this);
        this.handleOverlap = this.handleOverlap.bind(this);
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

    handleOverlap() {
      this.setState({
        hidden: 'fadein'
      })
      setTimeout(()=>this.setState({
        hidden: 'fadeout'
      }), 2000)
    }

    render () {
        return (
            <div className="map-editor">
                <TopNav clickEffect={this.state.clickEffect} handleClickEffect={this.handleClickEffect}/>
                <Canvas clickEffect={this.state.clickEffect} handleClickEffect={this.handleClickEffect} handleOverlap={this.handleOverlap}/>
                <div className={`overlap ${this.state.hidden}`}>
                  <span>Cannot place object on starting position</span>
                </div>
            </div>
        )

    }
}

export default MapEditor;