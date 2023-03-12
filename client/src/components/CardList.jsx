import React, { useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { getCountries } from "../actions/index.js";
import { getCountryName, filterContinent, filterPopulation, filterName} from "../actions/index.js";

import Card from "./Card.jsx";
import "./styles/cardList.css"
import { Link, useLocation,useHistory } from "react-router-dom";
import "./styles/nav.css"
import { AiOutlineLoading3Quarters } from "react-icons/ai";



 
function CardList({countries}){
/*   const allCountries = useSelector(state => state.countries); */


  const {search}=useLocation()
  const query = new URLSearchParams(search) // busca en el parametro de la url el query que haya
  const [loading, setLoading] = useState(true);
  const history = useHistory()
  const dispatch = useDispatch();
  const continent = query.get('continent')


   useEffect (()=>{
        dispatch(getCountries());
        setTimeout(() => {setLoading(false);
        }, 1000);
        query.delete('continent')
        history.push({search:query.toString()})
       
    },[dispatch])
/*   ----------FILTER BY NAME FOR SEARCHBAR---------------- */

const [countrySearch, setcountrySearch] = useState('')

    useEffect (()=>{
        dispatch(getCountryName(countrySearch));
      
    },[dispatch, countrySearch])


    const handleSubmit = (e) => {
 /*        event.preventDefault();
        setcountrySearch(event.target.value) */
        let continent = query.get('continent')
        e.preventDefault();
        setcountrySearch(continent !== '' && continent !== null  ? 
        {
          [e.target.name]:e.target.value,
          continent:continent
        }
        :{[e.target.name]:e.target.value,
          continent:'All'
        }
        );
    }



/* -------------- PAGINATED------------------------------- */

    const [currentPage, setCurrentPage] = useState(1); //inicia en la pagina número 1
    const [cardsPerPage, setCardsPerPage] = useState(8); // muestra hasta 8 cartas



    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = countries ? countries.slice(indexOfFirstCard, indexOfLastCard) : [];
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(countries.length / cardsPerPage); i++) {
    pageNumbers.push(i);
    }

/*     const pageNumbers = countries
  ? Array.from({ length: Math.ceil(countries.length / cardsPerPage) }, (_, i) => i + 1)
  : [];
 */


/* ---------------FILTERS---------------- */



const handleContinent = (e)=>{ 
  query.set('continent',e.target.value)
  history.push({search:query.toString()})
  dispatch(filterContinent(e.target.value))
  setCurrentPage(1)
  
}



const handleName = (e) =>{
  console.log(e.target.value)
  
    dispatch(filterName(e.target.value))
  
}

const handlePopulation = (e) =>{
  console.log(e.target.value)
  
    dispatch(filterPopulation(e.target.value))
  
}



    return (

/*     ------------------------NAV--------------------------
 */        <div >

                <div className="nav">
                    <div className="rutasNavContainer">
                        <Link to ="/" className = "rutasNav">
                        <div>Landing</div>
                        </Link>

                        <Link to ="/home" className = "rutasNav">
                        <div>Home</div>
                        </Link>

                        <Link to ="/activities" className = "rutasNav">
                        <div>Activities</div>
                        </Link>

                        <Link to ="/createNewActivity" className = "rutasNav2">
                        <div>Create New Activity</div>
                        </Link>
                        
                    </div>
                
                <div>
                    <input className="buscador"
                      name="search"
                      placeholder="  Search country.."
                      onChange={(event)=>handleSubmit(event)}>

                    </input>
                </div>

                </div>

                
                
  
    <div className="countriesFilters">

      <div className="filters">
        <div>     
          <select 
          className ="select"         
          onChange={(e) => handleContinent(e)}>
            <option value="" selected disabled >Filter by continent</option>
            <option value='All' >All continents</option>
            <option value='Africa' >Africa</option>
            <option value='Americas' >America</option>
            <option value='Europe' >Europe</option>
            <option value='Oceania' >Oceania</option>
            <option value='Asia' >Asia</option>
          </select>
        </div>

        <div >
          <select 
          className ="select"
          
          onChange={(e) => handleName(e)}>
            <option value="" selected disabled > Order alphabetically</option>
            <option value="asc">Ascending names</option>
            <option value="des">Descending names</option>
          </select>
        </div>

        <div  >
          <select 
          className ="select"
           
          onChange={(e) => handlePopulation(e)}>
            <option value="" selected disabled >Order by population</option>
            <option value="ascpop">Higher population</option>
            <option value="despop">Lower population</option>
          </select>
        </div>


        
      </div>

{/* ----------------------CARTAS---------------------------------
 */}

      <div className="containerExtreme">

          <div className="listCards">
            
                {loading ? ( <p className="loading">Loading..</p>
             
              
                ) : (
                currentCards && currentCards.map((e) => (
              <Card key={e.id} {...e} />
            )))}
            
          </div>

      </div>
      <ul className="paginated">
              
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="buttonPaginated"
              >
              🢘
              <i className="fas fa-chevron-left"></i>
              </button>
            

            
            {pageNumbers.map((pageNumber) => (
              <div key={pageNumber} className="">
                <button 
                className={`buttonPaginated${pageNumber === currentPage ? " active" : ""}`}
                onClick={() => handlePageChange(pageNumber)} 
                >
                  {pageNumber}
                </button>


              </div>
            ))}
              
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pageNumbers.length}
                  className="buttonPaginated"
                >
                  
                  🢚
                  <i className="fas fa-chevron-right"></i>
                </button>
              
      </ul>
  </div>

 {/* <AiOutlineLoading3Quarters className="loading"/> */}




{/*         currentCards tiene allCountries pero filtrado segun los elementos
        que se mostraran en la pagina seleccionada

        realizo mapeo de variable que tiene los elementos que se mostraran en cada pagina */}


  {/*           mapeo pageNumbers que tiene el conjunto de números de paginas
          en funcion de la cantidad de cartas */}

    
  {/*             al hacer click se actualiza con handlePageChange el estado
            currentPage con el número de pagina y currentCards actualizaautomáticamente el 
            cambio de pagina */}
  


    
        
            {/* <div className="listCards">
                {allCountries.map(e => {
                    return(
                        <div>
                            <Card 
                            key={e.id}
                            id = {e.id}
                            name = {e.name}  
                            img = {e.img}
                            capital = {e.capital}
                            continent = {e.continent}
                            population = {e.population}
                            >
                            </Card>
                        </div>
                        
                    )
                  })}
            </div> */}


        </div>
  
    )

}

export {CardList};
