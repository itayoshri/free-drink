import Digit from "../OTP/digit";

export default function OtpInput({
  changeDigit,
  length,
}: {
  changeDigit: (index: number, digit: number) => void;
  length: number;
}) {
  const digits = Array.from({ length }, (e, index) => length - 1 - index);

  return (
    <div className="flex w-full gap-2 justify-between">
      {digits.map((index) => (
        <Digit setValue={(digit) => changeDigit(index, digit)} key={index} />
      ))}
    </div>
  );
}
