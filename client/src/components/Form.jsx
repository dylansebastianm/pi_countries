    import React, { useEffect, useState} from "react";
    import {useDispatch, useSelector} from "react-redux";
    import { postActivity } from "../actions/index.js";
    import { getCountryNameId } from "../actions/index.js";


        
    import "./styles/form.css"


    function Form(){
        const [formValues, setFormValues] = useState(
            {
                name: "",
                dificulted: 0,
                duration: 0,
                season: "",
                country: ""
            }
        )

        const dispatch = useDispatch();

       /*  useEffect(() => {
            dispatch(postActivity(formValues));
        }, [formValues, dispatch]); */
        

        const handleSubmit = (event) => {
            event.preventDefault();
            let valores={
                name: event.target[0].value,
                duration: event.target[1].value,
                dificulted: event.target[2].value,
                season: event.target[3].value,
                country: selectedCountry.countries

           } 
           console.log("name", nameValidation)
           console.log("pais selected" ,selectedCountry.countries)
           console.log("SELECCIÓN" ,valores)


           if(nameValidation.length > 4 && selectedCountry.countries.length > 0){

           
            setFormValues({
                name: event.target[0].value,
                duration: event.target[1].value,
                dificulted: event.target[2].value,
                season: event.target[3].value,
                country: selectedCountry.countries

            })
            dispatch(postActivity(valores));
            
            alert(
                "Activity created successfully"
            )
                        setTimeout(() => {
                window.location.href = `/home`
                
            }, 1000); 
            
        } else {
            alert(
                "All fields have to completed"
            );
          }  
/*             console.log(valores)
            event.target[0].value = "";
            event.target[1].value = ""; 
            event.target[2].value = "";
            event.target[3].value = "";
            event.target[4].value = ""; */  

        }






    //---------------------BUSQUEDA PARA AGREGAR PAÍS

    const allCountries = useSelector(state => state.allCountries);
    const [countrySearch, setcountrySearch] = useState("")

    useEffect (()=>{
        dispatch(getCountryNameId(countrySearch));
    
    },[dispatch, countrySearch])


    const handleSubmit2 = (event) =>{
        setcountrySearch(event.target.value)
        
    }

/* -------ID SELECTED FOR POST OF ACTIVITY----------- */

 const [selectedCountry, setSelectedCountry] = useState({
    countries:[]}
  );

  const handleCountryId = (event) => {
  const countryId = event.target.value;
  console.log("PAISES SELECCIONADOS" ,selectedCountry.countries)
  setSelectedCountry({
   countries: [...selectedCountry.countries, countryId]});
} 


/* const handleCountryId = (event) => {
    const countryId = event.target.value;
    setSelectedCountry((prevSelectedCountry) => {
      // si el país ya está seleccionado, se elimina del estado
      if (prevSelectedCountry.countries.includes(countryId) && prevSelectedCountry.countries.length > 1) {
        return {
          countries: prevSelectedCountry.countries.filter((id) => id !== countryId),
        };
      }
      // si el país no está seleccionado, se agrega al estado
      return {
        countries: [...prevSelectedCountry.countries, countryId],
      };
    });
  }; */
  



function sliceName(name){
    const countrySlice = name.slice(0,10)
    return countrySlice
}



/* ---------------VALIDACIÓN DE FORMULARIO--------------------- */

  const [nameValidation, setnameValidation] = useState("");

    
  

return(
    <form onSubmit={(event) =>handleSubmit(event)}>
        <div className="background">
            <div className="formContainerExtreme">
                    <div className="formContainer">
                        <div className="formList1">

                                <div className="form">
                                    <strong>Name:</strong>
                                    <p className="pForValidation">Must contain at least 3 letters</p>
                                    <input
                                    className={nameValidation.length < 4 && nameValidation !== "" ? "validationErrorInput" : "input"}
                                    placeholder="tennis, soccer, swimming..."
                                    
                                    name="name" 
                                    value={nameValidation}
                                    onChange={(event) => setnameValidation(event.target.value)}
                                    
                                    />
                                    {nameValidation.length < 4 && nameValidation !== "" ? <p className="validationError">Name is not valid</p> : null}
                                </div>
                                    

                                <div className="form">
                                <strong>Duration:</strong>
                                <p className="pForValidation">Hours between 1 and 6</p>
                                <select 
                                className="input" 
                                name="duration"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                </select>
                                </div>

                                <div className="form">
                                <strong>Difficulty:</strong>
                                <p className="pForValidation">Choose a level between between 1 and 4</p>
                                <select
                                className="input" 
                                name="dificulted"
                                /* value={selectForm}
                                onChange={(event) => setselectForm(event.target.value)} */
                                >
                                   {/*  {!selectedValue && (
                                    <option value="" disabled>
                                    Selecciona una opción
                                    </option>
                                    )}  */}        
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </select>
                                
                               
                                </div>
                        </div>

                        <div className="formList2">
                                <div>
                                    <div className="form">
                                    <strong  >Season:</strong>
                                    <p className="pForValidation">Choose the season</p>
                                    <select 
                                     className="input" 
                                    name="season"
                                    >
                                        <option>Autumn</option>
                                        <option>Winter</option>
                                        <option>Summer</option>
                                        <option>Spring</option>
                                                                           
                                    </select>
                                    </div>

                                    <div className="form">
                                    <strong>Country :</strong>
                                    <p className="pForValidation">Choose only one available country</p>
                                    <input
                                    placeholder="Search country"
                                    className="input" 
                                    name="countrySelected"
                                    onChange={(event)=>handleSubmit2(event)}
                                    />
                                    
{/*                                     {!allCountries.includes(countrySearch)  ?  <p className="validationError">No se encontro el pais</p> : null}
 */}                                    
                                </div>
                                

                                <button  
                                className="buttonForm"
                                type="submit">  
                                      ¡Send new activity!  
                                </button>

                            </div>

                            
                        </div>
                    </div>

                <div className="formContainer2">
                                {allCountries.slice(0,6).map(e => {
                                return(
                                
                                    <div 
                                        className="aux"
                                        key={e.id}>
                                        <img src={e.img} 
                                        className="imgCountrySelected"></img>
                                        <p className="nameLarge">{sliceName(e.name)}</p>
                                        

                                        <input 
                                        
                                        type="checkbox" 
                                        name="countries"
                                        value={e.id} 
                                        onClick={handleCountryId}
                                        className="check"

                                        ></input>                     
                                    </div>
                            
                                 
                                )
                                })}
                </div>

            </div>

                
        </div>

    </form>
        )
    }

    export {Form};


