import { useState, useEffect } from "react";
import Question from "./question";

export default function QuestionsList() {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  console.log(questions);

  return (
    <div>
      {questions.map((item) => {
        <Question />;
      })}
    </div>
  );
}
