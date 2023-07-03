import type { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect } from "react";
import { 
    selectUser,
    selectCheckingSignedIn,
    signInCheckCall,
} from "../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Loader from "../../utility/loader";


type SecuredProps = {
    children: React.ReactNode; // 👈️ type children
};

const Secured:NextPage<PropsWithChildren<SecuredProps>>= (props:PropsWithChildren<SecuredProps>) => {
    const router:NextRouter = useRouter();
    const user:{userId:number} = useAppSelector(selectUser);
    const checkingSignedIn:"checking" | "checked" | null = useAppSelector(selectCheckingSignedIn);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        if(checkingSignedIn === null) {
            dispatch(signInCheckCall({}));
        } 
       
       if(checkingSignedIn === "checked" && user.userId === -1) {
            router.push("/");
        }
    },[checkingSignedIn, user]);

    if(checkingSignedIn === "checked" && user.userId !== -1) {
        return <Fragment>{props.children}</Fragment>
    }

    return (<Loader varient="indeterminate" color="primary" />);
}

export default Secured