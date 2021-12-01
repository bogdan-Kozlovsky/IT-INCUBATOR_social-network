import React, {FC} from 'react';

interface PostProps {
    author: string
    id: number
    descr: string
}

export const Post: FC<PostProps> = (
    {author, id, descr}) => {
    return (
        <div style={{display: 'flex', alignItems: 'center',marginBottom:'15px'}}>
            <div style={{marginRight: '10px'}}>{id}.</div>
            <div>
                <h1 style={{fontSize:'20px'}}>{author}</h1>
                <p>{descr}</p>
            </div>
        </div>
    );
};

