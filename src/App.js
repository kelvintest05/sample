
import './App.css';
import AddNewCourt from './Pages/AddNewCourt';
import CourtUserViewPage from './Pages/CourtUserViewPage';
import Home from './Pages/Home';
import Login from './Pages/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Mybookings from './Pages/Mybookings';
import { AdminAuth, LoginAuth, UserAuth } from './Authorization/authorization';

function App() {
  return (
<>
<BrowserRouter>
<Routes>
<Route element={<LoginAuth/>}>
<Route path='/' element={<Login/>}/>
</Route>


{/* user route */}
<Route element={<UserAuth/>}>
<Route path='/home' element={<Home/>}/>
<Route path='/courtUserViewPage/:id' element={<CourtUserViewPage/>}/>
<Route path='/mybookings' element={<Mybookings/>}/>
</Route>


{/* // adminRoute */}
<Route element={<AdminAuth/>}>
<Route path='/addNewCourt' element={<AddNewCourt/>}/>
</Route>
</Routes>

</BrowserRouter>

</>



  );
}

export default App;
