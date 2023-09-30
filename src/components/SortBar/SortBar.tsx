import styles from './sortBar.module.scss'
import {FC, useEffect, useState} from "react";
import {filterStops, sortFlightsBy} from "../../redux/slices/filtersSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks.ts";
import data from './../../flights.json'


interface SortBarProps {
    arrayWithQuantityStops: number[],
    arrayWithUniqCompany: string[],
    setSortValue: (e: string) => void,
    sortValue: string
  //  setStops: (e: (prevState: number[]) => number[]) => void,
    setStops: (e: number[]) => void,
    stops: number[],
    setRenderedFlights: (e: number[]) => void,
    maxQuantityStops: number
}

const SortBar: FC<SortBarProps> = ({arrayWithQuantityStops, arrayWithUniqCompany, setSortValue, setStops, stops, setRenderedFlights, sortValue, maxQuantityStops}) => {

    const {filteredResults} = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch()
   // const [sortType, setSortType] = useState('asc-price')
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)
    const [val, setVal] = useState('')


    const chooseSort = (str: string) => {
        setSortValue(str)
        dispatch(sortFlightsBy({flights: filteredResults, sortValue: str}))
    }

    const chooseFilter = (number: number) => {
        const newStops = stops.includes(number) ? stops.filter(el => el !== number) : [...stops, number]
        /*setStops(
            prevState =>  prevState.includes(number) ? prevState.filter(el => el !== number) : [...prevState, number]
        )*/
        debugger
        setStops(newStops)
        setRenderedFlights([0, 1])
        setSortValue('asc-price')
        const array = [...data.result.flights]
        const arr = array.sort((a,b) =>  Number(a.flight.price.total.amount) - Number(b.flight.price.total.amount)  )
        dispatch(filterStops({
            flights: arr,
          //  flights: data.result.flights,
            stops: newStops,
            maxQuantityStops: maxQuantityStops+1
        }))


    }


    {/*prevState.include(numb) ? prevState.filter(el => el !== numb) : [...prevState, numb] */}
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
                                <input type={'checkbox'} name={'filter'}  onChange={() => chooseFilter(numb) } />
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
                        <input type={'number'} value={minPrice} onChange={(e) => setMinPrice(+e.target.value)}/>
                    </div>
                    <div className={`${styles.sort} ${styles.priceSort}`}>
                        <div>До</div>
                        <input type={'number'} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)}/>
                    </div>
                </div>
                <div className={styles.sortBlock}>
                    <h2>Авиакомпании</h2>
                    {
                        arrayWithUniqCompany.map((string) => (
                            <div className={styles.sort} key={string}>
                                <input type={'checkbox'}/>
                                <div>-</div>
                                <div className={styles.companyItem}><span className={styles.companyName}>{string}</span> от 9999 р.</div>
                                {/*  Склонять слова нужно по-хорошему)))  */}
                            </div>
                        ))
                    }

                </div>
            </div>

        </div>
    );
};

export default SortBar;