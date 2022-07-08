import React from 'react'
import News from './News'
const NewsList = ({setLiked,news}) => {
  return (
    <div className='list__cards'>
      {news.map(item =>
        <News key={item.objectID} setLiked={setLiked} item={item}/>
      )}
    </div>
  )
}

export default NewsList