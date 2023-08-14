import { FC } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "../../services/hooks";

export const Sound: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <main>
      <div>{ location.state.name }</div>
    </main>
  )
}