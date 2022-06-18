import path from "path";
import fs from "fs";
import { useState } from "react";
import Style from "../styles/exam.module.css";

export default function Exam({ data: { title, questions } }) {
  const [answers, setAnswers] = useState();
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [displayResult, setdisplayResult] = useState(false);

  const checkAnswer = (answer) => {
    if (count == 10) {
      console.log(displayResult);
      displayResult = true;
    } else {
      if (questions[count].correct === answer) {
        setScore(score + 1);
        setCount(count + 1);
      } else {
        setWrongAnswers([...wrongAnswers, count]);
        setCount(count + 1);
      }
    }
  };
  return (
    <div className={Style.container}>
      <h1>{title}</h1>

      <div>
        {count == 10 ? (
          <div className={Style.result}>
            <h2>Your Score: {score}</h2>
            <section>
              {wrongAnswers.map((id) => {
                return (
                  <div key={id}>
                    <p>
                      <span>Question{id + 1}: </span>
                      {questions[id].question}
                    </p>
                    <p>
                      {" "}
                      <span>Correct Answer: </span>
                      {questions[id].correct}
                    </p>
                  </div>
                );
              })}
            </section>
          </div>
        ) : (
          <div className={Style.question}>
            <div>
              <h2>Question {count + 1}:</h2>
              <p>{questions[count].question}</p>

              <div>
                {questions[count].answers.map((answer, index) => {
                  return (
                    <button key={index} onClick={() => checkAnswer(answer)}>
                      {answer}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const dir = path.join(
    process.cwd(),
    `/public/data/${context.params.exam}.json`
  );

  const json = fs.readFileSync(dir, "utf-8");
  const data = JSON.parse(json);
  return {
    props: { data },
  };
}

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), "/public/data/sections.json");

  const json = fs.readFileSync(dir, "utf-8");
  const data = JSON.parse(json);

  const urlList = data.titles.map((title) => {
    let url = title
      .replace(/,/g, "")
      .replace(/ /g, "-")
      .replace(/:/g, "")
      .toLowerCase();
    return { params: { exam: url } };
  });

  return {
    paths: urlList,
    fallback: false, // fallback is set to false because we already know the slugs ahead of time
  };
}
