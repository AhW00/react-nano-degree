import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import NotFound from './pages/NotFound'

class BooksApp extends React.Component {

  render() {
    return (
      <Switch>
        <Route path='/' exact>
          <Home></Home>
        </Route>
        <Route path='/search'>
          <Search></Search>
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    )
  }
}

export default BooksApp
