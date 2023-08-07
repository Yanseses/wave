import { FC, PropsWithChildren } from "react";
import classnames from 'classnames';
import styles from './text.module.css';

export type TSize = 8 | 10 | 12 | 14 | 16 | 18 | 20 | 26;
export type TColor = 'primary' | 'secondary' | 'inherit';

interface IText {
  As?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';
  size: TSize;
  color?: TColor,
  extraClass?: string;
}

export const Text: FC<PropsWithChildren<IText>> = ({
  As = 'span',
  size,
  color = 'primary',
  children,
  extraClass
}) => {
  const className = classnames(
    styles.default,
    styles[`color__${color}`],
    styles[`s${size}`],
    extraClass
  );

  return (
    <As className={className}>
      { children }
    </As>
  )
}