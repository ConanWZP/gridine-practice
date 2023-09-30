import {dataType} from './FlightItem';
import styles from './flightItem.module.scss'
import {AiOutlineClockCircle} from "react-icons/ai";
import {FC} from "react";
import {getDay, getDayOfWeek, getMonthOfYear, getTime} from './../../helpers/data-helpers.ts'


interface ItemContentProps {
    segmentsQuantity: number,
    legNumber: number,
    data: dataType
}

const ItemContent:FC<ItemContentProps> = ({segmentsQuantity, legNumber, data}) => {
    return (
        <div className={styles.itemContent}>
            <div className={styles.route}>
                {data.legs[legNumber].segments[0]?.departureCity?.caption}, {data.legs[legNumber].segments[0].departureAirport.caption} <span>({data.legs[legNumber].segments[0].departureAirport.uid}) → </span>
                {data.legs[legNumber].segments[segmentsQuantity-1].arrivalCity.caption}, {data.legs[legNumber].segments[segmentsQuantity-1].arrivalAirport.caption} <span>({data.legs[legNumber].segments[segmentsQuantity-1].arrivalAirport.uid})</span>
            </div>
            <div className={styles.time}>
                <div className={styles.topTime}>
                    <div className={styles.formattedTime}>
                            <span>
                                {getTime(data.legs[legNumber].segments[0].departureDate)}
                            </span>
                        <span>
                                {getDay(data.legs[legNumber].segments[0].departureDate)} {getMonthOfYear(data.legs[legNumber].segments[0].departureDate)} {getDayOfWeek(data.legs[legNumber].segments[0].departureDate)}
                            </span>
                    </div>
                    <div>
                        <AiOutlineClockCircle/> {Math.floor(data.legs[legNumber].duration / 60)} ч {data.legs[legNumber].duration - Math.floor(data.legs[legNumber].duration / 60)*60} мин
                    </div>
                    <div className={styles.formattedTime}>
                            <span>
                                {/*{
                                    data.legs[0].segments.length > 1 ? getTime(data.legs[0].segments[1].arrivalDate) : getTime(data.legs[0].segments[0].arrivalDate)
                                }*/}
                                {getTime(data.legs[legNumber].segments[segmentsQuantity-1].arrivalDate)}
                            </span>
                        <span>
                                {/*{
                                    data.legs[0].segments.length > 1 ?
                                        `${getDay(data.legs[0].segments[1].arrivalDate)} ${getMonthOfYear(data.legs[0].segments[1].arrivalDate)} ${getDayOfWeek(data.legs[0].segments[1].arrivalDate)}`
                                        :
                                        `${getDay(data.legs[0].segments[0].arrivalDate)} ${getMonthOfYear(data.legs[0].segments[0].arrivalDate)} ${getDayOfWeek(data.legs[0].segments[0].arrivalDate)}`
                                }*/}
                            {getDay(data.legs[legNumber].segments[segmentsQuantity-1].arrivalDate)} {getMonthOfYear(data.legs[legNumber].segments[segmentsQuantity-1].arrivalDate)} {getDayOfWeek(data.legs[legNumber].segments[segmentsQuantity-1].arrivalDate)}
                            </span>
                    </div>
                </div>
                {
                    segmentsQuantity - 1 === 0 ?
                        <div className={styles.stops}>
                            <span className={styles.line}></span>
                        </div>
                        :
                        <div className={styles.stops}>
                            <span className={styles.line}></span>
                            <span>{segmentsQuantity-1} пересадка</span>
                            <span className={styles.line}></span>
                        </div>
                }
            </div>
            <div className={styles.airlines}>
                Рейс выполняет: Air France
            </div>
        </div>
    );
};

export default ItemContent;