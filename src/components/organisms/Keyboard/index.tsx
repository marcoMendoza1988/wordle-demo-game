import React from 'react';
import deleteImage from '../../../assets/delete.svg';
import deleteDarkModeImage from '../../../assets/deleteDarkMode.svg';
import { useTheme } from '../../../context/ThemeContext';

interface KeyboardProps {
  layout: (string | string[])[];
  handleClick: (char: string) => void;
  keyStatus: any;
}

const Keyboard: React.FC<KeyboardProps> = ({ keyStatus, layout, handleClick }) => {
  const mainRows = layout.filter(item => typeof item === 'string') as string[];
  const lastRow = layout.find(item => Array.isArray(item)) as string[] | undefined;
  const { theme } = useTheme();

  const getKeyStyle = (key: string) => {
    if (keyStatus[key]) {
      return {
        backgroundColor: keyStatus[key], color: '#fff',
      };
    }
    return {};
  };

  return (
    <div className="flex flex-col items-center space-y-2 p-4 rounded bg-[#DADCE030] text-white">
      {mainRows.map((row, rowIndex) => (
        <div key={rowIndex} className={`flex space-x-2 ${rowIndex === 1 ? 'pl-[3rem]' : ''}`}>
          {row?.split('').map((char: string, charIndex: number) => (
            <button
              key={`${rowIndex}-${charIndex}`}
              className="flex justify-center items-center p-2 text-center rounded bg-[#D3D6DA] dark:bg-[#565F7E] font-normal text-black dark:text-white uppercase w-[44px] h-[50px]"
              onClick={() => handleClick(char.toUpperCase())}
              style={getKeyStyle(char.toUpperCase())}
            >
              {char}
            </button>
          ))}
        </div>
      ))}
      {lastRow && (
        <div className="flex space-x-2 pr-[5rem]">
          {lastRow.map((nestedItem, nestedIndex) => {
            if (nestedItem === 'enter') {
              return (
                <button
                  key={`${nestedIndex}`}
                  className="flex justify-center items-center p-2 text-center rounded bg-[#D3D6DA] dark:bg-[#565F7E] font-normal text-black dark:text-white uppercase"
                  onClick={() => handleClick(nestedItem.toUpperCase())}
                >
                  {nestedItem}
                </button>
              );
            } else if (nestedItem === 'zxcvbnm') {
              return nestedItem.split('').map((char, charIndex) => (
                <button
                  key={`${nestedIndex}-${charIndex}`}
                  className="flex justify-center items-center p-2 text-center rounded bg-[#D3D6DA] dark:bg-[#565F7E] font-normal text-black dark:text-white uppercase w-[44px] h-[50px]"
                  onClick={() => handleClick(char.toUpperCase())}
                  style={getKeyStyle(char.toUpperCase())}
                >
                  {char}
                </button>
              ));
            } else if (nestedItem === 'icon') {
              return (
                <button
                  key={`${nestedIndex}`}
                  className="flex justify-center items-center py-2 px-4 text-center rounded bg-[#D3D6DA] dark:bg-[#565F7E] font-normal text-black dark:text-white uppercase"
                  onClick={() => handleClick(nestedItem.toUpperCase())}
                >
                  <img src={theme === 'dark' ? deleteDarkModeImage : deleteImage} width={22} height={16} />
                </button>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default Keyboard;
