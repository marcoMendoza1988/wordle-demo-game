import { useEffect, useState } from "react";
import Keyboard from "../../organisms/Keyboard";
import Modal from "../../organisms/Modal";
import CountdownTimer from "../../organisms/CountdownTimer";
import Instructions from "../Instructions";
import { useTheme } from "../../../context/ThemeContext";
import lightMode from "../../../assets/lightMode.svg";
import darkMode from "../../../assets/darkmode.svg";
import grids from "../../../assets/grids.svg";
import info from "../../../assets/info.svg";
import gridsDarkMode from "../../../assets/gridsDarkMode.svg";
import infoDarkMode from "../../../assets/infoDarkMode.svg";

const Gameboard = () => {
    const rowCounter = 5;
    const [fileContent, setFileContent] = useState<object>({letter:'', color: '', textColor: '#000'});
    const keyboardLayout = ['qwertyuiop', 'asdfghjklñ', ['enter', 'zxcvbnm', 'icon']];
    const emptyGrid = Array(rowCounter).fill({letter:'', color: '#939B9F30', textColor: '#000'}).map(() => Array(rowCounter).fill({letter:'', color: '#939B9F30', textColor: '#000'}));
    const [grid, setGrid] = useState<any>(emptyGrid);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);
    const [randomWord, setRandomWord] = useState<string>('');
    const [ openModal, setOpenModal ] = useState(false);
    const [ totalSeconds, setTotalSecondsProps ] = useState();
    const [ isAWinner, setisAWinner ] = useState(false);
    const [keyStatus, setKeyStatus] = useState<{ [key: string]: string }>({});
    const { theme, toggleTheme } = useTheme();

    const restartGame = () => {
        setGrid(emptyGrid);
        selectRandomWord(fileContent)
        setCurrentRow(0)
        setCurrentCol(0)
        setOpenModal(false);
        setKeyStatus({});
    }

    const handleEnterClick = () => {
        if (currentCol === 5) {
            const newRow = grid[currentRow];
            let newRowObject: object[] = Array(5).fill({letter: '',color:'#D3D6DA', textColor: '#000'});
            let counterGreenLetters: number = 0;
            const newKeyStatus = { ...keyStatus };

            for (let i = 0; i < randomWord.length; i++) {
                if (newRow[i].letter === randomWord[i]) {
                    counterGreenLetters = counterGreenLetters + 1;  
                    newRowObject[i] = {letter:newRow[i].letter, color:'#66A060', textColor: '#fff'};
                    newKeyStatus[newRow[i].letter] = '#66A060';
                } else if (randomWord.includes(newRow[i].letter)) {
                    newKeyStatus[newRow[i].letter] = newKeyStatus[newRow[i].letter] !== 'green' ? '#CEB02C' : newKeyStatus[newRow[i].letter];
                    newRowObject[i] = {letter:newRow[i].letter, color:'#CEB02C', textColor: '#fff'};
                }else {
                    newKeyStatus[newRow[i].letter] = '#818181';
                    newRowObject[i] = {letter:newRow[i].letter, color:'#939B9F', textColor: '#fff'};
                }
            }
            
            const newGrid = [...grid];
            
            newGrid[currentRow] = newRowObject;
            setGrid(newGrid);
            setKeyStatus(newKeyStatus)

            if (currentRow < 4) {
              setCurrentRow(currentRow + 1);
              setCurrentCol(0);
            }else {
                setisAWinner(false);
                setOpenModal(true)
                const plays = Number(localStorage.plays) || 0;
                localStorage.setItem('plays', JSON.stringify((plays + 1)))
            }

            if(counterGreenLetters === rowCounter){
                setOpenModal(true)
                setisAWinner(true);
                const wins = Number(localStorage.victories) || 0;
                const plays = Number(localStorage.plays) || 0;

                localStorage.setItem('plays', JSON.stringify((plays + 1)))
                localStorage.setItem('victories', JSON.stringify((wins + 1)))
            }
        }
    };

    const handleIconClick = () => {
        if (currentCol > 0) {
            const newGrid = [...grid];
            newGrid[currentRow][currentCol - 1] = {letter: '', color: '#939B9F30', textColor: '#000'};
            setGrid(newGrid);
            setCurrentCol(currentCol - 1);
        }
    };

    const handleLetterClick = (letter: string) => {
        if (currentCol < 5) {
          const newGrid = [...grid];
          newGrid[currentRow][currentCol] = {letter, color: '#939B9F30', textColor: '#000'};
          setGrid(newGrid);
          setCurrentCol(currentCol + 1);
        }
    };

    const handleClick = (char: string) => {
        if(char === 'ENTER'){
            handleEnterClick();
        }else if(char === 'ICON'){
            handleIconClick()
        }else {
            handleLetterClick(char)
        }
    }

    const convertTxtToJson = (text: string): any => {
        const words = text.split('\n').map(word => word.trim()).filter(word => word !== '');
        const json: { [key: string]: string } = {};
        words.forEach((word, index) => {
          json[`word${index + 1}`] = word;
        });
        return json;
    };

    const selectRandomWord = (json: object) => {
        const fiveLetterWords: string[] = Object.values(json).filter((word: string) => word.length === 5);
        if (fiveLetterWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
            const wordWithoutQuotes = fiveLetterWords[randomIndex].split('').map(letter => letter === "ñ" ? letter : letter.normalize("NFD").replace(/[\u0300-\u036f']/g, '')).join('');
            
            setRandomWord(wordWithoutQuotes.toUpperCase());
        } else {
          setRandomWord('No hay palabras de 5 letras en el archivo.');
        }
    };
    
    useEffect(() => {
        const fetchFileContent = async () => {
          try {
            const response = await fetch('/wordle-demo-game/words.txt');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const text = await response.text();
            const textParsed = convertTxtToJson(text);
            setFileContent(textParsed);
            selectRandomWord(textParsed);
          } catch (error) {
            console.error('Error fetching the file:', error);
          }
        };
        if(!localStorage.firstTime){
            setOpenModal(true);
        }
        fetchFileContent();
    }, []);

    useEffect(() => {
        if(totalSeconds === 1){
            restartGame();
            setOpenModal(false);
        }
    }, [totalSeconds]);

    return (
        <main className="pt-10 pb-10 container-xl">
            <div className="flex flex-col w-full max-w-[638px] m-auto gap-[3rem]">
                <div>
                    <header className="flex flex-row gap-4 justify-between items-center w-full h-[64px] bg-[#F3F3F3] dark:bg-[#DADCE030] p-4 rounded-md">
                        <button type="button" onClick={() => {
                            localStorage.removeItem('firstTime')
                            setOpenModal(true)
                        }}>{theme !== 'light' ? <img src={infoDarkMode} width={27} height={27} /> : <img src={info} width={27} height={27} />}</button>
                        <p className="text-[40px] font-normal">WORDLE</p>
                        <div className="flex justify-center items-center">
                            <button type="button" onClick={() => {
                                localStorage.setItem('firstTime', 'true')
                                setOpenModal(true)
                            }}>{theme !== 'light' ? <img src={gridsDarkMode} width={39} height={36} /> : <img src={grids} width={39} height={36} />}</button>
                            <button onClick={toggleTheme}>
                                {theme !== 'light' ? <img src={darkMode} width={60} height={30} /> : <img src={lightMode} width={60} height={30} />} 
                            </button>
                        </div>
                    </header>
                    <div className="w-full max-w-[480px] m-auto">
                    <section className="grid grid-cols-5 grid-rows-5 gap-3 p-4">
                        {grid.map((row: any, rowIndex: number) => (
                        row.map(({letter, color, textColor}: any, colIndex: number) => (
                            <span key={`${rowIndex}-${colIndex}`} className={`flex justify-center items-center p-4 rounded w-[76px] h-[76px] text-[32px] font-bold uppercase text-[#000] dark:text-[#000]`} style={{backgroundColor: color, color: textColor}}>
                            {letter}
                            </span>
                        ))
                        ))}
                    </section>

                    </div>
                </div>
                <Keyboard keyStatus={keyStatus} layout={keyboardLayout} handleClick={handleClick}/>
            </div>
            <Modal 
                size={'small'}
                isOpen={openModal} 
                onClose={() => setOpenModal(false)}
            >   
                {!localStorage.firstTime ?
                <Instructions restartGame={restartGame}/> 
                :
                <div className="w-[546px] flex flex-col justify-center items-center gap-[2rem] py-[2rem] px-[5rem] border border-[#262B3C] rounded-md bg-[#F3F3F3] text-dark dark:bg-[#262B3C] dark:text-white">
                    <p className="text-[35px] font-semibold">Estadísticas</p>
                    <div className="w-full flex justify-between">
                        <span className="flex flex-col items-center">
                            <b className="text-[35px] font-semibold">{localStorage.plays || 0}</b>
                            <strong className="text-[21px] font-light">Jugadas</strong>
                        </span>
                        <span className="flex flex-col items-center">
                            <b className="text-[35px] font-semibold">{localStorage.victories || 0}</b>
                            <strong className="text-[21px] font-light">Victorias</strong>
                        </span>
                    </div>
                    {!isAWinner && <span className="font-semibold">La palabra era: {randomWord}</span>}
                    <div className="flex flex-col gap-[.5rem] items-center">
                        <p className="uppercase text-[19px] font-normal">Siguiente palabra</p>
                        <span className="text-[24px] font-normal">
                            <CountdownTimer setTotalSecondsProps={setTotalSecondsProps} />
                        </span>
                        <button type="button" className="text-[28px] text-white bg-[#6AAA64] px-[2rem] rounded  font-normal" onClick={restartGame}>Aceptar</button>
                    </div>
                </div>}
            </Modal>
        </main>
    )
}

export default Gameboard;
