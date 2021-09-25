import './App.css';
import {Provider} from 'react-redux'
import {BrowserRouter as Router , Route ,Switch} from 'react-router-dom'
import Content from './Components/Content';
// import Store from './Components/redux/Store';
import Header from './Components/Header';
import AdminPanel from './Components/AdminPanel';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import BannerForm from './Components/BannerForm';

// import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

function App() {

  return (

    <div className="App">

    <Router>
 
    <Header/>

     <Switch>

    <Route path="/" exact component={Content}/>

    <Route path="/admin" exact component={AdminPanel} />

    <Route path="/admin/upload" exact component={BannerForm} />

    </Switch>

   </Router>
    

    </div>
  )

}

export default App;
