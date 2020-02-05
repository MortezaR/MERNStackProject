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
    componentDidMount () {
      setTimeout(() => {
        this.setState({
          title: this.props.title,
          url: this.props.url
        })
      }, 500);
    }
    handleUpdate(field) {
      return e => this.setState({
          [field]: e.currentTarget.value
      })
    }
    render () {
        return (
            <div className="map-editor-menu">
            <form onSubmit={this.props.handleSave(this.state.title)}>
              <section className="map-editor-typed-fields">
                <div className="map-editor-menu-item">
                  <label>Title<br/></label>
                    <input onChange={this.handleUpdate('title')} name="title" type="text" placeholder="Type title here ..." value={this.state.title}/>
                </div>
              </section>
              <fieldset className="map-editor-menu-set">
                <div className="map-editor-menu-caption">
                  <hr/><label>Map Items</label><hr/>
                </div>
                <div className="map-editor-menu-item" onClick={()=>this.props.handleClickEffect('obstacle')}>
                  <div className="map-editor-menu-item-wrapper">
                      <span>Obstacle</span>
                  </div>
                </div>
                <div className="map-editor-menu-item" onClick={()=>this.props.handleClickEffect('food')}>
                  <div className="map-editor-menu-item-wrapper">
                      <span>Food</span>
                  </div>
                </div>
                <div className="map-editor-menu-item" onClick={()=>this.props.handleClickEffect('teleporter')}>
                  <div className="map-editor-menu-item-wrapper">
                      <span>Teleporter</span>
                  </div>
                </div>
                <div className="map-editor-menu-item" onClick={()=>this.props.handleClickEffect('hTerminal')}>
                  <div className="map-editor-menu-item-wrapper">
                      <span>Terminal</span>
                  </div>
                </div>
                <div className="map-editor-menu-item" onClick={()=>this.props.handleClickEffect('deposit')}>
                  <div className="map-editor-menu-item-wrapper">
                      <span>Deposit</span>
                  </div>
                </div>
                <div className="map-editor-menu-item" onClick={()=>this.props.handleClickEffect('house')}>
                  <div className="map-editor-menu-item-wrapper">
                      <span>Spawn</span>
                  </div>
                </div>
                <div className="map-editor-menu-item" onClick={()=>this.props.handleClickEffect('remove')}>
                  <div className="map-editor-menu-item-wrapper">
                      <span>Eraser</span>
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