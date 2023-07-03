import type { NextPage } from "next";
import { 
    selectCheckingSignedIn,
    selectUser, signInCheckCall,
} from "../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NextRouter, useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect } from "react";
import Loader from "../../utility/loader";

type NonSecuredProps = {
    children: React.ReactNode; // 👈️ type children
};

const NonSecured:NextPage<PropsWithChildren<NonSecuredProps>> = (props:PropsWithChildren<NonSecuredProps>) => {
    const router:NextRouter = useRouter();
    const user:{userId:number} = useAppSelector(selectUser);
    const checkingSignedIn:"checking" | "checked" | null = useAppSelector(selectCheckingSignedIn);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(checkingSignedIn === null) {
            dispatch(signInCheckCall({}));
        }

        if(checkingSignedIn === "checked" && user.userId !== -1) {
            router.push("/dashboard");
        }
    },[checkingSignedIn, user]);

    if(checkingSignedIn === "checked" && user.userId === -1) {
        return (<Fragment>{props.children}</Fragment>)
    }

    return (<Loader varient="indeterminate" color="primary" />);
}

export default NonSecured