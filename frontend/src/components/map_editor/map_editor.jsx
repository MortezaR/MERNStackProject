import React from 'react';
import TopNav from '../top_nav/top_nav';
import CanvasContainer from '../canvas/canvas_container.js';
import './map_editor.scss'

class MapEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickEffect: 'obstacle',
            
        }
        
        
    }

    componentDidMount () {

    }





    render () {
        return (
            <div className="map-editor">
                
                <CanvasContainer />

            </div>
        )

    }
}

export default MapEditor;