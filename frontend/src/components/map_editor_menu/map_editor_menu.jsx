import React from 'react'
import './map_editor_menu.scss';

class MapEditorMenu extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          flip: '',
          title: '',
          url: ''
        }
    }
    handleUpdate(field) {
      return e => this.setState({
          [field]: e.currentTarget.value

      })
    }
    render () {
        return (
            <div className="map-editor-menu">
            <form onSubmit={this.props.handleSave(this.state.title, this.state.background)}>
              <section className="map-editor-typed-fields">
                <div className="map-editor-menu-item">
                  <label>Title<br/></label>
                    <input onChange={this.handleUpdate('title')} name="title" type="text" placeholder="Type title here ..." value={this.state.title}/>
                </div>
                <div className="map-editor-menu-item">
                  <label>Background</label><br/>
                  <input onChange={this.handleUpdate('url')} name="url" type="text" placeholder="Type image url here ..." value={this.state.url}/>
                </div>
              </section>
              <fieldset className="map-editor-menu-set">
                <div className="map-editor-menu-caption">
                  <hr/><label>Map Items</label><hr/>
                </div>
                <div className="map-editor-menu-item">
                  <div className="map-editor-menu-item-wrapper">
                      <span onClick={()=>this.props.handleClickEffect('obstacle')}>Obstacle</span>
                  </div>
                </div>
                <div className="map-editor-menu-item">
                  <div className="map-editor-menu-item-wrapper">
                      <span onClick={()=>this.props.handleClickEffect('food')}>Food</span>
                  </div>
                </div>
                <div className="map-editor-menu-item">
                  <div className="map-editor-menu-item-wrapper">
                      <span onClick={()=>this.props.handleClickEffect('house')}>Spawn</span>
                  </div>
                </div>
                <div className="map-editor-menu-item">
                  <div className="map-editor-menu-item-wrapper">
                      <span onClick={()=>this.props.handleClickEffect('remove')}>Eraser</span>
                  </div>
                </div>
              </fieldset>
              <div className="map-editor-menu-save-wrapper">
                <button type="submit" value="Save">Save</button>
              </div>
            </form>
          </div>
        )
    }
}

export default MapEditorMenu