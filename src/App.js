import Logo from './components/Logo.js'
import Navbar from './components/Navbar'
import Selector from './components/Selector'
import NewsList from './components/NewsList'

import {useState, useEffect} from 'react'
function App() {

  let storeSelector = JSON.parse(localStorage.getItem('selector'));
  if(!storeSelector){
    storeSelector = {
      active:false,
      option:'Select your news'
    };
  }

  let storeLikedNews = JSON.parse(localStorage.getItem('likesNews'));
  if(!storeLikedNews){
    storeLikedNews = [];
  }

  //state for Navbar adding active class to 'all' or 'faves'
  const [activeNav,setActiveNav] = useState('all')
  /*
    state for selector 
    active=true // display the dropdown
    option // the selected option of the dropdown
  */

  const [selectedPage, setSelectedPage] = useState(0)
  const [selector,setSelector] = useState(storeSelector)

  //all current data of the news in page
  const [allNews, setAllNews] = useState( {
    reactjs:[],
    angular:[],
    vuejs:[]
  })

  //liked news
  const [likesNews, setLikesNews] = useState(storeLikedNews)

  useEffect(()=>{
      if(selector.option !== 'Select your news')
      {
        //call to the api
        setData()
      }
       //captures any changes of the selector state and assign it to the local storage
       localStorage.setItem("selector",JSON.stringify(selector));
  },[selector.option,selectedPage]);

  useEffect(()=>{
     localStorage.setItem("likesNews",JSON.stringify(likesNews))
  },[likesNews]);

  //function for obtain the data of the news
  const setData = async () =>{

      let response =  await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${(selector.option).toLowerCase()}&page=${selectedPage}`);
      let data = await response.json()
      let likesFiltered = likesNews.filter(like => like.type === (selector.option).toLowerCase())
      
      if(likesFiltered.length > 0)
      {
        data.hits = data.hits.map(hit => {
              let found = false
              likesFiltered.map(like => 
                like.objectID === hit.objectID && (found = true)
              )
              if(found)
                return {
                  ...hit,
                  liked: true
                }
              else{
                return{
                  ...hit,
                  liked: false
                }
              }
            }
          )
      }
      else{
        data.hits = data.hits.map(hit => {
        return{
          ...hit,
          liked: false
        }
      })}
      setAllNews(
          {
            ...allNews,
            [(selector.option).toLowerCase()]: data.hits
          }
      )
  }

  //function that set the liked news  
  const setLiked = id =>{
  console.log(id)
  let alteredAllNews = allNews;

  if(activeNav === 'fav')
  {
    setLikesNews(likesNews.filter(news => news.objectID !== id))
    alteredAllNews[(selector.option).toLowerCase()] = alteredAllNews[(selector.option).toLowerCase()].map(
      news => {
        if(news.objectID === id)
          return{
            ...news,
            liked: false
          }
        else
          return{
            ...news
          }
      }
    )
  }
  else{
    let hits = allNews[(selector.option).toLowerCase()].map(item =>
      {
        if(item.objectID === id)
        {
          if(item.liked) //when dislike a previous like option, is deleted from the like array
            setLikesNews(likesNews.filter(news => news.objectID !== id))
          else  //when like an option, is added to the like array
            setLikesNews([
              ...likesNews,
              {
                ...item,
                type: (selector.option).toLowerCase(),
                liked: true,
              }
            ])
          //update the data of the array all news 
          return{
            ...item,
            liked: !item.liked
          }
        }
        
        else
          return {
            ...item
          }
      }
    )
    
    alteredAllNews[(selector.option).toLowerCase()] = hits
    setAllNews({...alteredAllNews}) 
    }
  }

  return (
    <div className="App">
        <Logo/>

        <Navbar active={activeNav} setActive={setActiveNav}/>
            {
              //show every new per selected page
              activeNav === 'all' ?
              <section>
                <Selector selector={selector} setSelector={setSelector}/>
                {allNews[(selector.option).toLowerCase()] && 
                 <NewsList 
                  setLiked={setLiked} 
                  news={allNews[(selector.option).toLowerCase()]}
                 />}
              </section>
              :
              //show only the faves news
              <section>
                {likesNews.length > 0 && 
                  <NewsList setLiked={setLiked} news={likesNews}/>}
              </section>
            }  
        <footer>

        </footer>
    </div>
  );
}

export default App;
