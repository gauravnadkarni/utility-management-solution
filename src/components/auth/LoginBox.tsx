import { Button, Card, CardActions, CardContent, FormControl, FormLabel, TextField } from "@mui/material"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import classes from './LoginBox.module.css';
import { selectAuthState, setAuthState } from "../auth/store/auth-slice";



const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
        borderColor: '#E0E3E7',
        },
        '&:hover fieldset': {
        borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C',
        },
    },
});

interface IFormInputs {
    username: string
    password: string
 }

const LoginBox:NextPage = () => {
    const authState:boolean = useSelector(selectAuthState);
    console.log(authState)
    const dispatch = useDispatch();
    const onSignInButtonClick = () => {
        dispatch(setAuthState(!authState))
    }
    
    return (
        <Card>
            <CardContent classes={{root: classes.muiRootCardContent}}>
                <FormControl classes={{root: classes.muiRootFormControl}}>
                    <CssTextField label="Username" id="custom-css-outlined-input" placeholder="Username"/>
                </FormControl>
                <FormControl classes={{root: classes.muiRootFormControl}}>
                    <CssTextField label="Password" id="custom-css-outlined-input" type="password" placeholder="Password"/>
                </FormControl>
            </CardContent>
            <CardActions classes={{root:classes.muiRootCardActions}}>
                <Button 
                    variant="contained"
                    onClick={onSignInButtonClick}
                >
                    Sign In
                </Button>
            </CardActions>
        </Card>
    )
}

export default LoginBox