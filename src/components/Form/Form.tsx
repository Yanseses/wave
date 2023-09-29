import { FC, PropsWithChildren } from "react";

export const Form: FC<PropsWithChildren<{ onSubmit?: () => void }>> = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      { children }
    </form>  
  )
}