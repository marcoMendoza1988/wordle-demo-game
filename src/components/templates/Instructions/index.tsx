import React from "react";

type InstructionsProps = {
    restartGame: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({restartGame}) => {

    return (
        <div className="p-[2rem] flex flex-col gap-4 w-[546px] items-center justify-center dark:bg-[#262B3C] dark:text-white">
            <p className="font-bold text-[35px]">Cómo jugar</p>
            <div className="flex flex-col gap-[1rem] text-[16px]">
                <span>Adivina la palabra oculta en cinco intentos.</span>
                <span>Cada intento debe ser una palabra válida de 5 letras.</span>
                <span>Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.</span>
            </div>
            <div className="flex flex-col gap-2">
                <span><b>Ejemplos</b></span>
                <div className="flex gap-[.5rem]">
                    {
                        [{letter:'G', color: '#6AAA64'}, {letter:'A', color: 'transparent'}, {letter:'T', color: 'transparent'}, {letter:'O', color: 'transparent'}, {letter:'S', color: 'transparent'}]
                        .map(({letter, color}: any, colIndex: number) => (
                            <span key={`${colIndex}`} className={`flex justify-center items-center p-4 rounded w-[76px] h-[76px] text-[32px] border border-black font-bold uppercase text-[#000] dark:text-[#fff] dark:border-[#f3f3f3]`} style={{backgroundColor: color}}>
                            {letter}
                            </span>
                        ))
                    }
                </div>
                <span className="font-light text-[16px]">La letra <b className="font-semibold">G</b> está en la palabra y en la posición correcta.</span>
                <div className="flex gap-[.5rem]">
                    {
                        [{letter:'V', color: 'transparent'}, {letter:'O', color: 'transparent'}, {letter:'C', color: '#CEB02C'}, {letter:'A', color: 'transparent'}, {letter:'L', color: 'transparent'}]
                        .map(({letter, color}: any, colIndex: number) => (
                            <span key={`${colIndex}`} className={`flex justify-center items-center p-4 rounded w-[76px] h-[76px] text-[32px] border border-black font-bold uppercase text-[#000] dark:text-[#fff] dark:border-[#f3f3f3]`} style={{backgroundColor: color}}>
                            {letter}
                            </span>
                        ))
                    }
                </div>
                <span className="font-light text-[16px]">La letra <b className="font-semibold">C</b> está en la palabra pero en la posición incorrecta.</span>
                <div className="flex gap-[.5rem]">
                    {
                        [{letter:'C', color: 'transparent'}, {letter:'A', color: 'transparent'}, {letter:'N', color: 'transparent'}, {letter:'T', color: 'transparent'}, {letter:'O', color: '#939B9F'}]
                        .map(({letter, color}: any, colIndex: number) => (
                            <span key={`${colIndex}`} className={`flex justify-center items-center p-4 rounded w-[76px] h-[76px] text-[32px] border border-black font-bold uppercase text-[#000] dark:text-[#fff] dark:border-[#f3f3f3]`} style={{backgroundColor: color}}>
                            {letter}
                            </span>
                        ))
                    }
                </div>
                <span className="font-light text-[16px]">La letra <b className="font-semibold">O</b> no está en la palabra.</span>
            </div>
            <span>Puede haber letras repetidas. Las pistas son independientes para cada letra.</span>
            <span>¡Una palabra nueva cada 5 minutos!</span>
            <button type="button" className="text-[28px] text-white bg-[#6AAA64] px-[2rem] rounded  font-normal" onClick={() => {
                restartGame();
                localStorage.setItem('firstTime', 'true')
            }}>!JUGAR¡</button>
        </div>
    )
}

export default Instructions;
