import styles from './input.module.css';
import { FC, HTMLProps, useRef } from "react";
import { Text } from '../Text/Text';

export interface IInput extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  value: string;
  placeholder?: string;
  error: boolean;
  name: string;
  Icon?: any
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const Input: FC<IInput> = ({
  name,
  value,
  error,
  type,
  placeholder,
  Icon,
  onChange
  }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
  
    return (
      <>
        <div className={styles.wrapper}>
          { Icon && ( <Icon size={20}/> ) }
          <input
            className={styles.textfield}
            placeholder={placeholder}
            autoComplete='off'
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            ref={inputRef}
          />
        </div>
        { error && (
          <Text As="p" size={12}>
            { 'Ошибка заполнения данных' }
          </Text>
          ) 
        }
      </>
      )
}