import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Metadata from '../layout/Metadata'
import Spinner from '../loader/Spinner'
import "./Profile.css"

const Profile = ({history}) => {

    const { user, loading, isAuthenticated } = useSelector(state => state.user)

    useEffect(() => {
        if(isAuthenticated === false){
            history.push("/login")
        }

    }, [user, loading, isAuthenticated, history])


    return (
        (loading ? <Spinner /> : <>
            <Metadata title={`${user.name}'s Profile`} />
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src={user.profilePic.url} alt={user.name} />
                    <Link to="me/update" >Edit Profile</Link>
                </div>
                <div>
                    <div>
                        <h4>Full name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>Joined on</h4>
                        <p>{String(user.createdAt).substr(0, 10)}</p>
                    </div>
                    <div>
                        <Link to="/orders">My orders</Link>
                        <Link to="/password/update">Change password</Link>
                    </div>
                </div>
            </div>
        </>)
    )
}

export default Profile