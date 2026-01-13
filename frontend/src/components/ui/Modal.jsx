import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { RxCross1 } from "react-icons/rx";

export const Modal = ({isOpen, onClose, children})=>{

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    if(!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            {/* overlay */}
            <div onClick={onClose} 
                className='absolute inset-0 bg-black/40 backdrop-blur-sm ' 
            />
                {/* modal box */}
                <div className='relative z-10 w-[70vw] h-[80vh] bg-white rounded-2xl shadow-xl overflow-hidden'>
                    <RxCross1 onClick={onClose} className='text-2xl absolute top-5 right-5 cursor-pointer'/>
                    {children}
                </div>

        </div>, 
        document.body
    )
}