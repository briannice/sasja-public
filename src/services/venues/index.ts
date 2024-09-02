import fs from 'fs'
import yaml from 'js-yaml'

interface Venue {
  name: string
  short: string
  city: string
  street: string
  zip: string
}

interface VenuesMap {
  [venueKey: string]: Venue;
}

export class VenueService {
  private readonly venuesMap: VenuesMap

  constructor(filePath: string) {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    this.venuesMap = yaml.load(fileContents) as VenuesMap
  }

  private getVenue(name: string): Venue | undefined {
    return this.venuesMap[name]
  }

  public getShortName(name: string): string {
    const venue = this.getVenue(name)
    return venue ? venue.short : name
  }

  public getName(name: string): string {
    const venue = this.getVenue(name)
    return venue ? venue.name : name
  }

  public getStreet(name: string): string {
    const venue = this.getVenue(name)
    return venue ? venue.street : ''
  }

  public getCity(name: string): string {
    const venue = this.getVenue(name)
    return venue ? venue.city : ''
  }

  public getZip(name: string): string {
    const venue = this.getVenue(name)
    return venue ? venue.zip : ''
  }
}
