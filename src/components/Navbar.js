import {useState} from 'react'

const Navbar = () => {
  //state for adding active class
  const [active,setActive] = useState('all')
  return (
    <div className='navbar'>
        <div id="all" className={`navbar__button ${active === 'all' && 'navbar__button--active'}`} onClick={e=>setActive(e.target.id)}>
            <span className={`navbar__text ${active === 'all' && 'navbar__text--active'}`}>All</span>
        </div>
        <div id="fav" className={`navbar__button ${active === 'fav' && 'navbar__button--active'}`} onClick={e=>setActive(e.target.id)}>
            <span className={`navbar__text ${active === 'fav' && 'navbar__text--active'}`}>My faves</span>
        </div>
    </div>
  )
}

export default Navbar