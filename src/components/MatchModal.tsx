import { useEffect, useImperativeHandle, useRef, useState } from "react";
import classes from './MatchModel.module.css';
import { useQuery } from '@tanstack/react-query';
import { findMatch, getDogs } from "../util/http";
import { useDogsContext } from "./PageContainer";

const MatchModel = ({ref, close, getData}: any) => {
    const dialog = useRef<HTMLDialogElement>(null); 

    const { match } = useDogsContext();

    const {data, isPending, isError, error} = useQuery({
        queryKey: ['match', {match: match}],
        queryFn: () => findMatch(match),
        enabled: getData === true,
       
    });

    const {data: matchData, isPending: matchIsPending, isError: matchIsError, error: matchError} = useQuery({
        queryKey: ['dogMatch', {data: data?.match?.match}],
        queryFn: () => getDogs([data?.match?.match] as any),
        enabled: data !== undefined,
       
    });

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog?.current?.showModal();
            },
            close: () => {
                dialog?.current?.close()   
             }
        }        
    })

    const handleClose = () => {
        close();       
    }

    return (
        <>
            <dialog ref={dialog} className={classes.modal}>
                <div>
                    <header>You Match</header>
                        <main className={classes.container}>
                        {
                            matchData &&                                
                                matchData.data?.map((x: any) => {
                                    return (<>
                                        <img src={x.img} alt={x.name} />
                                        <div>Name: {x.name}</div> 
                                        <div>Age: {x.age}</div> 
                                        <div>Breed: {x.breed}</div>
                                    </>)
                                })
                        }
                        </main>
                        <footer>                       
                            <button id="closeModal" onClick={handleClose}>Close</button>
                        </footer>
                </div>
            </dialog>
        </>
    )
}

export default MatchModel;