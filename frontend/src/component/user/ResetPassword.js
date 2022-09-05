import React, { useState, useEffect } from 'react'
import "./ResetPassword.css"
import Spinner from '../loader/Spinner'
import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, resetPassword } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import Metadata from "../layout/Metadata"


const ResetPassword = ({ history, match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);


        dispatch(resetPassword(match.params.token, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password updated successfully")
            history.push("/login")
        }
    }, [dispatch, error, alert, history, success]);


    return (
        (loading ? <Spinner /> : <>
            <Metadata title="Change password" />
            <div className="resetPasswordContainer">
                <div className="resetPasswordBox">
                    <h2 className="resetPasswordHeading">Reset password</h2>

                    <form
                        className="resetPasswordForm" onSubmit={resetPasswordSubmit}>

                        <div>
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="New password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
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
                            className="resetPasswordBtn"
                        />
                    </form>
                </div>
            </div>
        </>)
    )
}

export default ResetPassword