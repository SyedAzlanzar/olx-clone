import clsx from "clsx";

interface ButtonProps {
  text: any;
  className?: string;
  type?: "button" | "submit";
  onClick?(params?: any[]): void;

}

function Button({ text, type, className, onClick }: ButtonProps) {
  return (
    <>
      <button
        type={type}
        onClick={() => onClick && onClick()}
        className={clsx(`${className}`)}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
