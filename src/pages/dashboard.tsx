
import { NextPage } from "next";
import classes from './dashboard.module.css';
import Secured from "@/components/auth/security/secured";
import { PropsWithChildren } from "react";
import Layout from "../components/layout/Layout";

const DashboardPage:NextPage  = (props:PropsWithChildren) => {
    return (
        <Secured>
            <Layout>
                <h1>Dashboard</h1>
            </Layout>
        </Secured>   
    )
}

export default DashboardPage;