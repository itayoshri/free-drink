type DigitProps = {
  setValue(num: number): unknown;
};

export default function Digit({ setValue }: DigitProps) {
  return (
    <input
      type="number"
      maxLength={1}
      className="text-5xl w-full border-[1px] ltr: text-black text-center py-4 rounded-xl font-inter font-bold border-gray-300 outline-primary"
      onInput={(e) => {
        const target = e.target as HTMLInputElement;
        const val = target.value;

        if (isNaN(Number(val))) {
          target.value = "";
          return;
        }

        if (val != "") {
          const next = target.previousElementSibling as HTMLInputElement;
          if (next) {
            next.focus();
          }
        }
      }}
      onKeyUp={(e) => {
        const target = e.target as HTMLInputElement;
        const key = e.key.toLowerCase();

        if (key == "backspace" || key == "delete") {
          target.value = "";
          const prev = target.nextElementSibling as HTMLInputElement;
          if (prev) {
            prev.focus();
          }
          return;
        }
      }}
      onChange={(e) => setValue(Number(e.target.value))}
    ></input>
  );
}
