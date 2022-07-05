import React from 'react'
import imgAngular from '../images/angular.png'
import imgReact from '../images/react.png'
import imgVue from '../images/vue.png'


const Selector = ({selector,setSelector}) => {
  return (
    <div className='list'>
      <div className='list__placeholder' onClick={()=>setSelector({
        ...selector,
        active: !selector.active
      })}>
        <span className='list__placeholder__text'>{selector.option}</span>
        <span className='list__placeholder__icon'>
          <i className={`list__icon ${selector.active && 'list__icon--active'}`}/>
        </span>
      </div>
      { selector.active &&
        <div className='list__options'>
          <div className='list__option' onClick={()=>setSelector({
        active:false,
        option: 'Angular'
      })}>
            <img src={imgAngular} alt="img angular" />
            <p>Angular</p>
          </div>
          <div className='list__option'  onClick={()=>setSelector({
        active:false,
        option: 'Reacts'
      })}>
            <img src={imgReact} alt="img react" />
            <p>Reacts</p>
          </div>
          <div className='list__option'  onClick={()=>setSelector({
        active:false,
        option: 'Vuejs'
      })}>
            <img src={imgVue} alt="img vue" />
            <p>Vuejs</p>
          </div>
        </div>
      }
    </div>
  )
}

export default Selector