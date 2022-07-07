import React from 'react'
import imgNoFave from '../images/no_fave.png'
import imgFave from '../images/fave.png'
import imgTime from '../images/time.png'

const News = ({setLiked,item}) => {
  return (
    <div className='card'>
      <a className="card__information" href={item.story_url} target="_blank" rel="noreferrer">
        <div className='card__information__time'>
          <img src={imgTime} alt="" /> <p>{item.created_at} by {item.author}</p>
        </div>
        <div className='card__information__description'>
          {item.story_title}
        </div>
      </a>
      <div className="card__button" onClick={()=>setLiked(item.objectID)}>
          <img className='card__button__imgHeart' src={item.liked ? imgFave : imgNoFave} alt="like_heart" />
      </div>
    </div>
  )
}

export default News