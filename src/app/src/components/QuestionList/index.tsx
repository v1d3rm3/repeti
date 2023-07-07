import React from "react";
import { User, AlarmClock, MessagesSquare } from "lucide-react";

export interface Question {
  _id: string;
  title: string;
  content: string;
  userName: string;
  categoryName: string;
  dataFormated: string;
}

export interface QuestionProps {
  questions: Question[];
}

export default function QuestionList({ questions }: QuestionProps) {
  return (
    <>
      {questions?.map((question) => (
        <div
          key={question._id}
          className="bg-blue-950 text-white px-6 py-4 rounded overflow-hidden shadow-lg mb-4"
        >
          <div className="font-bold text-xl mb-2">{question.title}</div>
          <div className="text-slate-100 text-base font-serif text-justify">
            {question.content}
            <hr className="mt-4 mb-4" />
            <div className="inline-table font-sans font-bold md:flex flex-row">
              <div className="flex col mr-4 md:mr-6">
                <User className="text-white mr-2" size="20" />
                {question.userName}
              </div>
              <div className="flex col mr-4">
                <MessagesSquare className="text-white mr-2" size="20" />
                {question.categoryName}
              </div>
              <div className="flex col">
                <AlarmClock className="text-white mr-2" size="20" />
                {question.dataFormated}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
