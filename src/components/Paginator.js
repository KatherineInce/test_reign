import React,{useEffect, useState} from 'react'

const Paginator = ({totalPages,setCurrentPage,currentPage}) => {
  
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
    //console.log(currentPage)
    let prevPage = Number(currentPage) - 1;
    let nextPage = Number(currentPage) + 1;
    let tempNumbers = []
    if(currentPage >= 5 && currentPage < totalPages - 4)
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
            number: totalPages
        })
    }
    else if(currentPage < 5 && totalPages > 7){
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
            number: totalPages
        })
    }
    else if(totalPages <= 7){
        for(let indexPage = 1; indexPage <= totalPages; indexPage++)
        {
            tempNumbers.push({
                class: 'paginator__item',
                number: indexPage
            })
        }
    }
    else{
        console.log('IN HERE')
        tempNumbers.push({
            class: 'paginator__item',
            number: 1
        })
        tempNumbers.push({
            class: 'paginator__infinite',
            number: '...'
        })
        for(let indexPage = totalPages - 4; indexPage <= totalPages; indexPage++)
        {
            tempNumbers.push({
                class: 'paginator__item',
                number: indexPage
            })
        }
    }
    



    setNumbers(tempNumbers)
    if(currentPage > 1)
    {
        //if current page is greater then 1 then the previous arrow is enable
        //if current page is equal to total pages then the next button is disable else is enable
        setArrows({
            next: currentPage === totalPages ? false : true ,
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
  }, [currentPage])
  
  //function change the value of the currentPage
  //type is to know if is previous or next button
  const setValueCurrentPage = (type) => {
    if(arrows[type])
    {
        setCurrentPage(type === 'previous' ? currentPage-1 : currentPage+1)
    }
  }

  return (
    <div className='paginator'>
        <div onClick={()=> setValueCurrentPage('previous')}  className={`paginator__item ${ !arrows.previous && 'paginator__item--disabled'}`}>
            <i className="paginator__icon__prev"></i>
        </div>
       {
         numbers.map((number,index) => 
            <div key={index} onClick={()=> number.number !== '...' && setCurrentPage(number.number)} className={`${number.class} ${currentPage === number.number && 'paginator__item--active'}`}>{number.number}</div>
         )
       }
        {/*<div className="paginator__item paginator__item--active">1</div>
        <div className="paginator__item">2</div>
        <div className="paginator__infinite">...</div>
        <div className="paginator__item">4</div>
        <div className="paginator__item">5</div>
        <div className="paginator__infinite">...</div>
        <div className="paginator__item">7</div>*/}
        <div onClick={()=> setValueCurrentPage('next')} className={`paginator__item ${ !arrows.next && 'paginator__item--disabled'}`}>
            <i className="paginator__icon__next"></i>
        </div>
    </div>
  )
}

export default Paginator