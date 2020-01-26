import React from 'react';
import axios from 'axios';


class UpdateMapForm extends React.Component {
    constructor(props) {
        super(props)
        this.saveMap = this.saveMap.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(kind) {
        return e => this.setState({
            [kind]: e.currentTarget.value
        })
    }



    saveMap(e) {
        e.preventDefault();
        const map = {
            user: this.props.currentUser.id,
            title: this.props.title,
            url: this.props.url,
            objects: {
                rockCount: this.props.rockCount,
                foodCount: this.props.foodCount,
                foods: this.props.foods,
                rocks: this.props.rocks,
                houses: this.props.houses
            }
        }
        debugger;
        axios.put(`/api/maps/${this.props.mapId}`, map)
    }
    render () {
        return (
        <form className={`topnav-dropdown ${this.props.saveMapForm}`} onSubmit={this.saveMap}>
            <label className="topnav-dropdown-item">Title
                <input type="text" name="title" onChange={this.handleInput('title')} value={this.props.title}></input>
            </label>
            <label className="topnav-dropdown-item">URL
                <input type="text" name="url" onChange={this.handleInput('url')} value={this.props.url}></input>
            </label>
            <button type="submit">Update</button>
        </form>
        )

    }

}

export default UpdateMapForm