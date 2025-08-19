interface Venue {
  name: string
  short: string
  city: string
  street: string
  zip: string
}

export const VENUES_MAP: VenuesMap = {
  'Sporthal de Bloemhof': {
    name: 'Sporthal De Bloemhof',
    short: 'De Bloemhof',
    city: 'Aalsmeer',
    street: 'Braziliëlaan 6a',
    zip: '1432 DG',
  },
  'De Eendracht': {
    name: 'De Eendracht',
    short: 'De Eendracht',
    city: 'Zwartemeer',
    street: 'De Klinken 8',
    zip: '7894 DH',
  },
  'De Heuf': {
    name: 'Sportarena De Heuf',
    short: 'De Heuf',
    city: 'Panningen',
    street: 'Wilhelminastraat 44',
    zip: '5981 XW',
  },
  'Sporthal The Dome': {
    name: 'Sporthal The Dome',
    short: 'The Dome',
    city: 'Houten',
    street: 'Kruisboog 32',
    zip: '3994 AE',
  },
  'Dommelhof (B)': {
    name: 'Sportcentrum Dommelhof',
    short: 'Dommelhof',
    city: 'Pelt',
    street: 'Toekomstlaan 5',
    zip: '3910',
  },
  'Alverberg (B)': {
    name: 'Stedelijke sporthal Alverberg',
    short: 'Alverberg',
    city: 'Hasselt',
    street: 'Herkenrodesingel 33',
    zip: '3500',
  },
  'Eburons Dôme': {
    name: 'Eburons Dôme',
    short: 'Eburons Dôme',
    city: 'Tongeren',
    street: 'Vrijheidweg 9',
    zip: '3700',
  },
  'Sporthal Opperdam': {
    name: 'Sporthal Opperdam',
    short: 'Opperdam',
    city: 'Volendam',
    street: 'Heideweg 4',
    zip: '1132 DB',
  },
  'Stadssporthal': {
    name: 'Stadssporthal Sittard',
    short: 'Stadssporthal Sittard',
    city: 'Sittard',
    street: 'Stadswegke 8',
    zip: '6131 AG',
  },
  'Sporthalle Stockbergerweg': {
    name: 'Sporthalle Eupen',
    short: 'Sporthalle Eupen',
    city: 'Eupen',
    street: 'Stockbergerweg 5',
    zip: '4700',
  },
  'De Damburg (B)': {
    name: 'Sportcomplex De Damburg',
    short: 'De Damburg',
    city: 'Bocholt',
    street: 'Brogelerweg 59',
    zip: '3950',
  },
  'Sorghvliedt Sporthal (B)': {
    name: 'Sporthal Sorghvliedt',
    short: 'Sorghvliedt',
    city: 'Hoboken',
    street: 'Krijgsbaan 20',
    zip: '2660',
  },
  'Hall Omnisport De Visé (B)': {
    name: 'Hall Omnisport de Visé',
    short: 'Hall Omnisport',
    city: 'Visé',
    street: 'Rue de Berneau 30',
    zip: '4600',
  },
}

interface VenuesMap {
  [venueKey: string]: Venue;
}

export class VenueService {

  private getVenue(name: string): Venue | undefined {
    return VENUES_MAP[name]
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
