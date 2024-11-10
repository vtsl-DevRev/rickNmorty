import './ListComponent.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RenderListComponent from '../RenderListComponent/RenderListComponent';
import { useQuery } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

const ListComponent = () => {

    const [page, setPage] = useState(1);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(true);

    const getData = async ({ queryKey }) => {
        const [, pageNo] = queryKey;
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNo}`);
        return response.data;
    };

    const { data, isLoading, isError, isPreviousData } = useQuery(['characters', page], getData, {
        keepPreviousData: true,
    });

    useEffect(() => {
        if (data) {
            setPrev(data.info.prev !== null);
            setNext(data.info.next !== null);
        }
    }, [data]);

    if (isLoading) return (<div>Loading...</div>)
    if (isError) return (<div>Error fetching data</div>)
    return (
        <div id='list'>
            <QueryClientProvider client={queryClient}>
                <RenderListComponent charactersData={data.results} />
            </QueryClientProvider>
            <div id='pageForm'>
                <button className='pageButtons'
                    onClick={() => { if (prev) setPage(page => page - 1) }}
                    disabled={!prev}
                >
                    Previous
                </button>
                <button className='pageButtons'
                    onClick={() => { if (next) setPage(page => page + 1) }}
                    disabled={!next}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ListComponent