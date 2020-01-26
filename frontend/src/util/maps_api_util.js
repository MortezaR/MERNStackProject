import axios from 'axios';

export const fetchAllMaps = () => {
    return axios.get('/api/maps/')
};

export const fetchUserMaps = userId => {
    return axios.get(`/api/maps/user/${userId}`)
};

export const fetchMap = (mapId) => {
    return axios.get(`/api/maps/${this.props.mapId}`)
};

