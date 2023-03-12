import React, { useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { getActivities } from "../actions/index.js";
import {CardActivity} from "./CardActivity";
/* import "./styles/activityList.css"
 */ 
import { AiOutlineLoading3Quarters } from "react-icons/ai";



function ActivityList({actividades}){
 /*  const allActivities = useSelector(state => state.allActivities); */
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getActivities());
      setTimeout(() => {setLoading(false);
      }, 1000);

    },[dispatch])
      
    


  

    return (
        <div>
          <div className="activityList">
          
          {loading ? (
             
             <p className="loading">Loading..</p>

             ) : (
            actividades.map(e => 
              e.countries.length > 0 ? (
                <CardActivity
                  key={e.id}
                  name={e.name}
                  duration={e.duration}
                  season={e.season}
                  dificulted={e.dificulted}
                  country={e.countries}
                />
              ):null
             
            ))}
          </div>
        </div>
      );
    }

{/* <AiOutlineLoading3Quarters className="loading"/> */}
export {ActivityList};


/* 
                            {console.log("Activity:", e)}
                            {console.log("Countries:", e.countries)}
                            {console.log("First Country Name:", e.countries[0].name)}
                            {console.log("First Country Image:", e.countries[0].img)} */