import React from "react"
import { Link } from 'react-router-dom'
import axios from 'axios';
import './profile.scss';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            maps: null
        }
    }

    componentDidMount () {
        console.log('hi')
        axios.get('/api/maps/')
        .then(maps => 
            
        {
            console.log(maps)
            this.setState({
                maps: maps.data
            })
        }
        )
    }

    render() {
        if (!this.state.maps) return null;
        return (
            <div className="profile">
                <div>
                    <h1 className="testingthis">HEIPWJDOUIQWNDXCKJWHNBDKJWNBDLK2wjn</h1>
                <ul>
                    {
                        this.state.maps.map(map => <Link to={`/map/${map._id}`}>{map.title}</Link>)
                    }
                </ul>
                </div>
            </div>


        )
    }
}

export default Profile