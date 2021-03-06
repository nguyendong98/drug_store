import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import './Register.scss';
import { Dialog } from '@material-ui/core';
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Visibility, VisibilityOff} from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import {connect, useDispatch, useSelector} from 'react-redux';
import  { registerAccount }  from "../../features/user";
import {closeRegister, showLogin} from "../../features/show-dialog"
import Typography from "@material-ui/core/Typography";
const Register = ({ registerAccount }) => {
    const { register, handleSubmit, errors } = useForm();
    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);
    const openRegister = useSelector(state => state.showDialog.isOpenRegister);
    const dispatch = useDispatch();
    const handleMouseDownPassword = (event) => event.preventDefault();

    const onSubmit =  data => {
        delete data.rePassword;
        registerAccount(data);
    }
    const closeDialogRegister = () => dispatch(closeRegister());

    const showDialogSignIn = () => dispatch(showLogin());
    return (
        <Fragment>
            <Dialog fullWidth={true} maxWidth="xs" onClose={closeDialogRegister} aria-labelledby="dialog-login" open={openRegister} className="register">
                <div className="title py-3">SIGN UP</div>
                <DialogContent>
                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth={true}
                            id="input-fullname"
                            label="Fullname"
                            type="text"
                            name="fullName"
                            inputRef={register({ required: true })}
                        />
                        {errors.fullName && <Alert className="alert" severity="error">Fullname is required!</Alert>}
                        <TextField
                            className="mt-2"
                            fullWidth={true}
                            id="input-username"
                            label="Username"
                            type="text"
                            name="username"
                            inputRef={register({ required: true })}
                        />
                        {errors.username && <Alert className="alert" severity="error">Username is required!</Alert>}
                        <TextField
                            className="mt-2"
                            fullWidth={true}
                            id="input-email"
                            label="Email"
                            name="email"
                            inputRef={register({
                                required: "Email is required!",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email &&  <Alert className="alert" severity="error">{ errors.email.message }</Alert>}
                        <TextField
                            fullWidth={true}
                            className="mt-2"
                            id="input-phone"
                            label="Phone"
                            type="text"
                            name="phone"
                            inputRef={register({ required: true })}
                        />
                        {errors.phone && <Alert className="alert" severity="error">Phone is required!</Alert>}
                        <TextField
                            className="mt-2"
                            fullWidth={true}
                            id="input-password"
                            label="Password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPass(!showPass)}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPass ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            type={showPass ? 'text' : 'password'}
                            name="password"
                            inputRef={register({ required: true, minLength: 4 })}
                        />
                        {errors.password?.type === 'required' && <Alert className="alert" severity="error">Password is required!</Alert>}
                        {errors.password?.type === 'minLength' && <Alert className="alert" severity="error">Password is too short!</Alert>}
                        <TextField
                            className="mt-2"
                            fullWidth={true}
                            id="input-re-password"
                            label="Retype the password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowRePass(!showRePass)}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showRePass ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            type={showRePass ? 'text' : 'password'}
                            name="rePassword"
                            inputRef={register({ required: true })}
                        />
                        {errors.rePassword && <Alert className="alert" severity="error">Password is required!</Alert>}
                        <Grid container className="pt-6 pb-3" >
                            <Button variant="contained" color="primary" disableElevation className="w-100" type="submit">
                                Submit
                            </Button>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center" className="pt-4 mb-5">
                            <Typography variant="body1" >You are already a member? </Typography>
                            <Typography variant="body1" className="title-sub" onClick={showDialogSignIn}>&nbsp;Sign in </Typography>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )

}
Register.propTypes = {
    registerAccount: PropTypes.func.isRequired,
}
export default connect(null, { registerAccount })(Register);
