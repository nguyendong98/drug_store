import React, {useState} from 'react';
import './Login.scss';
import Dialog  from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import {AccountCircle, Lock, Visibility, VisibilityOff} from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {useForm} from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GoogleImg from './../../assets/images/google.jpg';
import FacebookImg from './../../assets/images/facebook.png';
import Twitter from './../../assets/images/twitter.png';
import Typography from "@material-ui/core/Typography";
import {connect, useDispatch, useSelector} from "react-redux";
import {closeLogin, showRegister} from "../../features/show-dialog";
import PropTypes from "prop-types";
import {signIn} from "../../features/user";
const Login = ({ signIn }) => {
    const { register, handleSubmit, errors } = useForm();
    const [showPass, setShowPass] = useState(false);
    const openLogin = useSelector(state => state.showDialog.isOpenLogin);
    const dispatch = useDispatch();
    const onSubmit = data => {
        signIn(data);
    }
    const closeDialogLogin = () => {
        dispatch(closeLogin());
    }

    const handleClickShowPassword = () => {
        setShowPass(!showPass);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const showDialogRegister = () => {
        dispatch(showRegister());
    }
    return (
        <>
            <Dialog fullWidth={true} maxWidth="xs" onClose={closeDialogLogin} aria-labelledby="dialog-login" open={openLogin} className="login">
                <div className="title py-3">LOGIN</div>
                <DialogContent>
                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth={true}
                            id="input-username"
                            label="Username"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            type="text"
                            name="username"
                            inputRef={register({ required: true })}
                        />
                        {errors.username && <Alert className="alert" severity="error">Username is required!</Alert>}
                        <TextField
                            className="mt-5"
                            fullWidth={true}
                            id="input-password"
                            label="Password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPass ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            type={showPass ? 'text' : 'password'}
                            name="password"
                            inputRef={register({ required: true })}
                        />
                        {errors.password && <Alert className="alert" severity="error">Password is required!</Alert>}
                        <Grid container className="pt-6 pb-3" >
                            <Button variant="contained" color="primary" disableElevation className="w-100" type="submit">
                                Submit
                            </Button>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <div className="title">OR</div>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center" className="mt-2">
                            <a href="#facebook"><img src={FacebookImg} alt="facebook" className="login-social mr-2"/></a>
                            <a href="#twitter"><img src={Twitter} alt="twitter" className="login-social mr-2"/></a>
                            <a href="#google"><img src={GoogleImg} alt="google" className="login-social mr-2"/></a>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center" className="pt-4">
                            <Typography variant="body1" >No account yet? </Typography>
                            <Typography variant="body1" className="title-sub" onClick={showDialogRegister}>&nbsp;Sign up </Typography>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center" className="pb-4">
                            <Typography variant="body1" className="title-sub">&nbsp;Forgot your password? </Typography>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </>

    )

}

Login.propTypes = {
    signIn: PropTypes.func.isRequired,
}
export default connect(null, { signIn })(Login);
