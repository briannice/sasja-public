import {GameModel, Referee, Venue} from "@/types/models";
import React, {useEffect, useState} from "react";
import {getHandballBelgiumVenue} from "@/services/hb/venue";
import {formatDate, getMonthFromDate, getWeekDayFromDate} from "@/utils/date";
import ClubLogo from "@/components/teams/ClubLogo";
import {GiWhistle} from "react-icons/gi";
import {FaMapMarkerAlt} from "react-icons/fa";
import {AiOutlineFieldNumber} from "react-icons/ai";

type Props = {
    game: GameModel
}

export default function GameDetail({ game }: Props) {
    const [venue, setVenue] = useState({id: game.venue_id, name:game.venue_name, city:game.venue_city, country:'BE', street:'', phone:'', short_name:game.venue_short, zip:''})
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        const getAndSetVenue = async () => { setVenue(await getHandballBelgiumVenue(game.venue_id) as Venue) }
        getAndSetVenue();
    },[game.venue_id])

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        };
    });

    const createDate = (date: string) => {
        const weekday = getWeekDayFromDate(date)
        const day = formatDate(date, 'D')
        const month = getMonthFromDate(date)
        return `${weekday} ${day} ${month}`
    }

    const createTime = (time: string | null) => {
        if (!time) return ''

        const hours = time.split(':')[0]
        const minutes = time.split(':')[1]
        return `${hours}:${minutes}`
    }
    const createReferees = (refereeList: Referee[]) => {
        const referees: string[]= []
        if (refereeList.length == 0)
            referees.push('Geen aanduidingen')
        else
            if (refereeList.length >= 1)
                referees.push(refereeList[0].firstname + " " + refereeList[0].surname)
            if (refereeList.length >= 2)
                referees.push(refereeList[1].firstname + " " + refereeList[1].surname)
            if (refereeList.length >= 3)
                referees.push(refereeList[2].firstname + " " + refereeList[2].surname + " (waarnemer)")
        return referees
    }

    const createAddress = (venue: Venue) => {
        const address: string[] = []
        if(venue.street)
            address.push(venue.street)
        address.push(venue.zip + " " + venue.city)
        return address
    }

    return    (
        <section key={game.date}>
            <div className="card divide-y divide-light">
                <div>
                    <p className="rounded-sm bg-primary px-1.5 py-0.5 font-kanit desktop:text-xl text-center text-white">{game.serie_name}</p>
                </div>
                <div key={game.id} className="p-4">
                    <div className="font-kanit text-center desktop:text-2xl text">{createDate(game.date)}</div>
                    <div className="mt-4 flex space-x-8">
                        <div className="flex flex-1 flex-col items-center justify-center">
                            <ClubLogo path={game.home_logo} size={width > 600 ? 160: 40} />
                            <p className="text-center font-kanit desktop:text-2xl">{game.home_name}</p>
                        </div>
                        <div className="flex items-center justify-center space-x-4 font-kanit">
                            { game.game_status_id == 2 ? (
                                <p className="text-center desktop:text-3xl text-dark">{game.home_score}{' - '}{game.away_score}</p>
                            ):(
                                <p className="text-center desktop:text-3xl text-dark">{createTime(game.time)}</p>
                            )}
                        </div>
                        <div className="flex flex-1 flex-col content-center items-center justify-center">
                            <ClubLogo path={game.away_logo} size={width > 600 ? 160: 40} />
                            <p className="text-center font-kanit desktop:text-2xl">{game.away_name}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center"><AiOutlineFieldNumber/></div>
                        <div className="flex items-center justify-center space-x-1 text-sm">
                            {game.game_number}
                        </div>
                    </div>
                    <div className="m-5">
                        <div className="flex items-center justify-center"><GiWhistle/></div>
                        {createReferees(game.referees).map((ref) => (
                            <div key={ref} className="flex items-center justify-center space-x-1 text-sm">
                                {ref}
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="flex items-center justify-center"><FaMapMarkerAlt/></div>
                        <div className="flex items-center justify-center space-x-1 ">
                            <p className="">{venue.name}</p>
                        </div>
                        {createAddress(venue).map((addressLine) => (
                        <div key={addressLine} className="flex items-center justify-center space-x-1 text-sm">
                            {addressLine}
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}