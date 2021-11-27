import React, { Component } from 'react'
import { Main, Quest } from './pages'
import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom"
import { createBrowserHistory } from "history"

class App extends Component {
  render() {
    const history = createBrowserHistory()
    const Redirect = () => {
      history.replace('/myself')
      return <Main history={history} />
    }

    const RedirectQuest = () => {
      history.replace('/my-quest/1')
      return <Quest history={history} />
    }
    
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route  path='/myself' element={<Main history={history} />} />
            <Route  path='/my-quest/:step' element={<Quest history={history}/>} />
            <Route  path='/my-quest/' element={<RedirectQuest/>} />
            <Route  path='*' element={<Redirect />} />
          </Routes>
        </Router>
      </div>
    );
   }
}

export default App;
