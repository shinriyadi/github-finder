import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
    const githubContext = useContext(GithubContext);

    const { getUser, loading, user } = githubContext;

    useEffect(() => {
        getUser(match.params.login);
        // eslint-disable-next-line
    }, []);

    const {
        name,
        avatar_url,
        location,
        bio,
        login,
        html_url,
        blog,
        followers,
        public_repos,
        hireable
    } = user;

    if (loading) return <Spinner />

    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>
                Back Search
                </Link>
            Hireable: {' '}
            {hireable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}

            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className='round-img' style={{ width: '150px' }} alt="" />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {
                        bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                        )
                    }
                    <a href={html_url} className='btn btn-dark my-1'>
                        Visit Github Profile
                        </a>
                    <ul>
                        <li>
                            {
                                login &&
                                <Fragment>
                                    <strong>Username: {login}</strong>
                                </Fragment>
                            }
                        </li>
                        <li>
                            {
                                blog &&
                                <Fragment>
                                    <strong>Blog: {blog}</strong>
                                </Fragment>
                            }
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">
                    Followes: {followers}
                </div>
                <div className="badge badge-success">
                    Public Repos: {public_repos}
                </div>
            </div>
        </Fragment>
    )
}

export default User
