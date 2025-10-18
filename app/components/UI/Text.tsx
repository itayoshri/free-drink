type TextProps = {
  title?: string;
  subTitle?: string;
  text?: string;
  className?: string;
};

const styling = {
  title: "text-black text-3xl font-bold",
  subTitle: "text-black text-2xl font-bold",
  text: "text-black",
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
