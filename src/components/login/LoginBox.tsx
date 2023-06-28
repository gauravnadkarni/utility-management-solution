import { Button, Card, CardActions, CardContent, FormControl, FormLabel, TextField } from "@mui/material"
import { styled } from '@mui/material/styles';
import classes from './LoginBox.module.css';


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

const LoginBox = () => {
    return (
        <Card>
            <CardContent classes={{root: classes.muiRootCardContent}}>
                <FormControl classes={{root: classes.muiRootFormControl}}>
                    <CssTextField label="Username" id="custom-css-outlined-input" />
                </FormControl>
                <FormControl classes={{root: classes.muiRootFormControl}}>
                    <CssTextField label="Password" id="custom-css-outlined-input" type="password"/>
                </FormControl>
            </CardContent>
            <CardActions classes={{root:classes.muiRootCardActions}}>
                <Button variant="contained">Sign In</Button>
            </CardActions>
        </Card>
    )
}

export default LoginBox