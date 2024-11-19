'use client'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import Nav from '../components/nav'
import Image from 'next/image'
import Stadium from '../components/stadium'
import payment from '@/assets/images/payment.png'
import flag from '@/assets/images/flag.png'
import axios from 'axios'
import { TicketResponse } from '../../../interface/ticket'
import { useParams, useRouter } from 'next/navigation'

const Ticket = () => {
  const [data, setData] = useState<TicketResponse[][]>([]);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)
 const router = useRouter()
  const { id } = useParams()
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures that code runs only after the component is mounted on the client
  }, []);


  useEffect(() => {
    const fetchTicket = async () => {
      if (!id) return

      setLoading(true)
      try {
        const response = await axios.get(`/api/get-ticket`)
        setData([response.data]) // Assuming your API returns a single ticket object
      } catch (error) {
        setError('Failed to fetch ticket details.')
        console.error('Failed to fetch ticket details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTicket()
  }, [id]) // Effect will run whenever `id` changes

  useEffect(() => {
    setIsClient(true); // Ensures that code runs only after the component is mounted on the client
  }, []);

  if (loading) return (
    <div className='h-screen w-screen flex justify-center items-center'>
 <div className="flex  items-center ">
                    <div className="animate-spin rounded-full h-40 w-40 border-t-4 border-blue-500"></div>
                    
                </div>
    </div>
  )
  if (error) return <p>Error: {error}</p>
  if (!data.length) return <p>Ticket not found</p>

  const ticket = data[0].find((e)=>e._id === id)

  if (!ticket) {
    return <p>Ticket not found</p>;
  }

  const formatTicketDetails = (ticket:TicketResponse) => {
    const { date, stadiumName, price } = ticket;
  
    // Create a new Date object from the date string
    const eventDate = new Date(date);
  
    // Format the date using Intl.DateTimeFormat
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  

    // Return the formatted string
    return `${dateFormatter.format(eventDate)}, ${ticket.time} , ${stadiumName}`;
  };
  
  
  
  
  const toggleAccordion = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <>
    {
      isClient && (
        <div className='bg-[#f1f1f1] min-h-screen'>
        <header className="flex w-full bg-[#002c52] justify-center py-1.5">
          <div className="w-full max-w-[1200px] flex flex-wrap justify-center gap-3 items-center px-4">
            <div onClick={()=>router.push('/')} className= "hover:cursor-pointer text-white flex gap-0.5 items-center w-full md:w-1/2 font-semibold md:-mr-20">
              <div className="text-3xl">fan<strong className="font-bold text-[#feca27]">SALE</strong></div>
              <div className="text-[0.8rem] flex flex-col gap-auto">
                <div>Biglietti da fan a fan</div>
                <div>di TicketOne</div>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex gap-3 items-center bg-gradient-to-b from-gray-300 to-white rounded h-[30px] overflow-hidden px-3 w-full">
                <input
                  className="bg-transparent border-none text-[#002c52] font-semibold text-sm w-full text-ellipsis outline-none"
                  type="text"
                  placeholder="Ricerca per evento, artista, località"
                />
                <Icon icon="iconamoon:search-bold" className="text-[#002c52] text-2xl" />
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto justify-center md:justify-end">
              <button className="bg-[#07446f] rounded-[2px] h-[30px] px-5 text-white hover:bg-gradient-to-b hover:from-gray-300 hover:to-white hover:text-[#07446f] font-semibold">Vendi</button>
              <button className="bg-[#07446f] rounded-[2px] h-[30px] px-5 text-white hover:bg-gradient-to-b hover:from-gray-300 hover:to-white hover:text-[#07446f] font-semibold">Accedi</button>
              <button className="bg-[#07446f] rounded-[2px] h-[30px] px-3 text-white hover:bg-gradient-to-b hover:from-gray-300 hover:to-white hover:text-[#07446f] font-semibold flex flex-col gap-0 justify-center">
                <div><Icon icon={'ion:reorder-three'} className="mb-0 text-[1.3rem]" /></div>
                <div className="text-[0.6rem] -mt-1">Menu</div>
              </button>
            </div>
          </div>
        </header>
        <main className="flex justify-center mt-2">
          <div className="w-full max-w-[1200px] px-4">
            <div className="text-[#5C5C5C]">
              <Nav />
            </div>
            <div className="bg-white shadow-custom text-[#5C5C5C] w-full mt-3 p-4 text-left relative">
              fanSALE è un mercato secondario di rivendita di biglietti, dove il prezzo dei biglietti è sempre uguale al prezzo originale.
            </div>
  
            <div className="bg-white shadow-custom text-[#5C5C5C] w-full h-[30vh] lg:h-[28vh]  mt-3 p-4 text-left relative">
  {/* Background Image */}
  <div className="h-full overflow-hidden w-full absolute left-0 top-0">
    <div
      className="h-2/4 lg:h-3/4 md:h-3/4
       overflow-hidden w-full absolute left-0 top-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${ticket.picture})`,
        filter: 'blur(1px)',
        width: '400%',
      }}
    >
    </div>
  </div>

  {/* Image in a circular container */}
  <div
  className="border-4 overflow-hidden border-white rounded-md shadow-custom absolute h-[18vw] w-[18vw] max-h-[160px] max-w-[160px] min-h-[120px] min-w-[120px] top-[10%] left-[6rem] z-[100] 
    bg-cover bg-center 
    sm:left-[4rem] sm:w-[24vw] sm:h-[24vw] sm:min-h-[100px] sm:min-w-[100px] 
    md:left-[5rem] md:w-[16vw] md:h-[16vw] md:min-h-[120px] md:min-w-[120px]"
  style={{
    backgroundImage: `url(${ticket.picture})`,
  }}
></div>

  {/* Ticket Title and Info for Desktop */}
  <div className="absolute left-2/4 top-1/3 lg:top-10  text-white  sm:top-1/3 sm:text-center md:left-1/4 md:top-1/3 md:text-left sm:left-2/4">
    <div className="text-4xl font-semibold mb-1">{ticket.title}</div>
    
    {/* Main ticket details (will be hidden in mobile view) */}
    <div className= " hidden lg:block sm:hidden text-3xl md:hidden  ">
      {formatTicketDetails(ticket)}
    </div>
  </div>

  {/* Bottom Ticket Details (Visible on Mobile) */}
  <div className="absolute bottom-3 font-semibold text-xl left-4 w-full text-[#002c52] lg:hidden md:block">
    {/* This will be visible on mobile instead of the top details */}
    {formatTicketDetails(ticket)} 
  </div>
</div>



            <div className="flex items-center text-[#002c52] my-2">
              <Icon icon={'ion:caret-back-sharp'} />
              <div>Torna alle date</div>
            </div>
            <Stadium ticket={ticket} />
  
            <div className="bg-white shadow-custom text-[#5C5C5C] w-full mt-5 p-4 text-left relative">
              <div className="border-b-2 text-2xl text-[#07446f] pb-2">Avviso offerta</div>
              <div className="my-2">
                Non hai trovato quello che cercavi? Il nostro Avviso Offerta ti informerà non appena saranno disponibili offerte per l'evento desiderato su fanSALE. Imposta semplicemente i tuoi criteri di ricerca e riceverai le offerte più adatte via email nel periodo di tempo desiderato. Crea il tuo Avviso Offerta
              </div>
            </div>
  
            <div className="bg-white shadow-custom text-[#5C5C5C] w-full mt-5 p-4 text-left relative">
              <div className="border-b-2 text-2xl text-[#07446f] pb-2">Vendi biglietti</div>
              <div className="my-2">
                Hai acquistato biglietti per LAZZA mercoledì, 15/01/2025 21.00, Inalpi Arena, 10134 TORINO ma non puoi partecipare all'evento? Nessun problema: con fanSALE puoi vendere i tuoi biglietti facilmente, rapidamente e in sicurezza attraverso il mercato online di TicketOne. In questo modo, puoi vendere i tuoi biglietti legalmente a veri fan, anche per eventi sold-out. Vendi
              </div>
            </div>
  
            <div className="bg-white shadow-custom text-[#5C5C5C] w-full mt-5 p-4 text-left relative">
              <div className="border-b-2 font-semibold text-[#002c52] pb-2">Consigliato da fanSALE</div>
              <div className="my-2 text-[#002c52]">
                Biglietti Emma | Biglietti Alessandra Amoroso | Biglietti Marco Mengoni | Biglietti Ultimo | Biglietti Claudio Baglioni | Biglietti Negramaro | Biglietti Max Pezzali
              </div>
            </div>
  
            <div className="bg-white shadow-custom text-[#002c52] w-full mt-5 p-4 text-left relative flex justify-center">
              {/* Desktop View */}
              <div className="hidden md:flex justify-between w-full md:w-10/12">
                  <div>
                      <div className="font-semibold mb-2">Aiuto & Contatti</div>
                      <ul>
                          <li className="hover:underline mb-2 list-disc hover:cursor-pointer list-inside text-sm">Servizio Clienti</li>
                          <li className="hover:underline mb-2 list-disc hover:cursor-pointer list-inside text-sm">Servizi</li>
                          <li className="hover:underline mb-2 list-disc hover:cursor-pointer list-inside text-sm">Artisti principali</li>
                      </ul>
                  </div>
                  <div>
                      <div className="font-semibold mb-2">Domande frequenti</div>
                      <ul>
                          <li className="hover:underline mb-2 list-disc hover:cursor-pointer list-inside text-sm">FAQ Acquirenti</li>
                          <li className="hover:underline mb-2 list-disc hover:cursor-pointer list-inside text-sm">FAQ Venditori</li>
                          <li className="hover:underline mb-2 list-disc hover:cursor-pointer list-inside text-sm">Impostazioni cookie</li>
                      </ul>
                  </div>
                  <div>
                      <div className="font-semibold mb-2">Metodi di pagamento</div>
                      <Image width={200} src={payment} alt="payment" />
                  </div>
              </div>
  
              {/* Mobile Accordion View */}
              <div className="block md:hidden w-full">
                  {/* Section 1: Aiuto & Contatti */}
                  <div className="border-b">
                      <div
                          className="font-semibold py-2 flex justify-between items-center cursor-pointer"
                          onClick={() => toggleAccordion('aiuto')}
                      >
                          Aiuto & Contatti
                          <span>{openSection === 'aiuto' ? '▲' : '▼'}</span>
                      </div>
                      {openSection === 'aiuto' && (
                          <ul className="pl-4 pb-2">
                              <li className="hover:underline mb-2 list-disc hover:cursor-pointer list-inside text-sm">Servizio Clienti</li>
                              <li className="hover:underline mb-2 list-disc hover:cursor-pointer list-inside text-sm">Servizi</li>
                              <li className="hover:underline mb-2 list-disc hover:cursor-pointer list-inside text-sm">Artisti principali</li>
                          </ul>
                      )}
                  </div>
  
                  {/* Section 2: Domande frequenti */}
                  <div className="border-b">
                      <div
                          className="font-semibold py-2 flex justify-between items-center cursor-pointer"
                          onClick={() => toggleAccordion('faq')}
                      >
                          Domande frequenti
                          <span>{openSection === 'faq' ? '▲' : '▼'}</span>
                      </div>
                      {openSection === 'faq' && (
                          <ul className="pl-4 pb-2">
                              <li className="hover:underline mb-2 list-disc hover:cursor-pointer list-inside text-sm">FAQ Acquirenti</li>
                              <li className="hover:underline mb-2 list-disc hover:cursor-pointer list-inside text-sm">FAQ Venditori</li>
                              <li className="hover:underline mb-2 list-disc hover:cursor-pointer list-inside text-sm">Impostazioni cookie</li>
                          </ul>
                      )}
                  </div>
  
                  {/* Section 3: Metodi di pagamento */}
                  <div className="border-b">
                      <div
                          className="font-semibold py-2 flex justify-between items-center cursor-pointer"
                          onClick={() => toggleAccordion('pagamenti')}
                      >
                          Metodi di pagamento
                          <span>{openSection === 'pagamenti' ? '▲' : '▼'}</span>
                      </div>
                      {openSection === 'pagamenti' && (
                          <div className="pl-4 pb-2">
                              <Image width={200} src={payment} alt="payment" />
                          </div>
                      )}
                  </div>
              </div>
          </div>
          </div>
        </main>
  
        <footer className="flex w-full bg-[#002c52] justify-center py-1.5 mt-4">
          <div className="w-full max-w-[1200px] flex justify-end gap-3 items-center px-4">
            <div className="flex h-fit text-white py-2">
              <div className="border-r-2 px-6">Chi siamo</div>
              <div className="border-r-2 px-6">Termini e condizioni</div>
              <div className="border-r-2 px-6">Privacy</div>
              </div>
              <div className="text-white text-sm flex gap-2 pl-6">
                <Image src={flag} width={20} height={10} alt=''/>
                <div className="">IT</div>
                </div>
                
              
                  </div>
                  </footer>
                  
                  </div>
      )
    }
    </>
   )
}
                
export default Ticket