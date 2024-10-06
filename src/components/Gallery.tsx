import { IPost } from '../helpers/types';
import { BASE } from '../helpers/default'
import { handlePostReaction } from '../helpers/api';
import { Post } from './Post';
import { useState } from 'react';

interface Props {
    posts: IPost[]
    onUpdatePost?: (id: number) => void
}

export function Gallery({ posts, onUpdatePost }: Props) {

    const [currenPost, setCurrentPost] = useState<number>(-1)

    const reactPost = (id: number) => {
        handlePostReaction(id)
            .then(() => {
                if (onUpdatePost) {
                    onUpdatePost(id)
                }
            })
    }
    return <>
        <div className='list'>
            {
                posts.map(post => {
                    return <div key={post.id} className='post'>
                        <img
                            src={BASE + post.picture}
                            className='post-img'
                        />
                        <div onClick={() => setCurrentPost(post.id)} className='cover'></div>
                        <img
                            onClick={() => reactPost(post.id)}
                            className='like-btn'
                            src={
                                post.isLiked
                                    ? 'https://cdn2.iconfinder.com/data/icons/peppyicons/512/heart-64.png'
                                    : 'https://cdn1.iconfinder.com/data/icons/social-productivity-line-art-1/128/heart-love-2-64.png'
                            }
                        />
                    </div>
                })
            }
        </div>
       {currenPost != -1 && <Post handleClose={() => setCurrentPost(-1)} postId={currenPost} currentPosts={posts[currenPost - 1]}  />}
    </>

}