import React from "react"
import { Link } from 'react-router-dom'
import axios from 'axios';
import './profile.scss'
import MapLink from './map-link';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allMaps: null,
            thisUser: null,
            userMaps: 'no maps',
        }
        this.deleteMap = this.deleteMap.bind(this);
    }

    componentDidMount () {
        axios.get(`/api/users/${this.props.currentUser.id}`)
            .then(user => this.setState({
                thisUser: user.data
            }))
        axios.get(`/api/maps/user/${this.props.currentUser.id}`)
            .then(maps => this.setState({
                userMaps: maps.data
            }))
    }

    deleteMap(mapId) {
        return (() =>
        axios.delete(`/api/maps/${mapId}`).then( () =>
            axios.get(`/api/maps/user/${this.props.currentUser.id}`)
            .then(maps => this.setState({
                userMaps: maps.data
            }))
        )
        )
    }

    render() {
        // console.log(this.state.userMaps);
        if (!this.state.thisUser || this.state.userMaps === 'no maps') return null;
        return (
            <div className="profile-page">
                <div className="profile-card">
                    <div className="title-row">
                        <div className="profile-name">{this.props.currentUser.username}</div>
                        <div className="profile-wins">Wins: {this.state.thisUser.wins}</div>
                    </div>
                        <ul className="maps-list">
                            {
                                this.state.userMaps.map((map, idx) =>
                                {return <MapLink map={map} deleteMap={this.deleteMap} className={"map-link-"+(idx % 2 ? 'e' : 'o')} key={idx}/>
                                })
                                // <Link to={`/map/${map._id}`} key={idx} className={"map-link-"+(idx % 2 ? 'e' : 'o')}>{map.title}</Link>)
                            }
                        </ul>
                </div>
            </div>
        )
    }
}

export default Profile