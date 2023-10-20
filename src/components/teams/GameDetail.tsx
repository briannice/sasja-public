import {GameDetailModel, GameModel, Referee} from "@/types/models";
import React, {useEffect, useState} from "react";
import {formatDate, getMonthFromDate, getWeekDayFromDate} from "@/utils/date";
import ClubLogo from "@/components/teams/ClubLogo";
import {GiWhistle} from "react-icons/gi";
import {FaMapMarkerAlt} from "react-icons/fa";
import {AiOutlineCar, AiOutlineFieldNumber, AiOutlineHome} from "react-icons/ai";
import {getHandballBelgiumGameDetail} from "@/services/hb/gamedetail";
import useAuthentication from "@/utils/auth";

type Props = {
    game: GameModel
}

export default function GameDetail({ game }: Props) {
    const [gameDetail, setGameDetail] = useState({
        ...game,
        referees: [],
        home_team_pin: '',
        away_team_pin: '',
        match_code: '',
        venue_street: '',
        venue_zip: ''
    } as GameDetailModel)
    const [width, setWidth] = useState<number>(0);
    const {isAuthenticated} = useAuthentication()

    useEffect(() => {
        const getAndSetGame = async () => setGameDetail(await getHandballBelgiumGameDetail(game.id, game.referees) as GameDetailModel)
        getAndSetGame();
    },[game.id, game.referees])

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

    const createAddress = (gameDetail: GameDetailModel) => {
        const address: string[] = []
        if(gameDetail.venue_street)
            address.push(gameDetail.venue_street)
        address.push(gameDetail.venue_zip + " " + gameDetail.venue_city)
        return address
    }

    return    (
        <section key={gameDetail.date}>
            <div className="card divide-y divide-light">
                <div>
                    <p className="rounded-sm bg-primary px-1.5 py-0.5 font-kanit desktop:text-xl text-center text-white">{gameDetail.serie_name}</p>
                </div>
                <div key={gameDetail.id} className="p-4">
                    <div className="font-kanit text-center desktop:text-2xl text">{createDate(gameDetail.date)}</div>
                    <div className="mt-4 flex space-x-8">
                        <div className="flex flex-1 flex-col items-center justify-center">
                            <ClubLogo path={gameDetail.home_logo} size={width > 600 ? 160: 40} />
                            <p className="text-center font-kanit desktop:text-2xl">{gameDetail.home_name}</p>
                        </div>
                        <div className="flex items-center justify-center space-x-4 font-kanit">
                            { gameDetail.game_status_id == 2 ? (
                                <p className="text-center desktop:text-3xl text-dark">{gameDetail.home_score}{' - '}{gameDetail.away_score}</p>
                            ):(
                                <p className="text-center desktop:text-3xl text-dark">{createTime(gameDetail.time)}</p>
                            )}
                        </div>
                        <div className="flex flex-1 flex-col content-center items-center justify-center">
                            <ClubLogo path={gameDetail.away_logo} size={width > 600 ? 160: 40} />
                            <p className="text-center font-kanit desktop:text-2xl">{gameDetail.away_name}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center"><AiOutlineFieldNumber/></div>
                        <div className="flex items-center justify-center space-x-1 text-sm">{gameDetail.game_number}</div>
                        {isAuthenticated()?
                            <div>
                                <div className="flex items-center justify-center space-x-1 text-sm">{gameDetail.match_code}</div>
                                <div className="flex items-center justify-center space-x-1 text-sm"><AiOutlineHome/><span/>{gameDetail.home_team_pin} | {gameDetail.away_team_pin}<AiOutlineCar/><span/></div>
                            </div>
                            :
                            <div className="flex items-center justify-center space-x-1 text-sm">(Log in voor meer informatie)</div>
                        }
                    </div>
                    <div className="m-5">
                        <div className="flex items-center justify-center"><GiWhistle/></div>
                        {createReferees(gameDetail.referees).map((ref) => (
                            <div key={ref} className="flex items-center justify-center space-x-1 text-sm">
                                {ref}
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="flex items-center justify-center"><FaMapMarkerAlt/></div>
                        <div className="flex items-center justify-center space-x-1 ">
                            <p className="">{gameDetail.venue_name}</p>
                        </div>
                        {createAddress(gameDetail).map((addressLine) => (
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