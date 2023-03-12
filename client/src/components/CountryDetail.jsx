import "./styles/countryDetail.css";
import React, { useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { getCountryDetail } from "../actions/index.js";
import {useParams} from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



function CountryDetail({actividades}){
    const [loading, setLoading] = useState(true);

    const countryId = useSelector(state => state.countryDetail);
   

  
   
    const dispatch = useDispatch();

    let {id} = useParams()

    useEffect (()=>{
        dispatch(getCountryDetail(id));
        setTimeout(() => {setLoading(false);
        }, 1000);
       
    },[dispatch])


    return(


        <div className="containerExtremeMasterUltra">
        <div className="countryDetailContainer">
            <div className="imgtittle">
                <img className="imgCountryDetail" src= {countryId.img} alt="No se encontró la imagen"/>
                <h2 className="countryDetailTittle">{countryId.name}</h2>
            </div>
        
        
            <div className="listDetailsContainer">
                
                    <ul className="listDetails">
                        <h3 className="detaisTittle">Country Data:</h3>
                        <p>Code: </p>
                        <hr></hr>
                        <p>Continent: </p>
                        <hr></hr>
                        <p>Capital:</p>
                        <hr></hr>
                        <p>Subregion: </p>
                        <hr></hr>
                        <p>Area: </p>
                        <hr></hr>
                        <p>Population:</p>
                    </ul>   
                    <ul className="listDetails2">
                        <p>{countryId.id}</p>
                        <hr></hr>
                        <p>{countryId.continent}</p>
                        <hr></hr>
                        <p>{countryId.capital}</p>
                        <hr></hr>
                        <p>{countryId.subregion}</p>
                        <hr></hr>
                        <p>{countryId.area}</p>
                        <hr></hr>
                        <p>{countryId.population}</p>
                    </ul>
            </div>          

        </div> 
        <div className="countryActivitiesContainer">
                <h2 className="countryActivitiesContainerTittle">Activities Available</h2>

                {loading ? (
                    
              
                    <p className="loading">Loading..</p>
                    ) : (
                actividades && actividades.map(e =>
                    
                    <li className="activities"> {e.name}
                        
                    </li>
                    )
                    )}
                
            
            </div>
        </div>
        

        
    )
}

      {/* <AiOutlineLoading3Quarters className="loadingDetail"/> */}

export {CountryDetail};
