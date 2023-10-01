import {createSlice} from "@reduxjs/toolkit";

interface IFiltersSlice {
    filteredResults: any[],
    minPriceRange: number,
    maxPriceRange: number
}

const initialState: IFiltersSlice = {
    filteredResults: [],
    minPriceRange: 0,
    maxPriceRange: 300000
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.filteredResults = action.payload
        },
        sortFlightsBy: (state, action) => {
            debugger
            const {flights, sortValue} = action.payload
            console.log(flights)
          //  debugger
            switch (sortValue) {
                case 'asc-price':
                    let array = [...flights]
                    state.filteredResults = array.sort((a,b) =>  Number(a.flight.price.total.amount) - Number(b.flight.price.total.amount)  )
                    break

                case 'desc-price':
                    let array2 = [...flights]
                    state.filteredResults = array2.sort((a,b) =>  Number(b.flight.price.total.amount) - Number(a.flight.price.total.amount)  )
                    break

                case 'time':
                    let array3 = [...flights]
                    state.filteredResults = array3.sort((a,b) =>  Number(a.flight.legs[0].duration + a.flight.legs[1].duration) - Number(b.flight.legs[0].duration + b.flight.legs[1].duration)  )
                    break
            }

        },
        filterStops: (state, action) => {
            const {flights, stops, maxQuantityStops} = action.payload
            // двойка должна быть заменена на
            debugger
            if (stops.length === maxQuantityStops || stops.length === 0) {
                state.filteredResults = flights
            } else {
                state.filteredResults = flights.filter(fl => stops.includes(fl.flight.legs[0].segments.length-1) && stops.includes(fl.flight.legs[1].segments.length-1) )
            }
            console.log('Полёты', flights)
            console.log(stops)
        },
        filterCompanies: (state, action) => {
            const {flights, companies, arrayWithUniqCompany} = action.payload
            debugger
            if (companies.length === arrayWithUniqCompany.length || companies.length === 0) {
                state.filteredResults = flights
            } else {
                state.filteredResults = flights.filter(fl => companies.includes(fl.flight.carrier.caption ) )
            }

        },
        filterByPrice: (state, action) => {
            const {flights, minValue, maxValue} = action.payload
            state.filteredResults = flights.filter(fl => (+fl.flight.price.total.amount >= minValue) && (+fl.flight.price.total.amount <= maxValue) )
            state.minPriceRange = minValue
            state.maxPriceRange = maxValue

        }
    }
})

export const {sortFlightsBy, filterStops, setData, filterCompanies, filterByPrice} = filtersSlice.actions

export default filtersSlice.reducer