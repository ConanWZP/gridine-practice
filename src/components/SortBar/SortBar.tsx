import styles from './sortBar.module.scss'
import {FC, useState} from "react";


interface SortBarProps {
    arrayWithQuantityStops: number[],
    arrayWithUniqCompany: string[]
}

const SortBar: FC<SortBarProps> = ({arrayWithQuantityStops, arrayWithUniqCompany}) => {

    const [sortType, setSortType] = useState('asc-price')
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(100000)

    return (
        <div className={styles.wrapper}>
            {/*{sortType}*/}
            <div className={styles.container}>
                <div className={styles.sortBlock}>
                    <h2>Сортировать</h2>
                    <div className={styles.sort}>
                        <input type={'radio'} name={'sort'} defaultChecked={true}
                               value={'asc-price'}
                               onChange={(e) => setSortType(e.target.value)}/>
                        <div>-</div>
                        <div>по возрастанию цены</div>
                    </div>
                    <div className={styles.sort}>
                        <input type={'radio'} name={'sort'}
                               value={'desc-price'}
                               onChange={(e) => setSortType(e.target.value)}/>
                        <div>-</div>
                        <div>по убыванию цены</div>
                    </div>
                    <div className={styles.sort}>
                        <input type={'radio'} name={'sort'}
                               value={'time'}
                               onChange={(e) => setSortType(e.target.value)}/>
                        <div>-</div>
                        <div>по времени в пути</div>
                    </div>
                </div>
                <div className={styles.sortBlock}>
                    <h2>Фильтровать</h2>
                    {
                        arrayWithQuantityStops.map((numb) => (
                            <div className={styles.sort} key={numb}>
                                <input type={'checkbox'}/>
                                <div>-</div>
                                <div>{numb} пересадка</div>
                                {/*  Склонять слова нужно по-хорошему)))  */}
                            </div>
                        ))
                    }
                    <div className={styles.sort}>
                        <input type={'checkbox'}/>
                        <div>-</div>
                        <div>без пересадок</div>
                    </div>
                </div>
                <div className={styles.sortBlock}>
                    <h2>Фильтровать</h2>
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