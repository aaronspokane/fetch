import { memo } from 'react';
import classes from './PageContent.module.css';
import styles from './Paginate.module.css';
import { fetchDogs } from '../util/http';
import  DogItem  from './DogItem';
import { useDogsContext } from './PageContainer';
import ReactPaginate from 'react-paginate';
import { useLoaderContext } from '../hooks/useLoader';

import { useQueryClient } from '@tanstack/react-query';

import { getDogs } from '../util/http';


const PageContent = () => {    
    const { dogs, paginate, setData } = useDogsContext();
    const { setActiveState } = useLoaderContext();    

    const queryClient = useQueryClient();  

    const handlePageClick = async (data: any) => {
        setActiveState(true);
        const index = paginate.next.indexOf("from=");
        const cursor = (data.selected * 25);
        const url = paginate.next.substring(0, index) + `from=${cursor}`;       
        let dogs;

        const responseData = await queryClient.fetchQuery({
            queryKey: ["fetchDogs"],
            queryFn: () => fetchDogs(url)
        });

         console.log(responseData);

        if(responseData && !responseData.error) {
            dogs = await queryClient.fetchQuery({
                queryKey: ["dogs"],
                queryFn: () => getDogs(responseData?.ids?.resultIds)
            })
        }      

        setActiveState(false);

        if(dogs && !dogs.error) 
        {            
            setData(dogs.data as []);
        }
    }
    
    return (
        <main className={classes.container}>
            {
                dogs?.length > 0 && (
                    <>
                        <div>
                            <ul className={classes.dogContainer}> 
                            {
                                dogs.map((x: any) => {
                                    return <DogItem dog={x} key={x.id} />
                                })
                            }
                            </ul>
                        </div>
                        <div className="container">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={paginate.total / 25} // Total number of pages
                                marginPagesDisplayed={2} // How many pages to show at the beginning and end
                                pageRangeDisplayed={3} // How many pages to show around the current page
                                onPageChange={handlePageClick} // What happens when a page is clicked
                                containerClassName={styles.pagination} // CSS class for the pagination container
                                activeClassName={styles.active} // CSS class for the active page
                            />
                        </div>
                    </>
                )
            }
            {
                dogs?.length <= 0 &&
                <>
                    No data to display... 
                </>
            }                       
        </main>
    )
}

export default memo(PageContent);