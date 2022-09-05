import React, { useState, useEffect } from 'react'
import "./ForgotPassword.css"
import Spinner from '../loader/Spinner'
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, forgotPassword } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import Metadata from "../layout/Metadata"

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
    );
    const [email, setEmail] = useState("");
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
      };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert, message]);


    return (
        (loading ? <Spinner /> : <>
            <Metadata title="Forgot password" />
            <div className="forgotPasswordContainer">
                <div className="forgotPasswordBox">
                    <h2 className="forgotPasswordHeading">Forgot password ?</h2>

                    <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
                        <div className="updateProfileEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Send"
                            className="forgotPasswordBtn"
                        />
                    </form>
                </div>
            </div>
        </>)
    )
}

export default ForgotPassword