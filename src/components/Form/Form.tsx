import { FC, PropsWithChildren } from "react";

interface IForm {
  onSubmit?: () => void
}

export const Form: FC<PropsWithChildren<IForm>> = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      { children }
    </form>  
  )
}