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

const actionInfo = [
  "לא נפתרו חידות",
  "פתירת חידה אחת",
  "פתירת שתי חידות או יותר",
];

export default function RequestActionCard({ action, duration }: RequestAction) {
  return (
    <div className="bg-white flex flex-col w-full border-[1px] border-gray-300 px-4 py-5 rounded-xl gap-4">
      <InfoLine title="פעולה" data={actionInfo[action]} />
      <InfoLine title="משך" data={`${duration} שניות`} />
    </div>
  );
}
