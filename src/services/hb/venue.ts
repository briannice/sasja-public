import {HandballBelgiumApi} from "@/services/hb/index";
import {Venue} from "@/types/models";

export const getHandballBelgiumVenue = async (venueId: number) => {
    const {data, status} = await HandballBelgiumApi.get(
        `ng/venue/${venueId}`
    )
    if (status !== 200) return []


    const venue: Venue = {
        id: data.data.id,
        name: data.data.name || "",
        short_name: data.data.short_name || '',
        street: data.data.street + (data.data.street2 ? " " + data.data.street2 : ""),
        zip: data.data.zip || '',
        city: data.data.city || '',
        country: data.data.country || '',
        phone: data.data.phone || '',
    }
    return venue
}
