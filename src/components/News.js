import {useEffect,useState} from 'react'
import imgNoFave from '../images/no_fave.png'
import imgFave from '../images/fave.png'
import imgTime from '../images/time.png'

const News = ({setLiked,item}) => {
  const [formatedDate, setFormatedDate] = useState('')
  useEffect(() => {
    let sysdate = new Date();
    let sysdateMinutes = sysdate.getMinutes() 
    let sysdateHours = sysdate.getHours() 
    let sysdateDay = String(sysdate.getDate()).padStart(2, '0');
    let sysdateMonth = String(sysdate.getMonth() + 1).padStart(2, '0');
    let sysdateYear = sysdate.getFullYear();

    let itemdate = new Date(item.created_at)
    let itemdateMinutes = itemdate.getMinutes() 
    let itemdateHours = itemdate.getHours()
    let itemdateDay = String(itemdate.getDate()).padStart(2, '0');
    let itemdateMonth = String(itemdate.getMonth() + 1).padStart(2, '0');
    let itemdateYear = itemdate.getFullYear();
    let newFormat = {
      number: null,
      message: ''
    }
    if(Number(sysdateYear) > Number(itemdateYear)){
      newFormat = {
        number: Number(sysdateYear)-Number(itemdateYear),
        message: (Number(sysdateYear)-Number(itemdateYear)) > 1 ? ' years ago' : ' year ago'
      } 
    }
    else if(Number(sysdateMonth) > Number(itemdateMonth))
    {
      newFormat = {
        number: Number(sysdateMonth)-Number(itemdateMonth),
        message: (Number(sysdateMonth)-Number(itemdateMonth)) > 1 ? ' months ago' : ' month ago'
      }
    }
    else if(Number(sysdateDay) > Number(itemdateDay))
    {
      newFormat = {
        number: Number(sysdateDay)-Number(itemdateDay),
        message: (Number(sysdateDay)-Number(itemdateDay)) > 1 ? ' days ago' : ' day ago'
      }
    }
    else if(Number(sysdateHours) > Number(itemdateHours))
    {
      newFormat = {
        number: Number(sysdateHours)-Number(itemdateHours),
        message: (Number(sysdateHours)-Number(itemdateHours)) > 1 ? ' hours ago' : ' hour ago'
      }
    }
    else if(Number(sysdateMinutes) > Number(itemdateMinutes))
    {
      newFormat = {
        number: Number(sysdateMinutes)-Number(itemdateMinutes),
        message: (Number(sysdateMinutes)-Number(itemdateMinutes)) > 1 ? ' minutes ago' : ' minute ago'
      }
    }
    else
    {
      newFormat = {
        number: null,
        message: ' just now'
      }
    }
    setFormatedDate(`${newFormat.number}${newFormat.message}`)
    //console.log(itemdate,newFormat)
  }, [item])
  
  return (
    <div className='card'>
      <a className="card__information" href={item.story_url} target="_blank" rel="noreferrer">
        <div className='card__information__time'>
          <img src={imgTime} alt="" /> <p>{formatedDate} by {item.author}</p>
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