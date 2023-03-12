import './App.css';

import { Route, BrowserRouter } from "react-router-dom";
import { Nav } from './components/Nav';
import { CountryDetail } from './components/CountryDetail';
import { Form } from './components/Form';
import { CardList } from './components/CardList';
import {LandingPage} from './components/LandingPage';
import {ActivityList} from './components/ActivityList';
import {Footer} from './components/Footer';

import React, { useEffect} from "react";
import { getActivities } from "../src/actions/index";
import {useDispatch, useSelector} from "react-redux";






function App() {
  const allActivities = useSelector(state => state.allActivities);
  const allCountries = useSelector(state => state.allCountries);
  const dispatch = useDispatch();


  useEffect (()=>{
    dispatch(getActivities());
    
   
},[dispatch])


  return (
    <div className="App">
      <BrowserRouter>

      <Route exact path="/" >
         
         <LandingPage/>   
        </Route>

        <Route exact path="/home" >
        
         <CardList
         countries={allCountries}
         />
         <Footer/>      
        </Route>

        <Route exact path="/activities" >
         <Nav/>
         <ActivityList
         actividades= {allActivities}
         />
         <Footer/>              
        </Route>

        <Route path="/countrydetail/:id" >  
          <Nav/>
          <CountryDetail
          actividades= {allActivities}
          />
          <Footer/>      
         </Route> 

         <Route exact path="/createNewActivity" >
          <Nav/>
          <Form/>
          <Footer/>      
         </Route> 



      </BrowserRouter>
    </div>
  );
}

export default App;
