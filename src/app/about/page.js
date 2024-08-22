import HeaderMain from "@/components/HeaderMain";
import styles from "../page.module.css";

export const metadata = {
    title: 'About | Lexicographia',
    description: 'About Lexicographia'
}

export default async function Page() {
    return (
        <>
            <HeaderMain />

            <div className={`${styles.content}`}>

                <h3 className={`${styles.about}`}>
                    Lexicographia For Lexicographers:
                </h3>

                <br />

                <p>&nbsp;&nbsp;&nbsp;&nbsp;
                    The idea behind the Lexicographia is to end the era of the printed dictionaries. Because they are too expensive to release, it is hard to prepare them, they are not updatable, and also it could be hard to find some of them, especially if the dictionary does not belongs to one of the popular languages or if it focused on a specific field.
                </p>

                <br />

                <p>&nbsp;&nbsp;&nbsp;&nbsp;
                    But Lexicographia is completely free to use and it is easy to find or release a dictionary for all of the people. It has been developed to be a compatible with all languages as much as possible.
                </p>

                <br />

                <p>&nbsp;&nbsp;&nbsp;&nbsp;
                    Also, today many dictionaries have been preparing on databases and publishing as online after all, even the printed ones. Because it is also easy to use for the researchers. Therefore, The Lexicographia Organization handles that online publishing problems and leaves to the lexicographs only the lexicography job.
                </p>

                <br />

                <p>&nbsp;&nbsp;&nbsp;&nbsp;
                    But there is a problem about that; if you would like to prepare a dictionary, or your dictionary already has done, but you do not know how to publish it as online, here The Lexicographia Organization handle it.
                </p>

                <br />

                <p>&nbsp;&nbsp;&nbsp;&nbsp;
                    Lexicographia also able to count the statistics like how many words are there in your dictionary and how many of them originaly comes from another language, how many of them are verbs, adjectivies, or if your dictionary belongs to a language like Arabic or Hebrew, how many words based on the same root etc. for you.
                </p>

                <br /><br />
                <hr />
                <br /><br />

                <h3 className={`${styles.about}`}>
                    Who Is Behind This?
                </h3>

                <br />

                <p>&nbsp;&nbsp;&nbsp;&nbsp;
                    Lexicographia has developed by Savaş Şahin, who is a web developer, translator, and linguistics researcher.
                </p>

                <br /><br />
                <hr />
                <br /><br />

                <h3 className={`${styles.about}`}>
                    Which Technologies Does Lexicographia Use?
                </h3>

                <br />

                <p>&nbsp;&nbsp;&nbsp;&nbsp;
                    Lexicographia based on Next.js on the client side and Fastify on the server side. It stylized with raw CSS and it uses MongoDB as database.
                </p>

            </div>
        </>
    )
}