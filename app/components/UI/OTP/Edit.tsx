export default function EditPhoneNumber({
  mobilePhone,
  clearPhoneNumber,
}: {
  mobilePhone: string;
  clearPhoneNumber(): void;
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-md text-gray-500">
        <span className="font-medium">הקלידו את קוד האימות שנשלח ל</span>
        <span className="font-inter font-semibold">{mobilePhone}</span>
      </p>
      <button
        onClick={() => clearPhoneNumber()}
        className="text-red-500 font-bold"
      >
        ערוך מספר
      </button>
    </div>
  );
}
