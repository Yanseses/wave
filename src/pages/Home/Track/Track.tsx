import { FC } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "../../../services/hooks";
import { sound } from "../../../utils/mocks/sound";

export const Track: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <section>
      <div>{ location.state.name }</div>
    </section>
  )
}