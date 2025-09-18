import InfoLine from "./infoLine";

export enum Action {
  FAILED = 0,
  ONE_QUESTION = 1,
  TWO_QUESTIONS_OR_MORE = 2,
}

type RequestAction = {
  action: Action;
  duration: number;
};

export const actionInfo = [
  { action: "לא נפתרו חידות", message: "הפעם זה לא הצליח :(" },
  { action: "פתירת חידה אחת", message: "כמעט הצלחנו, קיבלתם 70 פקקים!" },
  {
    action: "פתירת שתי חידות או יותר",
    message: "הפעולה הושלמה בהצלחה, קיבלתם 80 פקקים!",
  },
];

export default function RequestActionCard({ action, duration }: RequestAction) {
  return (
    <div className="bg-white flex flex-col w-full border-[1px] border-gray-300 px-4 py-5 rounded-xl gap-4">
      <InfoLine title="פעולה" data={actionInfo[action].action} />
      <InfoLine title="משך" data={`${duration} שניות`} />
    </div>
  );
}
