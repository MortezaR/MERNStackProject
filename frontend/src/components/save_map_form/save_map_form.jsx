import React from 'react';
import axios from 'axios';


class SaveMapForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            url: this.props.url,
        }
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
            title: this.state.title,
            url: this.state.url,
            objects: {
                rockCount: this.props.rockCount,
                foodCount: this.props.foodCount,
                foods: this.props.foods,
                rocks: this.props.rocks,
                houses: this.props.houses
            }
        }
        axios.post('/api/maps/', map)
    }

    render () {
        return (
        <form className={`topnav-dropdown ${this.props.saveMapForm}`} onSubmit={this.saveMap}>
            <label className="topnav-dropdown-item">Title
                <input type="text" name="title" onChange={this.handleInput('title')} value={this.state.title}/>
            </label>
            <label className="topnav-dropdown-item">URL
                <input type="text" name="url" onChange={this.handleInput('url')} value={this.state.url} />
            </label>
            <button type="submit">Save</button>
        </form>
        )

    }

}

export default SaveMapForm