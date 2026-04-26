import {useContext, useState} from 'react';
import API from '../services/API'

export const CommentContext = useContext();

export const CommentProvider = ({children}) => {

    const [comments, setComments] = useState([])

    const getComments = async(id) => {
        const res = await API.get(`/comments/post/${id}`);
        setComments(res.data)
    }

    
    return (
        <CommentContext.Provider value={{comments, getComments}}>
            {children}
        </CommentContext.Provider>
    )
}