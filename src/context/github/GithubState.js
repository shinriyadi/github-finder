import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER
} from '../types';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // search users
    const searchUsers = async text => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}`
        );

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
    }

    // get user
    const getUser = async username => {
        setLoading()

        const res = await axios.get(
            `https://api.github.com/users/${username}?`
        );

        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }

    // clear users
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    // set loading
    const setLoading = () => dispatch({ type: SET_LOADING })

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser
        }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState