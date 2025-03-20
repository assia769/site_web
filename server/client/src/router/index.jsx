import {createBrowserRouter} from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path : '/',
        element : <p>hi</p>
    },

    {
        path : '/a',
        element : <p>hello</p>
    }
    ,
    {
        path : '*',
        element : <p>404:not found</p>
    }

])