import { 
    GET_COUNTRIES,
    GET_COUNTRIES_ID,
    GET_ACTIVITIES,
    GET_COUNTRIES_NAME,
    POST_ACTIVITY,
    FILTER_CONTINENT,
    FILTER_NAME,
    FILTER_POPULATION,
    GET_COUNTRY_NAME_ID
} from "../actions/types";

const initialState = {
    allCountries: [],
    countries:[],
    allActivities: [],
    countryDetail: [],
    contryName: []
}

const rootReducer = (state = initialState , action) => {
    switch(action.type){
        case GET_COUNTRIES:
            console.log('GET_COUNTRIES action called with payload:', action.payload);
            return{
                ...state,
                allCountries: action.payload,
                countries: action.payload,
                
            }
            
         
        case GET_COUNTRIES_ID:
            return{
                ...state,
                countryDetail: action.payload,
                
            }
         
        case GET_ACTIVITIES:
            return{
                ...state,
                allActivities: action.payload,
                
            }
        case GET_COUNTRIES_NAME:
                if(
                    action.payload.continent !== '' 
                ){
                    const allCountries = state.countries;
                    const countryFilter = action.payload.continent === 'All' ? 
                    allCountries 
                    : allCountries.filter(e => e.continent === action.payload.continent)
                    let finish = countryFilter.filter(e => e.name.toLowerCase()
                    .includes(action.payload.search.toLowerCase())
                    )
                    return{
                        ...state,
                        allCountries:finish
                    }
                }
                
/*                  const todos = state.allCountries

                if(action.payload) {
                let countryFilterName = todos.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()));
                
                return{
                    ...state,
                    allCountries: countryFilterName,
                    
                } 
            } else  {
                return{
                    ...state,
                    allCountries: state.countries
                    
                }
                
            }  */


            
            

        case GET_COUNTRY_NAME_ID:
            return{
                 ...state,
                 allCountries: action.payload,
                    
            }  

             
           

        case POST_ACTIVITY:
            return{
                ...state,
                allActivities: action.payload,
                    
            }

        


        case FILTER_CONTINENT:
            const allCountries = state.countries;
            const countryFilter = action.payload === 'All' ? 
            allCountries 
            : allCountries.filter(e => e.continent === action.payload)
            return {
                ...state,
                allCountries: countryFilter,
            }

        case FILTER_NAME:
                const orderName = action.payload === 'asc' ?
                [...state.allCountries].sort(function(a, b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                [...state.allCountries].sort(function(a, b) {
                    if(a.name > b.name) {
                        return -1;
                    }
                    if(b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    allCountries: orderName
                }




        case FILTER_POPULATION:
            const filterPopulation = action.payload === 'ascpop' ?
            [...state.allCountries].sort(function(a, b) {
                if(a.population < b.population) {
                    return 1;
                }
                if(b.population < a.population) {
                    return -1;
                }
                return 0;
            }) :
            [...state.allCountries].sort(function(a, b) {
                if(a.population < b.population) {
                    return -1;
                }
                if(b.population < a.population) {
                    return 1;
                }
                return 0;
            });
            return {
                ...state,
                allCountries: filterPopulation
            }    
            
            



            default: return{...state} 
         
}}

export default rootReducer;