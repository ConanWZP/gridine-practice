import {createSlice} from "@reduxjs/toolkit";

interface IFiltersSlice {
    filteredResults: any[]
}

const initialState: IFiltersSlice = {
    filteredResults: []
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
                    return {
                        filteredResults: array.sort((a,b) =>  Number(a.flight.price.total.amount) - Number(b.flight.price.total.amount)  )
                    }

                case 'desc-price':
                    let array2 = [...flights]
                    return  {
                        filteredResults: array2.sort((a,b) =>  Number(b.flight.price.total.amount) - Number(a.flight.price.total.amount)  )
                    }

                case 'time':
                    let array3 = [...flights]
                    return {
                        filteredResults: array3.sort((a,b) =>  Number(a.flight.legs[0].duration + a.flight.legs[1].duration) - Number(b.flight.legs[0].duration + b.flight.legs[1].duration)  )
                    }
            }

        },
        filterStops: (state, action) => {
            const {flights, stops, maxQuantityStops} = action.payload
            // двойка должна быть заменена на
            debugger
            if (stops.length === maxQuantityStops || stops.length === 0) {
                state.filteredResults = flights
            } else {
                state.filteredResults= flights.filter(fl => stops.includes(fl.flight.legs[0].segments.length-1) && stops.includes(fl.flight.legs[1].segments.length-1) )
            }
            console.log('Полёты', flights)
            console.log(stops)
        }
    }
})

export const {sortFlightsBy, filterStops, setData} = filtersSlice.actions

export default filtersSlice.reducer