import { Box, Paper } from "@mui/material";
import MainContainer from "../components/layout/MainContainer";
import LoginBox from "../components/auth/LoginBox";
import classes from './index.module.css';
import classNames from "classnames";
import NonSecured from "@/components/auth/security/non-secured";

const LandingPage  = () => {
    return (
        <NonSecured>
            <MainContainer>
                <Box>
                    <Paper 
                        className={classNames({[classes.paper]:true,[classes.verticalAlign]:true})}
                        sx={{
                        width: 300,
                        alignContent:"center",
                        '&:hover': {
                        opacity: [0.9, 0.8, 0.7],
                        },
                    }}>
                        <LoginBox/>
                    </Paper>
                </Box>
            </MainContainer>
        </NonSecured>
    )
}

export default LandingPage;