'use client';

/**
|--------------------------------------------------
| npm imports
|--------------------------------------------------
*/
import { Icon } from '@iconify/react';

import { FC, useState } from 'react';
import Payment from './payment';
import { motion } from 'framer-motion';
import MapPage from './map';
import { TicketResponse } from '../../../interface/ticket';

/**
|--------------------------------------------------
| Custom imports
|-------------------------------------------------- 
*/
 interface props {
    ticket: TicketResponse
 }


const Stadium:FC<props> = ({ticket}) => {
    const [openPayment, setOpenPayment] = useState(false);

    return (
        <div className="bg-white text-[#5C5C5C] w-full mt-3 text-left relative">
            <div className="flex justify-between border-b-2 p-4">
                <div className="text-[24px] text-[#002c52]">
                    {
                        openPayment === false ? (
                            <div className="">Biglietti</div>
                        ) : (
                            <div onClick={() => setOpenPayment(false)} className="flex gap-1 items-center cursor-pointer">
                                <Icon className="text-[22px] text-[#3E91CF]" icon={'ion:chevron-back-sharp'} />
                                <div className="">Torna a tutte le offerte</div> {/* "Back to all offers" */}
                            </div>
                        )
                    }
                </div>
                <div className="flex gap-2">
                    <div className="w-8 h-8 flex rounded-sm border-[1px] border-[#dadada] justify-center items-center shadow-custom">
                        <Icon className="text-[#999]" icon={'ri:home-2-fill'} />
                    </div>
                    <div className="w-8 h-8 flex rounded-sm border-[1px] border-[#dadada] justify-center items-center shadow-custom">
                        <Icon className="text-[#999]" icon={'lineicons:search-minus'} />
                    </div>
                    <div className="w-8 h-8 flex rounded-sm border-[1px] border-[#dadada] justify-center items-center shadow-custom">
                        <Icon icon={'lineicons:search-plus'} className="text-[#999]" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 md:gap-0 md:flex-row w-full text-[#333]">
                {/* Left Box */}
                <div className="w-full md:w-2/6 flex flex-col border-r-0 md:border-r-2   shadow-custom md:shadow-none">
                    <div onClick={() => setOpenPayment(true)} className="flex gap-4 items-start border-b-2 pb-2 hover:cursor-pointer hover:bg-[#FEF2CC] h-fit">
                        <div className="flex gap-2 flex-col items-center px-2 pt-1">
                            <div>Quantità</div> {/* "Amount" */}
                            <div>1</div>
                        </div>
                        <div className="flex border-l-2 pl-2 pt-1 flex-col justify-between">
                            <div className="flex h-fit">
                                <div className="border-r-2 px-2">Fila 8</div> {/* "Row 8" */}
                                <div className="border-r-2 px-2">Posto 16</div> {/* "Seat 16" */}
                                <div className="px-2">Settore 201</div> {/* "Sector 201" */}
                            </div>
                            <div className="px-2 flex gap-3 items-start pt-2">
                                <div className="text-[#002c52]">Prezzo fisso $50.0</div> {/* "Fixed price $50.0" */}
                                <div className="flex gap-1">
                                    <div className="w-6 h-6 flex border-[1px] rounded-full bg-[#002c52] justify-center items-center shadow-sm">
                                        <Icon icon={'fluent:handshake-24-filled'} className="text-white" />
                                    </div>
                                    <div className="w-6 h-6 flex border-[1px] rounded-full bg-green-700 justify-center items-center shadow-sm">
                                        <Icon icon={'uil:check'} className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        openPayment && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Payment ticket={ticket} />
                            </motion.div>
                        )
                    }
                </div>

                {/* Right Box */}
                <div className="w-full md:w-4/6 flex justify-center items-center bg-white shadow-custom md:shadow-none md:border-l-2 h-[30vh] p-3">
                    <div className="w-full h-full">
                        <div className="text-center h-full text-[#002c52]"><MapPage/></div> {/* "Map" */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stadium;
