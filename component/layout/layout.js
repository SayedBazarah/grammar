import Style from "./layout.module.css";
import Link from "next/link";

function Layout() {
  const examSections = [
    "Response Test",
    "Short Idioms Exam",
    "Conversations and Comprehension Test",
    "Compound words: someone, anyone, somewhere",
    "Idioms with the phrasal verb break",
    "financial and bank expressions",
    "Idioms with the phrasal verb run",
    "Traveling Downunder: How can I immigrate to Australia?",
    "How to describe people: attitude expressions",
    "Comparison with as as",
    "English grammar and vocabulary questions",
    "Compound words: aftermath, afterthought, afterbirth",
    "Idioms with the phrasal verb drop",
    "Idioms with the phrasal verb pass",
    "Airport and flight travel expressions",
    "Digital cameras, photography and picture vocabulary",
    "Expressions with death, marriage and divorce",
    "Mobile telecommunication expressions",
    "Idioms with the phrasal verb pull",
    "Idioms with the phrasal verb get",
  ];
  return (
    <div className={Style.container}>
      <h1>Asmaa ♥ - Grammar Exam </h1>

      <div>
        {examSections.map((section, index) => {
          const url = section
            .replace(/,/g, "")
            .replace(/ /g, "-")
            .replace(/:/g, "")
            .toLowerCase();
          return (
            <div className={Style.exams} key={index}>
              <Link href={`/${url}`}>
                <h3>{section}</h3>
              </Link>
              <Link href={`/${url}`}>
                <a>Let's Practice</a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Layout;
