type InfoLine = {
  title: string;
  data: string;
};

export default function InfoLine({ title, data }: InfoLine) {
  return (
    <div className="flex w-full justify-between text-black">
      <a className="font-bold">{title}</a>
      <a className="font-medium">{data}</a>
    </div>
  );
}
