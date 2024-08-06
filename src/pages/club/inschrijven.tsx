import Container from '@/components/Container'
import Link from '@/components/Link'
import Head from 'next/head'
import React from 'react'

export default function EnrollPage() {
  return (
    <>
      <Head>
        <title>Sasja HC | Inschrijven</title>
      </Head>
      <main>
        <h1 className="title1 mt-8">Inschrijven</h1>
        <Container card={true} className="card-text">
          <p>
            Handbal is een complete en leuke sport voor kinderen die van balsporten houden en graag
            in teamverband spelen. Het spel gaat snel en er wordt veel gescoord: ook als toeschouwer
            is dit aangenaam om volgen!
          </p>
          <p>
            Hou jij van lopen, springen en spelen met een bal in teamverband? Dan ben je van harte
            welkom om een van de <Link href="/team/trainingen">trainingen</Link> die wekelijks
            meerdere malen georganiseerd worden voor jouw leeftijdscategorie (gratis) bij te wonen!
            Als je beslist dat handbal echt iets voor jou is, dan kan je lid worden van onze club en
            deelnemen aan wedstrijden in het weekend!
          </p>
        </Container>

        <Container card={true} className="card-text">
          <h2>Lid worden</h2>
          <p>
            SASJA werkt samen met{' '}
            <a href="https://www.jespo.be/" target="_blank" rel="noreferrer">
              Jespo
            </a>{' '}
            om de Antwerpse jeugd aan het sporten te krijgen. Daarom bestaat een lidmaatschap bij
            SASJA uit 2 delen: het deel van Jespo om buiten de schooluren tweemaal per week te
            kunnen sporten bij een erkende sportclub en het deel van SASJA voor een derde training
            en om in het weekend deel te kunnen nemen aan competitiewedstrijden.
          </p>
        </Container>

        <Container card={true} className="card-text">
          <h2>Bij Jespo (elk lid)</h2>
          <p>
            Lid worden van Jespo kan je volledig online: je gaat naar de site jespo.be en kiest{' '}
            <a
              href="https://static.twizzit.com/v2/public/form/c2b02184a5ebbf81603a0fb069fa6f79"
              target="_blank"
              rel="noreferrer"
            >
              inschrijven
            </a>
            . Daar selecteer je Handbal (locatie: Hoboken en Zandvliet) en vervolledig je het
            inschrijvingsproces. Let er wel op dat je de juiste locatie (Hoboken) en leeftijd kiest!
          </p>
          <p>
            Naargelang de leeftijd bedraagt het inschrijvingsgeld 70 of 125 EUR (1 of 2 trainingen
            per week)
          </p>
          <p>
            Als je lid bent van Jespo mag je deelnemen aan de trainingen en ben je volledig
            verzekerd tegen eventuele blessures of ongevallen tijdens deze trainingen. Meer
            informatie vind je in de algemene voorwaarden van Jespo.
          </p>
        </Container>

        <Container card={true} className="card-text">
          <h2>Bij SASJA (competitief lid, vanaf JM12)</h2>
          <p>
            Indien je ook competitie wil spelen (en wie wil dat niet), moet je ook lid worden van
            SASJA. De handbalbond organiseert competities per leeftijdscategorie vanaf de JM12
            (welpen) en SASJA probeert elk seizoen minstens 1 ploeg af te vaardigen. Het lidgeld bij
            SASJA bedraagt 175 EUR per seizoen. Hiervoor organiseert SASJA wekelijks een extra
            training en wordt je lid als speler bij de handbalbond, zodat je aan wedstrijden kan en
            mag deelnemen.
          </p>
          <p>
            Bovendien krijg je een kledingpakket waarvoor je na inschrijving gecontacteerd zal
            worden om je maten door te geven.
          </p>
          <p>
            Om lid te worden bij SASJA, dien je{' '}
            <a
              href="https://docs.google.com/document/d/1qbY3KLvaFZLjeaVoWYDpzT_gjey5EioqBySitCboj6U/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              dit formulier
            </a>{' '}
            in te vullen en te mailen naar{' '}
            <a href="mailto:secretariaat@sasja-antwerpen.be">secretariaat@sasja-antwerpen.be</a>.
            Als het niet anders kan, mag je het ook aan de trainer/coach afgeven. Hierna krijg je
            per e-mail verdere instructies, zoals o.m. de uitnodiging om het lidgeld te betalen.
          </p>
        </Container>

        <Container card={true} className="card-text">
          <h2>Maar, ik heb nog een vraag!</h2>
          <p>
            Heb je nog vragen waarvan het antwoord hier niet aan bod zijn gekomen? Stuur een mailtje
            naar <a href="mailto:jeugd@sasja-antwerpen.be">jeugd@sasja-antwerpen.be</a>!
          </p>
        </Container>
      </main>
    </>
  )
}
