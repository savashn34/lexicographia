import HeaderMain from "@/components/HeaderMain";
import styles from "./page.module.css";
import Link from "next/link";

export const metadata = {
  title: 'Lexicographia',
  description: 'Lexicograhia is an open source web application that allows lexicographers to create and publish their own dictionaries. It focused on to give all the tools that a lexicographer may need, while saving its simplicity and ease of use.'
}

export default function Home() {
  return (
    <>
      <HeaderMain />

      <div className={`${styles.content}`}>

        <p>&nbsp;&nbsp;&nbsp;&nbsp;
          Lexicograhia is an open source web application that allows lexicographers to create and publish their own dictionaries. It focused on to give all the tools that a lexicographer may need, while saving its simplicity and ease of use.
        </p>

        <br />

        <p>&nbsp;&nbsp;&nbsp;&nbsp;
          Here is some of the reasons that made Lexicographia must be exist:
        </p>

        <br />

        <ul style={{ paddingLeft: '50px' }}>
          <li>
            People who want to create a dictionary for some reasons.
          </li>
          <li>
            To support lexicography and linguistic studies conducted by universities.
          </li>
          <li>
            Ensure the documentation of the endangered languages to prevent them from being completely forgotten.
          </li>
          <li>
            Creating specific dictionaries like a dictionary of the local dialects, dictionary of slangs, dictionary of botanical terms, dictionary of the loan words etc.
          </li>
          <li>
            To give opportunities for the people who interest in artifical languages.
          </li>
          <li>
            Students who want to create their own wordbooks while learning a foreign language.
          </li>
        </ul>

        <br />

        <p>&nbsp;&nbsp;&nbsp;&nbsp;
          If you would like to get more information about The Lexicographia; see the <Link href={'/about'} style={{ color: 'rgb(30, 144, 255)' }}>About</Link> page.
        </p>

      </div>
    </>
  );
}