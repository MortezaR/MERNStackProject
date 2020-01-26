import * as MapUtil from '../util/map_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_ALL_MAPS = "RECEIVE_ALL_MAPS";
export const RECEIVE_ALL_USER_MAPS = "RECEIVE_ALL_USER_MAPS";
export const RECEIVE_MAP = "RECEIVE_MAP";


//Sync
export const receiveAllMaps = maps => ({
    type: RECEIVE_ALL_MAPS,
    maps
})

export const receiveMap = map => ({
    type: RECEIVE_MAP,
    map
})


//Async
export const fetchAllMaps = () => dispatch => (
    MapUtil.fetchAllMaps()
        .then(maps => (dispatch(receiveAllMaps(maps))))
)

export const fetchUserMaps = (userId) => dispatch => (
    MapUtil.fetchUserMaps()
        .then(maps => (dispatch(receiveAllMaps(maps))))
)

export const fetchMap = (mapId) => dispatch => (
    MapUtil.fetchMap(mapId)
        .then(map => (dispatch(receiveMap(map))))
)
