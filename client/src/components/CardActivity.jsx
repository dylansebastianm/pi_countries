import React from "react";
import "./styles/activity.css"

function CardActivity({ name,  dificulted, duration, season, country, countryImg}) {


    function sliceName(name){
        const countrySlice = name.slice(0,10)
        return countrySlice
    }

    
    return(
            
       
            <div className="cardActivityContainer">
                <h3 className="activityTittle">ACTIVITY AVAILABLE</h3>

                <div className="activityDetailList">
                    <ul className="listActivity1">
                        <p>Name: </p>
                        <hr></hr>
                        <p>Duration: </p>
                        <hr></hr>
                        <p>Difficulty: </p>
                        <hr></hr>
                        <p>Season: </p>
                    </ul>
                    <ul className="listActivity2">
                        <p>{name}</p>
                        <hr></hr>
                        <p>{duration}</p>
                        <hr></hr>
                        <p>{dificulted}</p>
                        <hr></hr>
                        <p>{season}</p>
                    </ul>


                    <div className="listActivity3">
                        {console.log("PAISES",country)}
                       
                        {country.length > 1 ? country.map(c=> (

                            <div className="auxCountryForActivity">
                            <img 
                            className="imgCountryActivity"
                            src = {c.img}></img>
                            <h3> {sliceName(c.name)} </h3>
                            </div>
                        )
                           
                        
                           
                        ) : 
                        <div >
                            <img 
                            className="imgCountryActivity"
                            src = {country[0].img}></img>
                            <h3> {sliceName(country[0].name)} </h3>
                        </div>}
                    </div>
                  
                     
                    
                </div>
                
            </div>
    )
}

export {CardActivity};