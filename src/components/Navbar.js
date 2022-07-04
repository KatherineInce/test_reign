import {useState} from 'react'

const Navbar = () => {
  //state for adding active class
  const [active,setActive] = useState('all')
  return (
    <div className='navbar'>
        <div id="all" className={`navbar__button ${active === 'all' && 'navbar__button--active'}`} onClick={e=>setActive(e.target.id)}>
            All
        </div>
        <div id="fav" className={`navbar__button ${active === 'fav' && 'navbar__button--active'}`} onClick={e=>setActive(e.target.id)}>
            My faves
        </div>
    </div>
  )
}

export default Navbar