import type { NextPage } from "next";
import { 
    selectAuthState,
} from "../store/auth-slice";
import { useAppSelector } from "../../../hooks";
import { NextRouter, useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect } from "react";

type SecuredProps = {
    children: React.ReactNode; // 👈️ type children
};

const Secured:NextPage<SecuredProps> = (props:PropsWithChildren<SecuredProps>) => {
    const router:NextRouter = useRouter();
    const authState:boolean = useAppSelector(selectAuthState);
    
    useEffect(()=>{
        if(authState === false) {
            router.push('/');
        }
    },[]);

    return (<Fragment>{props.children}</Fragment>)
}

export default Secured