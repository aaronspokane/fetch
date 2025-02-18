import { redirect } from 'react-router-dom';

import { Authenticated } from "../util/auth";
import { useQuery } from '@tanstack/react-query';
import { getBreeds } from '../util/http';
import PageContainer from '../components/PageContainer';
import PageContent  from '../components/PageContent';
import PageFilter from '../components/PageFilter';
import { useMemo } from 'react';

const HomePage = () => {

    const { data, isPending, isError, error} = useQuery({
        queryKey: ['breeds'],
        queryFn: getBreeds
    });    

    const breedData = useMemo(() => data?.data, [data?.data]);

    return (
        <PageContainer> 
            <PageFilter _data={breedData} />
            <PageContent />
        </PageContainer> 
    )
}

export default HomePage;

export const homePageLoader = async () => {
    const authenticated = Authenticated();  
  
    if(!authenticated) 
      return redirect('/login');  
   
    return null;
}
