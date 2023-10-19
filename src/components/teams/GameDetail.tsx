import {GameModel, Referee, Venue} from "@/types/models";
import React, {useEffect, useState} from "react";
import {getHandballBelgiumVenue} from "@/services/hb/venue";
import {formatDate, getMonthFromDate, getWeekDayFromDate} from "@/utils/date";
import ClubLogo from "@/components/teams/ClubLogo";
import {GiWhistle} from "react-icons/gi";
import {FaMapMarkerAlt} from "react-icons/fa";

type Props = {
    game: GameModel
}

export default function GameDetail({ game }: Props) {
    const [venue, setVenue] = useState({id: game.venue_id, name:game.venue_name, city:game.venue_city, country:'BE', street:'', phone:'', short_name:game.venue_short, zip:''})

    useEffect(() => {
        const getAndSetVenue = async () => { setVenue(await getHandballBelgiumVenue(game.venue_id) as Venue) }
        getAndSetVenue();
    },[game.venue_id])

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
    const createReferees = (referees: Referee[]) => {
        if (!referees) return ''
        if (referees.length == 0) return 'Geen aanduidingen'
        return referees.map((ref) => (ref.firstname + " " + ref.surname)).join(', ')
    }

    const createAddress = (venue: Venue) => {
        let address = ''
        if(venue.street)
            address += venue.street + ", "
        address += venue.zip + " " + venue.city
        return address
    }

    return    (
        <section key={game.date}>
            <div className="card divide-y divide-light">
                <div>
                    <p className="rounded-sm bg-primary px-1.5 py-0.5 font-kanit title1 text-white">{game.serie_name}</p>
                </div>
                <div key={game.id} className="p-4">
                    <div className="title1">{createDate(game.date)}</div>
                    <div className="mt-4 flex space-x-8">
                        <div className="flex flex-1 flex-col items-center justify-center">
                            <ClubLogo path={game.home_logo} size={160} />
                            <p className="text-center font-kanit">{game.home_name}</p>
                        </div>
                        <div className="flex items-center justify-center space-x-2 font-kanit">
                            { game.game_status_id == 2 ? (
                                <p className="text-right text-3xl text-dark">{game.home_score}{' - '}{game.away_score}</p>
                            ):(
                                <p className="text-right text-3xl text-dark">{createTime(game.time)}</p>
                            )}
                        </div>
                        <div className="flex flex-1 flex-col content-center items-center justify-center">
                            <ClubLogo path={game.away_logo} size={160} />
                            <p className="text-center font-kanit">{game.away_name}</p>
                        </div>
                    </div>
                    <div className="m-5">
                        <div className="flex items-center justify-center"><GiWhistle/></div>
                        <div className="flex items-center justify-center space-x-1 ">
                            <p className="text-dark">{createReferees(game.referees)}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center"><FaMapMarkerAlt/></div>
                        <div className="flex items-center justify-center space-x-1 ">
                            <p className="text-dark">{venue.name}</p>
                        </div>
                        <div className="flex items-center justify-center space-x-1 ">
                            <p className="text-dark">{createAddress(venue)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}