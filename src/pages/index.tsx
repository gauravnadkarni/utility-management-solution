import { Box, Paper } from "@mui/material";
import MainContainer from "../components/layout/MainContainer";
import LoginBox from "../components/login/LoginBox";
import classes from './index.module.css';
import classNames from "classnames";

const LandingPage  = () => {
    return (
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
        </MainContainer>)
}

export default LandingPage;