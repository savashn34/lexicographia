import HeaderMain from "@/components/HeaderMain";
import styles from "../page.module.css";

export const metadata = {
    title: 'Terms of Use | Lexicographia',
    description: 'Terms of Use'
}

export default async function Page() {
    return (
        <>
            <HeaderMain />

            <div className={`${styles.content}`}>

                <h3 className={`${styles.about}`}>
                    1. Terms and Conditions
                </h3>

                <br />

                <p>
                    These Terms and Conditions govern your relationship with lexicographia.org web application ("us", "we", or "our").
                </p><br />

                <p>
                    Please read these Terms and Conditions carefully before using our service ("Lexicographia").
                </p><br />

                <p>
                    Lexicographia is an open source MIT licensed web application. It is still in the development phase and no warranties are given as for service availability or fitness for particular purpose. Lexicographia is provided free of charge for non-commercial purposes only.
                </p><br />

                <p>
                    Your access to and use of the Lexicographia is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use our service.
                </p><br />

                <p>
                    By accessing or using the Lexicographia, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access our service.
                </p>

                <br /><br />
                <hr />
                <br /><br />

                <h3 className={`${styles.about}`}>
                    2. Accounts
                </h3>

                <br />

                <p>
                    When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on Lexicographia.
                </p><br />

                <p>
                    You are responsible for safeguarding the password that you use to access the Lexicographia and for any activities or actions under your password, whether your password is with Lexicographia or a third-party service.
                </p><br />

                <p>
                    You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p><br />

                <br /><br />
                <hr />
                <br /><br />

                <h3 className={`${styles.about}`}>
                    3. Copyrights
                </h3>

                <br />

                <p>
                    All rights of this web application "Lexicographia" belong to us and all rights of the materials created and published by users on Lexicographia belong to the creator's itself only.
                </p><br />

                <p>
                    All transactions on the materials (creating, adding, changing or deleting) are stored in our database. These date values are visible for everyone, therefore our users are able to prove and protect their own copyrights.
                </p><br />

                <p>
                    Lexicographia does not guarantee the protection of the user's copyrights and assumes no responsibility for any copyright infringement.
                </p><br />

                <p>
                    It is forbidden to publish a copyrighted dictionary without any permission. Users who published a dictionary which is already copyrighted by another person without any permission will no longer be able to use our service and the copyrighted dictionary will be completely terminated from our database.
                </p><br />

                <br /><br />
                <hr />
                <br /><br />

                <h3 className={`${styles.about}`}>
                    4. Links To Other Websites
                </h3>

                <br />

                <p>
                    Lexicographia may contain links to third-party web sites or services that are not owned or controlled by Lexicographia.
                </p><br />

                <p>
                    Lexicographia has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Lexicographia shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
                </p><br />

                <p>
                    We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
                </p><br />

                <br /><br />
                <hr />
                <br /><br />

                <h3 className={`${styles.about}`}>
                    5. Termination
                </h3>

                <br />

                <p>
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p><br />

                <p>
                    Upon termination, your right to use the Lexicographia will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
                </p>

                <br /><br />
                <hr />
                <br /><br />

                <h3 className={`${styles.about}`}>
                    6. Changes
                </h3>

                <br />

                <p>
                    Lexicographia is a dynamic product. We may change, eliminate or restrict access to Lexicographia or any part of our product at any time, for any reason, with or without advance notice. And we may do so with respect to one, some or all of our users.
                </p>

                <br /><br />
                <hr />
                <br /><br />

                <h3 className={`${styles.about}`}>
                    7. Modification
                </h3>

                <br />

                <p>
                    These Terms may be modified from time to time. The date of the most recent revisions will always be at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed. You acknowledge and agree that it is your responsibility to review these Terms periodically and become aware of modifications.
                </p><br />

                <p>
                    You agree to accept any changes or revisions to these Terms by continuing to use Lexicographia. By continuing to use Lexicographia after we make any changes to these Terms, you are agreeing to be bound by the revised Terms.
                </p>

                <br /><br />
                <hr />
                <br /><br />

                <h3 className={`${styles.about}`}>
                    8. Privacy
                </h3>

                <br />

                <p>
                    See the <a href="/privacy-policy">Privacy Policy</a> page.
                </p>

                <br /><br />
                <hr />
                <br /><br />

                <h3 className={`${styles.about}`}>
                    9. Contact Us
                </h3>

                <br />

                <p>
                    If you have any questions about these Terms, please contact: lexicographia@protonmail
                </p><br />

                <p>
                    This document was last updated on August 11th, 2024
                </p>

            </div>
        </>
    )
}