
import { NextPage } from "next";
import classes from './dashboard.module.css';
import Secured from "@/components/auth/security/secured";
import { PropsWithChildren } from "react";

const DashboardPage:NextPage  = (props:PropsWithChildren) => {
    return (
        <Secured>
            <h1>Dashboard</h1>
        </Secured>   
    )
}

export default DashboardPage;