import React from "react"
import { Link } from 'react-router-dom'
import axios from 'axios';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            maps: null
        }
    }

    componentDidMount () {
        axios.get('/api/maps/')
        .then(maps => this.setState({
            maps: maps.data
        }))
    }

    render() {
        console.log(this.state.maps)
        if (!this.state.maps) return null;
        return (
            <ul>
                {
                    this.state.maps.map(map => <Link to={`/map/${map._id}`}>{map.title}</Link>)
                }
            </ul>
        )
    }
}

export default Profile