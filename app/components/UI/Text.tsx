type TextProps = {
  title?: string;
  subTitle?: string;
  text?: string;
  className?: string;
};

const styling = {
  title: "text-black text-2xl font-bold dark:text-white",
  subTitle: "text-black text-xl font-bold dark:text-white",
  text: "text-zinc-400 font-medium dark:text-white",
};

export default function TextBlock({
  title,
  subTitle,
  text,
  className = "",
}: TextProps) {
  return (
    <div className={className}>
      <h1 className={styling.title}>{title}</h1>
      <h2 className={styling.subTitle}>{subTitle}</h2>
      <a className={styling.text}>{text}</a>
    </div>
  );
}
