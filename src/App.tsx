import './App.scss'
import dataMock from './flights.json'
import SortBar from "./components/SortBar/SortBar.tsx";
import FlightItem from "./components/FlightItem/FlightItem.tsx";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "./hooks/customHooks.ts";
import {sortFlightsBy} from './redux/slices/filtersSlice.ts';

const App = () => {


   // const a = data.result.flights.map((fl) => fl.flight.carrier.caption)
    // let a = data.result.flights.filter((fl) =>
    // console.log(fl.flight.legs[0]?.segments[1]?.stops !== 0) )
    //  console.log(a[0].flight.legs)
  //  console.log([...new Set(a)]) // десять уникальных компаний
    const data: any = dataMock

    const firstLegSegments = data?.result.flights.map((fl: any) => fl.flight.legs[0].segments.length)
    const secondLegSegments = data.result.flights.map((fl: any) => fl.flight.legs[1].segments.length)
    const maxQuantityStops = Math.max(...firstLegSegments, ...secondLegSegments) - 1 // -1 т.к. длина сегментов = 1 - это без пересадок
    console.log(maxQuantityStops)
    const arrayWithQuantityStops = []
    for (let i = 1; i <= maxQuantityStops; i++) {
        arrayWithQuantityStops.push(i)
    }

    const dispatch = useAppDispatch()
    const [sortValue, setSortValue] = useState('asc-price')
    const [stops, setStops] = useState<number[]>([])
    const [chosenCompanies, setChosenCompanies] = useState<string[]>([])
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)

    const {filteredResults, minPriceRange, maxPriceRange} = useAppSelector(state => state.filters)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        dispatch(sortFlightsBy({flights: data.result.flights, sortValue: 'asc-price'}))
        setIsLoading(false)
    }, []);


    const [arrayWithUniqCompany, setArrayWithUniqCompany] = useState<string[]>([...new Set(data.result.flights.map((fl: any) => fl.flight.carrier.caption))] as string[])

    useEffect(() => {

        if (maxQuantityStops + 1 === stops.length || stops.length === 0) {
            setArrayWithUniqCompany([...new Set(data.result.flights.filter((fl: any) => (+fl.flight.price.total.amount >= minPrice) && (+fl.flight.price.total.amount <= maxPrice) ).map((fl: any) => fl.flight.carrier.caption))] as string[])
        } else {
            setArrayWithUniqCompany([...new Set(filteredResults.map((fl) => fl.flight.carrier.caption))])
        }


    }, [stops, minPriceRange, maxPriceRange]);

    const [renderedFlights, setRenderedFlights] = useState([0, 1])


    if (isLoading) {
        return <div>Загрузка</div>
    }

    return (
        <div className={'wrapper'}>
            <div className={'container'}>
                {/*{filteredResults.length}*/}
                <SortBar arrayWithQuantityStops={arrayWithQuantityStops}
                         arrayWithUniqCompany={arrayWithUniqCompany}
                         setSortValue={setSortValue}
                         setStops={setStops}
                         stops={stops}
                         setRenderedFlights={setRenderedFlights}
                         sortValue={sortValue}
                         maxQuantityStops={maxQuantityStops}
                         setChosenCompanies={setChosenCompanies}
                         chosenCompanies={chosenCompanies}
                         minPrice={minPrice}
                         setMinPrice={setMinPrice}
                         maxPrice={maxPrice}
                         setMaxPrice={setMaxPrice}
                />
                <div className={'block'}>
                    <div>
                        {
                            filteredResults.length === 1 ?
                                <FlightItem key={0} data={filteredResults[0].flight}/>
                                :
                                filteredResults.length === 0 ?
                                    <div>Ничего не найдено</div>
                                    :

                                    renderedFlights.map((fl) => (
                                        <FlightItem key={fl} data={filteredResults[fl].flight}/>
                                    ))
                        }
                    </div>
                    {
                        (renderedFlights.length === filteredResults.length) || (filteredResults.length === 1) || (filteredResults.length === 0) ? null
                            :
                            <button
                                onClick={() => setRenderedFlights(prevState => prevState.length + 1 === filteredResults.length ? [...prevState, prevState.length] : [...prevState, prevState.length, prevState.length + 1])}>
                                Показать еще
                            </button>
                    }

                </div>
            </div>

        </div>
    )
};

export default App
