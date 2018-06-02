import React, {Component, Fragment} from 'react'
import '../App.css'
import  {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Player from "./Player";
import Teams from "./Teams";
import TeamPage from "./TeamPage";
import Navbar from "./Navbar";
import Articles from "./Articles";

import DynamicImport from './DynamicImport'
import Loading from "./Loading";

const Home = (props) => (
    <DynamicImport load={() => import('./Home')}>
        {(Component) => Component === null
            ? <Loading text='loading'/>
            : <Component {...props}/>
        }
    </DynamicImport>

)

class App extends Component {
  render() {
    return (
        <Router>
            <Fragment>
                <Navbar/>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/players' component={Player} />
                    <Route path='/teams' component={Teams} />
                    <Route exact path='/:teamId' component={TeamPage} />
                    <Route path='/:teamId/articles' component={Articles}/>
                    <Route render={() => (<h1 className="text-center">404, sorry</h1>)} />
                </Switch>
            </Fragment>
        </Router>

    )
  }
}

export default App;
