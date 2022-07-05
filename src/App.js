import Logo from './components/Logo.js'
import Navbar from './components/Navbar'
import Selector from './components/Selector'
import {useState} from 'react'
function App() {

  //state for adding active class
  const [active,setActive] = useState('all')
  /*
    state for selector 
    active=true // display the dropdown
    option // the selected option of the dropdown
  */
  const [selector,setSelector] = useState({
    active:false,
    option:'Select your news'
  })
  return (
    <div className="App">
        <Logo/>

        <Navbar active={active} setActive={setActive}/>
        <section>
            <Selector selector={selector} setSelector={setSelector}/>
        </section>
        <footer>

        </footer>
    </div>
  );
}

export default App;
