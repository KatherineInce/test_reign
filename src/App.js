import Logo from './components/Logo.js'
import Navbar from './components/Navbar'
import Selector from './components/Selector'
import NewsList from './components/NewsList'
import Paginator from './components/Paginator'
import Messages from './components/Messages'
import Loading from './components/Loading'

import {useState, useEffect} from 'react'
function App() {

  //get the information of the local storage of the selector 
  //active validate the display of the elements
  //option is the selected element (react,angular or vue)
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

  //message of error of the api
  const[message,setMessage] = useState(null)

  //loading active or inactive
  const[loading,setLoading] = useState(false)

  //state for Navbar adding active class to 'all' or 'faves'
  const [activeNav,setActiveNav] = useState('all')

  //state of Current selected page and total of pages
  const [pages, setPages] = useState({
    currentPage: 1,
    totalPages: 0
  })

    /*
    state for selector 
    active=true // display the dropdown
    option // the selected option of the dropdown
  */
  const [selector,setSelector] = useState(storeSelector)

  //all current data of the news in page
  const [allNews, setAllNews] = useState( {
    reactjs:[],
    angular:[],
    vuejs:[]
  })

  //liked news
  const [likesNews, setLikesNews] = useState(storeLikedNews)

  const [temporalLikesNews, setTemporalLikesNews] = useState([])

  //validate the changes of the navigation bar (all or faves) the array of likes news and the selector (react,vue or angular)
  //Change the currentPage and totalPage
  useEffect(() => {
    if(activeNav === 'all')
    {  //the api allways return 50 pages, so i didn't see necesary search for the value
      //the Paginator is dynamic so if the quantity of pages change i can make it dynamic 
      allNews[(selector.option).toLowerCase()] 
      ?
      setPages({
        currentPage: 1,
        totalPages: 50
      })
      :
      setPages({
        currentPage: 1,
        totalPages: 0
      })
    }
    else
    {
      //Condition if is greater than 20 news then will be more than 1 page (there are 20 news per page)
      setPages({
        currentPage: 1,
        totalPages: likesNews.length%20>0 ? Math.floor((likesNews.length/20) + 1) : Math.floor(likesNews.length/20)
      })
    }
  }, [selector.option,activeNav])
  
 //slice the array of likes news for pagination
  useEffect(()=>{
    if(activeNav === 'fav')
      setTemporalLikesNews(likesNews.slice((pages.currentPage - 1) * 20, pages.currentPage * 20))
  },[pages])

  //validate the changes of the currentPage and the selector (react,vue or angular)
  //Change the the array of all news
  useEffect(()=>{
    if(activeNav === 'all')
      if(selector.option !== 'Select your news')
      {
        //call to the api
        setData()
      }
       //captures any changes of the selector state and assign it to the local storage
       localStorage.setItem("selector",JSON.stringify(selector));
  },[selector.option,pages.currentPage,activeNav]);

  //validate the array of likes news
  //save in the local storage
  useEffect(()=>{
     localStorage.setItem("likesNews",JSON.stringify(likesNews))
     if(activeNav === 'fav')
      setPages({
        currentPage: 1,
        totalPages: likesNews.length%20>0 ? Math.floor((likesNews.length/20) + 1) : Math.floor(likesNews.length/20)
      })
  },[likesNews]);

  //function for obtain the data of the news
  const setData = async () =>{
      setAllNews( {
        reactjs:[],
        angular:[],
        vuejs:[]
      })
      setLoading(true)
      let response =  await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${(selector.option).toLowerCase()}&page=${Number(pages.currentPage) - 1}`);
      let data = await response.json()
      let likesFiltered = likesNews.filter(like => like.type === (selector.option).toLowerCase())
      if(data.hits)
      {
        setLoading(false)
        setMessage(null)
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
      else{
        setLoading(false)
        setMessage("We having trouble to obtain the required data")
      }
  }

  //function that set the liked news  
  const setLiked = id =>{
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
                <div className='inline'>
                  <Selector selector={selector} setSelector={setSelector}/> 
                { loading &&  
                  <Loading/>
                }
                </div>
                {
                  message ?
                    <Messages>{message}</Messages>  
                  :
                  (allNews[(selector.option).toLowerCase()] && allNews[(selector.option).toLowerCase()].length > 0 &&
                  <NewsList 
                    setLiked={setLiked} 
                    news={allNews[(selector.option).toLowerCase()]}
                  />)
                }
              </section>
              :
              //show only the faves news
              <section>
                {likesNews.length > 0 ? 
                  <NewsList setLiked={setLiked} news={temporalLikesNews}/>
                  :
                  <Messages>You have not selected favorites yet</Messages>  
                }
              </section>
            }  
        <footer>
          {
            ((activeNav === 'all' && !message && allNews[(selector.option).toLowerCase()] && allNews[(selector.option).toLowerCase()].length > 0) || (activeNav === 'fav' && likesNews.length > 0)) && pages.totalPages > 1
            ?
            <Paginator pages={pages} setPages={setPages} />
            :null
          }
        </footer>
    </div>
  );
}

export default App;
