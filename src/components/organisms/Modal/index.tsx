import React, { useEffect, useState } from 'react';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void, children: React.ReactNode, size: string }> = ({ isOpen, onClose, children, size }) => {
    const [modalOpen, setModalOpen] = useState(isOpen);

    useEffect(() => {
        setModalOpen(isOpen)
    }, [isOpen]);

    const handleClose = () => {
        setModalOpen(!isOpen);
        onClose();
    };

  return (
    <>
      {modalOpen && (
            <div className={`absolute inset-0 z-50 flex ${!localStorage.firstTime ? 'items-baseline' : 'items-center'} justify-center outline-none focus:outline-none bg-[#262B3CE3]`}>
                <div className="relative w-auto h-auto flex align-center border rounded-md bg-[#F3F3F3]" style={{ zIndex: '51' }}>
                    <div className="relative flex flex-col w-full">
                        <div className="flex items-start justify-between">
                            <h3 className="text-md font-semibold"></h3>
                            {/* <button
                                className="p-1 ml-auto bg-[#F3F3F3] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={handleClose}    
                            >
                            <span 
                                className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none" 
                                style={{ 
                                alignContent: 'center',
                                fontSize: 'xxx-large',
                                fontWeight: 200,
                                marginRight: '.5rem' 
                            }}>×</span>
                            </button> */}
                        </div>
                        <div className="relative flex-auto text-black">{children}</div>
                    </div>
                </div>
                <div className="fixed inset-0 z-40 bg-[#FFFFFF89] dark:bg-[#262B3C89]"></div>
            </div>
      )}
    </>
  );
};

export default Modal;