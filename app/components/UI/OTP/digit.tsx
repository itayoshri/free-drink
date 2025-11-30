type DigitProps = {
  setValue(num: number): unknown;
};

export default function Digit({ setValue }: DigitProps) {
  return (
    <input
      type="number"
      maxLength={1}
      className="text-5xl w-full text-black dark:text-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 
      text-center py-4 rounded-xl font-inter font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
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
      onKeyDown={(e) => {
        const target = e.target as HTMLInputElement;
        const key = e.key.toLowerCase();

        if (key == "backspace" || key == "delete") {
          if (target.value == "") {
            const prev = target.nextElementSibling as HTMLInputElement;
            if (prev) {
              prev.focus();
              prev.value = "";
            }
          } else target.value = "";
          return;
        }
      }}
      onChange={(e) => setValue(Number(e.target.value))}
    ></input>
  );
}
