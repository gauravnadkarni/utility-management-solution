import type { NextPage } from "next";
import { 
    selectAuthState,
} from "../store/auth-slice";
import { useAppSelector } from "../../../hooks";
import { NextRouter, useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect } from "react";

type NonSecuredProps = {
    children: React.ReactNode; // 👈️ type children
};

const NonSecured:NextPage<NonSecuredProps> = (props:PropsWithChildren<NonSecuredProps>) => {
    const router:NextRouter = useRouter();
    const authState:boolean = useAppSelector(selectAuthState);

    useEffect(()=>{
        if(authState === true) {
            router.push('/dashboard');
        }
    },[]);

    return <Fragment>{props.children}</Fragment>
}

export default NonSecured