import {useContext, useState} from 'react';
import API from '../services/API'

export const CommentContext = useContext();

export const CommentProvider = ({children}) => {
    return (
        <CommentContext.Provider value={}>
            {children}
        </CommentContext.Provider>
    )
}