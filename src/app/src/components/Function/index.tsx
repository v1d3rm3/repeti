import { AnimatedOnScroll } from "../AnimetedOnScroll";

interface CardProps {
  title: string;
  content: string;
}

export function Function({ title, content }: CardProps) {
  return (
    <div className="bg-yellow text-black px-6 py-4 max-w-fit rounded overflow-hidden shadow-lg m-3 w-full md:max-w-xs">
      <div className="font-bold text-xl mb-2">{title}</div>
      <div className="text-gray-700 text-base font-serif text-justify">
        <AnimatedOnScroll
          id="description-card-function-wrapper"
          hiddenX={-10}
          hiddenY={0}
        >
          {content}
        </AnimatedOnScroll>
      </div>
    </div>
  );
}
