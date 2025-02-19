import { memo, useCallback, useReducer, useRef, useState } from 'react';
import classes from './PageFilter.module.css'
import FilterModel from './FilterModal';
import { useQueryClient } from '@tanstack/react-query';
import { getIds, getDogs } from '../util/http';
import { useLoaderContext } from '../hooks/useLoader';
import { useDogsContext } from './PageContainer';

type pageContainer = {
    _data: [] | undefined,   
}

const reducer = (state: any, action: any) => {
    switch(action.type) {
        case 'breeds': {
            let breeds;
            if(state.breeds.includes(action.data)) {
                breeds = state.breeds.filter((x: string) => x !== action.data);
            } else {
                breeds = [...state.breeds, action.data];
            }

            return {
                ...state,
                breeds: breeds
            }
        }
        case 'zip': {
            return {
                ...state,
                zip: action.data
            }
        }
        case 'sort': {
            return {
                ...state,
                sort: action.data
            }
        }
    }
}

const PageFilter = ({ _data }: pageContainer) =>{    
    const filterDialog = useRef<any>(null); 
    const [filter, dispatch] = useReducer(reducer, {breeds: [], zip: 0, sort: 'asc'});
    const queryClient = useQueryClient();
    const { setActiveState } = useLoaderContext();
    const { setData, match, clearMatches } = useDogsContext();    

    const handleShowModal = () => {        
        filterDialog?.current?.open!();
    }  

    const handleUpdate = (event: any) => {
       dispatch({type: `${event.target.name}`, data: event.target.value});
    }

    const handleBreedUpdate = useCallback((name: string) => {
        dispatch({type: 'breeds', data: name});        
    }, []);    

    const handleSearch = async () => {
        setActiveState(true);
        let dogs;

        clearMatches();

        const data = await queryClient.fetchQuery({
            queryKey: ["fetchIds"],
            queryFn: () => getIds(filter)
        });

        if(data && !data.error) {
            dogs = await queryClient.fetchQuery({
            queryKey: ["dogs"],
            queryFn: () => getDogs(data?.ids?.resultIds)
            })
        }

        setActiveState(false);  

        if(dogs && !dogs.error) 
        {            
            setData(dogs.data as [], {next: (data.ids?.next as string), total: (data.ids?.total as number)});
        }        
    }      

    return (
        <>
            <FilterModel ref={filterDialog} data={_data} update={handleBreedUpdate} />          
            <div className={classes.containerFilter}>
                    <h3>Filter</h3>
            </div>
            <div className={classes.flexchild}>
                <div>
                    <label htmlFor="breeds">Breed(s)</label>
                    <input type="button" name="breeds" value="Search Breeds" onClick={handleShowModal} />                    
                </div>  
                <div>  
                    <label htmlFor="zip">Zip</label>
                    <input onChange={handleUpdate} name="zip"></input>
                </div>

                <div>
                    <input type="radio" id="asc" onChange={handleUpdate} name="sort" value="asc" defaultChecked></input>
                    <label htmlFor="asc">asc</label>
                </div>

                <div>
                    <input type="radio" id="desc" onChange={handleUpdate} name="sort" value="desc"></input>
                    <label htmlFor="desc">desc</label>
                </div> 
                <div style={{marginLeft: 'auto'}} >
                    <input type="button" value="Search" onClick={handleSearch} className={classes.searchFilter} />
                    {
                        match?.length > 0 &&
                            <input type="button" value="Clear Match(s)" onClick={clearMatches} className={classes.searchFilter} />
                    }
                </div>
            </div>
        </>
    )
};

export default memo(PageFilter);