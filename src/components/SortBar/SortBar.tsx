import styles from './sortBar.module.scss'
import {FC} from "react";
import {filterByPrice, filterCompanies, filterStops, sortFlightsBy} from "../../redux/slices/filtersSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks.ts";
import dataMock from './../../flights.json'
import { conditionalFlights } from '../../helpers/conditionalFlights.ts';
import {useDebounce} from "../../hooks/useDebounce.ts";


interface SortBarProps {
    arrayWithQuantityStops: number[],
    arrayWithUniqCompany: string[],
    setSortValue: (e: string) => void,
    sortValue: string
  //  setStops: (e: (prevState: number[]) => number[]) => void,
    setStops: (e: number[]) => void,
    stops: number[],
    setRenderedFlights: (e: number[]) => void,
    maxQuantityStops: number,
    setChosenCompanies: (e: string[]) => void,
    chosenCompanies: string[],
    minPrice: number,
    maxPrice: number,
    setMinPrice: (e: number) => void,
    setMaxPrice: (e: number) => void
}

const SortBar: FC<SortBarProps> = ({arrayWithQuantityStops, arrayWithUniqCompany,
                                       setSortValue, setStops, stops,
                                       setRenderedFlights, sortValue, maxQuantityStops,
                                       setChosenCompanies, chosenCompanies, maxPrice,
                                       setMaxPrice, setMinPrice, minPrice}) => {

    const data: any = dataMock
    const {filteredResults} = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch()

    const chooseSort = (str: string) => {
        setSortValue(str)
        dispatch(sortFlightsBy({flights: filteredResults, sortValue: str}))
    }

    const chooseFilter = (number: number) => {
        const newStops = stops.includes(number) ? stops.filter(el => el !== number) : [...stops, number]

        setStops(newStops)
        setChosenCompanies([])
        setRenderedFlights([0, 1])
        setSortValue('asc-price')
        setMinPrice(0)
        setMaxPrice(300000)
        const array = [...data.result.flights]
        const arr = array.sort((a,b) =>  Number(a.flight.price.total.amount) - Number(b.flight.price.total.amount)  )
        dispatch(filterStops({
            flights: arr,
            stops: newStops,
            maxQuantityStops: maxQuantityStops+1
        }))
    }

    const chooseCompanies = (str: string) => {
        const newCompany = chosenCompanies.includes(str) ? chosenCompanies.filter(el => el !== str) : [...chosenCompanies, str];
        let flightsArray;
        setRenderedFlights([0, 1])
        setSortValue('asc-price')

        let extraFlightsArray;
        if (stops.length === maxQuantityStops+1 || stops.length === 0) {
            flightsArray = [...data.result.flights]
        } else {
            flightsArray = [...data.result.flights].filter(fl => stops.includes(fl.flight.legs[0].segments.length-1) && stops.includes(fl.flight.legs[1].segments.length-1) )

        }
        extraFlightsArray = flightsArray.sort((a,b) =>  Number(a.flight.price.total.amount) - Number(b.flight.price.total.amount)  ).filter(fl => (+fl.flight.price.total.amount >= minPrice) && (+fl.flight.price.total.amount <= maxPrice) )

        dispatch(filterCompanies({
            flights: extraFlightsArray,
            companies: newCompany,
            arrayWithUniqCompany
        }))
        setChosenCompanies(newCompany)
    }

    const callDeb = useDebounce((value: any) => {
       // console.log(edge)
        /*if (edge === 'min-price') {
            setMinPrice(value.minValue > maxPrice ? maxPrice : value.minValue)
        } else {
            setMaxPrice(value.maxValue < minPrice ? minPrice : value.maxValue)
        }*/

        setRenderedFlights([0, 1])
        setSortValue('asc-price')
        dispatch(filterByPrice(value))
    }, 1000)

    /*const changePriceDeb = useDebounce((value) => {

    }, 1000)*/

    const changePriceRange = (numb: any) => {

        setChosenCompanies([])
        const {flightsArray} = conditionalFlights([...data.result.flights], stops, chosenCompanies, maxQuantityStops+1, arrayWithUniqCompany)
        const sortedFlightsArray = [...flightsArray].sort((a,b) =>  Number(a.flight.price.total.amount) - Number(b.flight.price.total.amount)  )
        if (numb.name === 'min-price') {
            callDeb({
                flights: sortedFlightsArray,
                minValue: +numb.value,
                maxValue: maxPrice
            })
        } else {
            callDeb({
                flights: sortedFlightsArray,
                minValue: minPrice,
                maxValue: +numb.value
            })
        }
    }

    const calculateMinPrice = (str: string) => {
        let arrayForMinPrice;
        if (stops.length === maxQuantityStops+1 || stops.length === 0) {
            arrayForMinPrice = [...data.result.flights]
        } else {
            arrayForMinPrice = [...data.result.flights].filter(fl => stops.includes(fl.flight.legs[0].segments.length-1) && stops.includes(fl.flight.legs[1].segments.length-1) )

        }
        const extraArrayForMinPrice = arrayForMinPrice.filter(fl => (+fl.flight.price.total.amount >= minPrice) && (+fl.flight.price.total.amount <= maxPrice) )
       return  Math.min(...extraArrayForMinPrice.filter(fl => fl.flight.carrier.caption === str).map(fl => fl.flight.price.total.amount))

    }


    return (
        <div className={styles.wrapper}>
            {/*{sortType}*/}
            <div className={styles.container}>
                <div className={styles.sortBlock}>
                    <h2>Сортировать</h2>
                    <div className={styles.sort}>
                        <input type={'radio'} name={'sort'}  checked={sortValue==='asc-price'}
                               value={'asc-price'}
                               onChange={(e) => chooseSort(e.target.value)}/>
                        <div>-</div>
                        <div>по возрастанию цены</div>
                    </div>
                    <div className={styles.sort}>
                        <input type={'radio'} name={'sort'} checked={sortValue==='desc-price'}
                               value={'desc-price'}
                               onChange={(e) => chooseSort(e.target.value)}/>
                        <div>-</div>
                        <div>по убыванию цены</div>
                    </div>
                    <div className={styles.sort}>
                        <input type={'radio'} name={'sort'} checked={sortValue==='time'}
                               value={'time'}
                               onChange={(e) => chooseSort(e.target.value)}/>
                        <div>-</div>
                        <div>по времени в пути</div>
                    </div>
                </div>
                <div className={styles.sortBlock}>
                    <h2>Фильтровать</h2>
                    {

                        arrayWithQuantityStops.map((numb) => (
                            <div className={styles.sort} key={numb}>
                                <input type={'checkbox'} name={'filter'} onChange={() => chooseFilter(numb) } />
                                <div>-</div>
                                <div>{numb} пересадка</div>
                                {/*  Склонять слова нужно по-хорошему)))  */}
                            </div>
                        ))
                    }
                    <div className={styles.sort}>
                        <input type={'checkbox'} name={'filter'}  onChange={() => chooseFilter(0)} />
                        <div>-</div>
                        <div>без пересадок</div>
                    </div>
                </div>
                <div className={styles.sortBlock}>
                    <h2>Цена</h2>
                    <div className={`${styles.sort} ${styles.priceSort}`}>
                        <div>От</div>
                        <input type={'number'} name={'min-price'} value={minPrice} onChange={(e) => {
                            setMinPrice(+e.target.value > maxPrice ? maxPrice : +e.target.value)
                            changePriceRange(e.target)
                        }  }/>
                    </div>
                    <div className={`${styles.sort} ${styles.priceSort}`}>
                        <div>До</div>
                        <input type={'number'} name={'max-price'} value={maxPrice} onChange={(e) => {
                            setMaxPrice(+e.target.value < minPrice ? minPrice : +e.target.value)
                            changePriceRange(e.target)
                        }}/>
                    </div>
                </div>
                <div className={styles.sortBlock}>
                    <h2>Авиакомпании</h2>
                    {
                        arrayWithUniqCompany.map((string, index) => (
                            <div className={styles.sort} key={index}>
                                <input type={'checkbox'}  checked={chosenCompanies.includes(string)} onChange={() => chooseCompanies(string)}/>
                                <div>-</div>
                                <div className={styles.companyItem}><span className={styles.companyName}>{string}</span> от {calculateMinPrice(string)} р.</div>
                            </div>
                        ))
                    }

                </div>
            </div>

        </div>
    );
};

export default SortBar;