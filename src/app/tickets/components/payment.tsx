import { Icon } from '@iconify/react/dist/iconify.js';
import React, { FC } from 'react';
import { TicketResponse } from '../../../interface/ticket';

interface Props {
  ticket: TicketResponse;
}

const Payment: FC<Props> = ({ ticket }) => {
  const calculateTimeDifference = (targetDate: string, targetTime: string): string => {
    const now = new Date();

    // Combine date and time into a single Date object
    const target = new Date(`${targetDate}T${targetTime}`);

    const differenceInMilliseconds = target.getTime() - now.getTime();
    const totalSeconds = Math.floor(differenceInMilliseconds / 1000);

    if (totalSeconds <= 0) return "Tempo scaduto";

    // Calculate days, hours, and minutes
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${days} giorni, ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ore`;
  };

  const serviceFee = ticket.price * 0.08; // 8% service fee
  const priceWithoutFee = ticket.price - serviceFee;

  return (
    <div className="mb-3 p-2 pl-3 bg-gray-50">
      <div className="flex flex-col gap-4 w-full pr-4">
        <div className="flex justify-between">
          <div className="text-[#5C5C5C]">Seleziona il numero di biglietti:</div>
          <div className="text-[#002C52]">1</div>
        </div>
        <div className="flex justify-between">
          <div className="text-[#5C5C5C]">Dettaglio offerta:</div>
          <div className="text-[#002C52]">Singolo</div>
        </div>
        <div className="flex justify-between">
          <div className="text-[#5C5C5C]">1 biglietto per € {priceWithoutFee.toFixed(2)}:</div>
          <div className="text-[#002C52]">€ {priceWithoutFee.toFixed(2)}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-[#5C5C5C]">Commissioni di servizio:</div>
          <div className="text-[#002C52]">€ {serviceFee.toFixed(2)}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-[#5C5C5C]">Consegna del biglietto con:</div>
          <div className="text-[#002C52]">TicketOne</div>
        </div>
        <div className="flex justify-between text-xl">
          <div className="text-[#5C5C5C]">Prezzo fisso:</div>
          <div className="text-[#002C52] flex flex-col justify-end items-end">
            <div className="">€ {ticket.price.toFixed(2)}</div>
            <div className="text-sm text-[text-[#5C5C5C]">IVA inclusa</div>
          </div>
        </div>
        <div className="">
          <a href={ticket.link} className="w-full py-2 bg-[#FBC933] text-white">Acquista</a>
        </div>
        <div className="flex justify-between">
          <div className="text-[#5C5C5C]">Tempo rimanente:</div>
          <div className="text-[#002C52]">{calculateTimeDifference(ticket.date, ticket.time)}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-[#5C5C5C]">Tipo di posto:</div>
          <div className="text-[#002C52]">Posto numerato</div>
        </div>
        <div className="flex justify-between ">
          <div className="text-[#5C5C5C] flex items-end gap-1">
            <Icon icon="fluent-mdl2:pinned-solid" className="text-[#FBC933]" />
            <div className="text-[#002C52] font-semibold text-[9px]">Aggiungi ai preferiti</div>
          </div>
          <div className="text-[#5C5C5C] flex items-end gap-1">
            <Icon icon="si:heart-fill" className="text-[#FBC933]" />
            <div className="text-[#002C52] font-semibold text-[9px]">Dillo a un amico</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
