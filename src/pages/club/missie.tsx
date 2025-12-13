import Head from 'next/head'
import React from 'react'
import Container from '@/components/Container'

export default function Mission() {
  return (
    <>
      <Head>
        <title>Sasja HC | Missie en visie</title>
      </Head>
      <main>
        <h1 className="title1 mt-8">Missie</h1>
          <Container card={true} className="card-text">
          <p>
            Sasja Biobest HC is een Antwerpse handbalclub met een sterke topsportgeschiedenis en een
            brede maatschappelijke rol. We willen een stabiele, toekomstgerichte club zijn die sportieve
            ambitie combineert met openheid voor iedereen die handbal wil beleven — als speler,
            trainer, ouder of vrijwilliger. Onze jeugdwerking vormt het fundament van die duurzame
            groei.
          </p>
          </Container>
        <h1 className="title1 mt-8">Visie</h1>
        <Container card={true} className="card-text">
          <h2>1. Sportieve richting</h2>
          <p>
            We bouwen aan een club die structureel klaar is voor een terugkeer naar het hoogste
            niveau binnen 3 tot 5 jaar. Dit vereist focus op organisatie, opleiding, infrastructuur en
            begeleiding. Topsport en breedtesport blijven gelijkwaardig binnen één clubmodel:
            prestatie en plezier versterken elkaar.
          </p>
          <h2>2. Jeugd als ruggengraat</h2>
          <p>
            De jeugdwerking blijft de kern van onze toekomst. We investeren in kwaliteitsvolle trainers,
            een duidelijke opleidingslijn en een omgeving waarin spelers zich kunnen ontwikkelen op
            eigen tempo. Doorstroming van eigen jeugd naar de eerste ploeg blijft een prioriteit.
          </p>
          <h2>3. Verankering en betrokkenheid</h2>
          <p>
            We willen een club zijn met een duidelijke plaats in de Antwerpse regio: herkenbaar, open
            en betrokken. We stimuleren samenwerking met scholen, lokale initiatieven en sociale
            projecten. Zo versterken we niet enkel onze maatschappelijke waarde, maar ook de binding
            met spelers, ouders en vrijwilligers.
          </p>
          <h2>4. Financiële stabiliteit</h2>
          <p>
            Een gezonde financiële basis is essentieel. We streven naar transparantie, diversificatie van
            inkomsten (sponsoring, evenementen, eigen exploitatie) en een duurzame begroting. De
            cafetaria in eigen beheer blijft een centrale pijler, zowel economisch als sociaal.
          </p>
          <h2>5. Samenwerking en netwerk</h2>
          <p>
            We versterken de samenwerking met andere handbal- en sportclubs om kennis, middelen
            en spelersstromen te delen. Grotere tornooien, gezamenlijke initiatieven en partnerships
            moeten de sport in Antwerpen en Vlaanderen zichtbaar houden en doen groeien.
          </p>
        </Container>
      </main>
    </>
  )
}
