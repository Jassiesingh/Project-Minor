import React, { useState, useEffect } from 'react'
import "./UpdatePassword.css"
import Spinner from '../loader/Spinner'
import LockOpenIcon from "@material-ui/icons/LockOpen"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import LockIcon from "@material-ui/icons/Lock"
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, updatePassword } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import Metadata from "../layout/Metadata"

const UpdatePassword = ({ history, location }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);


        dispatch(updatePassword(myForm));
    };

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile updated")
            history.push("/account")
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })

        }
    }, [dispatch, error, alert, history, isUpdated, redirect]);

    return (
        (loading ? <Spinner /> : <>
            <Metadata title="Change password" />
            <div className="updatePasswordContainer">
                <div className="updatePasswordBox">
                    <h2 className="updatePasswordHeading">Update Profile</h2>

                    <form
                        className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
                        <div className="loginPassword">
                            <VpnKeyIcon />
                            <input
                                type="password"
                                placeholder="Old password"
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)} />
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="New password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div className="loginPassword">
                            <LockIcon />
                            <input
                                type="password"
                                placeholder="Confirm password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <input
                            type="submit"
                            value="Update"
                            className="updatePasswordBtn"
                        />
                    </form>
                </div>
            </div>
        </>)
    )
}

export default UpdatePassword