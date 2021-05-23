import { OptionPropType } from "../../context/quiz.types";
import { useState } from "react";

export const Option = (props: OptionPropType): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const selectOptionOnClick = (): void => {
    props.callback(props.option.id, props.option.isRight);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div
      onClick={selectOptionOnClick}
      className={
        loading
          ? props.option.isRight
            ? "right option__text"
            : "wrong  option__text"
          : " option__text"
      }
    >
      {props.option.text}
    </div>
  );
};
