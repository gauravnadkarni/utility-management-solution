import { Alert, Button, Card, CardActions, CardContent, FormControl, FormLabel, TextField } from "@mui/material"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import type { NextPage } from "next";
import { styled } from '@mui/material/styles';
import classes from './LoginBox.module.css';
import { 
    selectUser, signInCall,
} from "../auth/store/auth-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { NextRouter, useRouter } from "next/router";

const VALIDATION_OBJECT = {
    username: {
        required:"*Username is required",
        maxLength: {
            value: 16,
            message: "*Max length is 16"
        },
        minLength: {
            value: 6,
            message: "*Min length is 6"
        }
    },
    password: {
        required:"*Password is required",
        maxLength: {
            value: 16,
            message: "*Max length is 16"
        },
        minLength: {
            value: 6,
            message: "*Min length is 6"
        }
    }
}

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

interface FormInputs {
    username: string
    password: string
 }

const LoginBox:NextPage = () => {
    const router:NextRouter = useRouter();
    const userState:{userId:number} = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<FormInputs> = (data:any) => {
        dispatch(signInCall(data));
    }
    
    const { 
        handleSubmit, 
        control, 
        reset, 
        trigger, 
        formState: { errors },} = useForm<FormInputs>({
        defaultValues: {
          username: "",
          password: "",
        },
      });

    return (
       
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardContent classes={{root: classes.muiRootCardContent}}>
                    <FormControl classes={{root: classes.muiRootFormControl}}>
                        <Controller
                            name="username"
                            control={control}
                            rules={VALIDATION_OBJECT.username}
                            render={({ field }) => <CssTextField {...field} label="Username" placeholder="Username"/>}
                        />
                        {errors.username && <span className="form-field-validation-error">{errors.username.message}</span>}
                    </FormControl>
                    <FormControl classes={{root: classes.muiRootFormControl}}>
                        <Controller
                            name="password"
                            control={control}
                            rules={VALIDATION_OBJECT.password}
                            render={({ field }) => <CssTextField {...field} type="password" label="Password" placeholder="Password"/>}
                        />
                        {errors.password && <span className="form-field-validation-error">{errors.password.message}</span>}
                    </FormControl>
                </CardContent>
                <CardActions classes={{root:classes.muiRootCardActions}}>
                    <Button 
                        variant="contained"
                        onClick={(event: React.SyntheticEvent) => trigger()}
                        type="submit"
                    >
                        Sign In
                    </Button>
                </CardActions>
            </Card>
        </form>
    )
}

export default LoginBox