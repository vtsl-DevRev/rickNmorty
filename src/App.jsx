import React from 'react'
import './App.css'
import ListComponent from './components/ListComponent/ListComponent'
import TitleComponent from './components/TitleComponent/TitleComponent'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

function App() {

    return (
        <React.Fragment>
            <TitleComponent />
            <QueryClientProvider client={queryClient}>
                <ListComponent />
            </QueryClientProvider>
        </React.Fragment>
    )
}

export default App
