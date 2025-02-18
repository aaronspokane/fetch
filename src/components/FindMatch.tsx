import { useRef, useState } from 'react';
import classes from './FindMatch.module.css'
import MatchModel from './MatchModal';

const FindMatch = () => {
    const filterDialog = useRef<any>(null);  
    const [showModel, setShowModel] = useState(false);

    const handleShowModal = () => {  
        setShowModel(true);       
        filterDialog?.current?.open();
    } 
    
    const handleHideModal = () => {   
        setShowModel(false);    
        filterDialog?.current?.close();
    } 
    
    return (
        <>
            <MatchModel ref={filterDialog} close={handleHideModal} getData={showModel} />                      
            <div className={classes.containerMatch} onClick={handleShowModal}>
                Your Match
            </div>
        </>
    )
}

export default FindMatch;