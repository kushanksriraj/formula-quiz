import { OptionPropType } from "../../context/QuizContext/quiz.types";
import { useState } from "react";

export const Option = (props: OptionPropType): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const selectOptionOnClick = (): void => {
    props.callback(props.option._id, props.option.isRight);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const optionCSSClass = loading
    ? props.option.isRight
      ? "right option__text"
      : "wrong  option__text"
    : "option__text";

  return (
    <div onClick={selectOptionOnClick} className={optionCSSClass}>
      {props.option.text}
    </div>
  );
};
