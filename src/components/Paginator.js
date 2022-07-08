import React,{useEffect, useState} from 'react'

const Paginator = ({pages,setPages}) => {
  
  //states of the next and previous arrows this is for disable or enable
  const [arrows, setArrows] = useState(
    {
        previous: false,
        next: true
    }
  )

  //state with the numbers of pages and the class 
  const [numbers,setNumbers] = useState([])

  useEffect(() => {
    let prevPage = Number(pages.currentPage) - 1;
    let nextPage = Number(pages.currentPage) + 1;
    let tempNumbers = []
    if(pages.currentPage >= 5 && pages.currentPage < pages.totalPages - 4)
    {
        tempNumbers.push({
            class: 'paginator__item',
            number: 1
        })
        tempNumbers.push({
            class: 'paginator__infinite',
            number: '...'
        })   
        for(let indexPage = prevPage; indexPage <= nextPage; indexPage++)
        {
            tempNumbers.push({
                class: 'paginator__item',
                number: indexPage
            })
        }
        tempNumbers.push({
            class: 'paginator__infinite',
            number: '...'
        })
        tempNumbers.push({
            class: 'paginator__item',
            number: pages.totalPages
        })
    }
    else if(pages.currentPage < 5 && pages.totalPages > 7){
        for(let indexPage = 1; indexPage <= 5; indexPage++)
        {
            tempNumbers.push({
                class: 'paginator__item',
                number: indexPage
            })
        }
        tempNumbers.push({
            class: 'paginator__infinite',
            number: '...'
        })
        tempNumbers.push({
            class: 'paginator__item',
            number: pages.totalPages
        })
    }
    else if(pages.totalPages <= 7){
        for(let indexPage = 1; indexPage <= pages.totalPages; indexPage++)
        {
            tempNumbers.push({
                class: 'paginator__item',
                number: indexPage
            })
        }
    }
    else{
        tempNumbers.push({
            class: 'paginator__item',
            number: 1
        })
        tempNumbers.push({
            class: 'paginator__infinite',
            number: '...'
        })
        for(let indexPage = pages.totalPages - 4; indexPage <= pages.totalPages; indexPage++)
        {
            tempNumbers.push({
                class: 'paginator__item',
                number: indexPage
            })
        }
    }
    
    setNumbers(tempNumbers)
    if(pages.currentPage > 1)
    {
        //if current page is greater then 1 then the previous arrow is enable
        //if current page is equal to total pages then the next button is disable else is enable
        setArrows({
            next: pages.currentPage === pages.totalPages ? false : true ,
            previous: true
        })
    }
    else{
        //if current page is less or equal to 1 then the previous arrow is disable
        //next would be active if current page is 1
        setArrows({
            next: true,
            previous: false
        })
    }
  }, [pages])
  
  //function change the value of the currentPage
  //type is to know if is previous or next button
  const setValueCurrentPage = (type) => {
    if(arrows[type])
    {
        setPages({
            ...pages,
            currentPage: type === 'previous' ? pages.currentPage-1 : pages.currentPage+1
        })
    }
  }

  return (
    <div className='paginator'>
        <div onClick={()=> setValueCurrentPage('previous')}  className={`paginator__item ${ !arrows.previous && 'paginator__item--disabled'}`}>
            <i className="paginator__icon__prev"></i>
        </div>
       {
         numbers.map((number,index) => 
            <div key={index} onClick={()=> number.number !== '...' && setPages({...pages, currentPage:number.number})} className={`${number.class} ${pages.currentPage === number.number && 'paginator__item--active'}`}>{number.number}</div>
         )
       }
        <div onClick={()=> setValueCurrentPage('next')} className={`paginator__item ${ !arrows.next && 'paginator__item--disabled'}`}>
            <i className="paginator__icon__next"></i>
        </div>
    </div>
  )
}

export default Paginator