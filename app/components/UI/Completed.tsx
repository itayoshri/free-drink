const SUCCEED_TEXT = "הפעולה הושלמה בהצלחה, קיבלתם 80 פקקים!";
const FAILED_TEXT = "הפעם זה לא הצליח, אין מספיק חידות פתורות";
export default function CompletedPage() {
  return (
    <div className="flex flex-col w-full text-center font-bold text-3xl text-black items-center">
      <a>הפעולה הושלמה בהצלחה, קיבלתם 80 פקקים!</a>
    </div>
  );
}
