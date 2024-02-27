import './App.css'
import Signup from './pages/signup/Signup'
import Logo from './assets/images/logo.png';
function App() {

  return (
  <>
    <header className="w-full float-left flex justify-between px-6 py-4">
      <img src={Logo} alt=""/>
    </header>
    <div className="w-full float-start flex justify-center">
        <div className="w-full float-start grid grid-cols-1 lg:grid-cols-2 px-5 py-10 max-w-[1480px]">
            <div>
                &nbsp;
            </div>
            <div className="w-full float-left flex justify-center lg:justify-end">
               <Signup/>   
            </div>
        </div>
     </div>
  </>
  )
}

export default App
