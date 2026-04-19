import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function EditHero() {

    const [buttonText, setbuttonText] = useState("Discover More");
    const [whoYouAre, setwhoYouAre] = useState("not Why but When?");
    const [firstName, setfirstName] = useState("Shihabe ");
    const [lastName, setlastName] = useState("Shangvi");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const loadHeader = async () => {
            try {
                const docRef = doc(db, "hero", "config");
                const snap = await getDoc(docRef);
                const data = snap.data();

                if (data) {
                    setbuttonText(data.buttonText || "");
                    setwhoYouAre(data.whoYouAre || "");
                    setfirstName(data.firstName || "");
                    setlastName(data.lastName || "");
                }

            } catch (err) {
                console.log(err);
            }
        };
        loadHeader();
    }, []);

    const handleUpdate = async () => {
        setLoading(true);
        setSuccess(false);

        try {
            const docRef = doc(db, "hero", "config");

            await updateDoc(docRef, {
                buttonText,
                whoYouAre,
                firstName,
                lastName
            });

            setSuccess(true);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <h2 className="ff">Edit Hero Section</h2>

            <div style={styles.field}>
                <label className="ff">First Name</label>
                <input
                    className="border text-blue-500  p-2 rounded ff focus:ring-2 focus:ring-blue-400"
                    type="text"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                />
            </div>

            <div style={styles.field}>
                <label className="ff">Last Name</label>
                <input
                    className="border text-blue-500 p-2 rounded ff focus:ring-2 focus:ring-blue-400"
                    type="text"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                />
            </div>

            <div style={styles.field}>
                <label className="ff">Who You Are</label>
                <input
                    className="border text-blue-500 p-2 rounded ff focus:ring-2 focus:ring-blue-400"
                    type="text"
                    value={whoYouAre}
                    onChange={(e) => setwhoYouAre(e.target.value)}
                />
            </div>

            <div style={styles.field}>
                <label className="ff">Button Text</label>
                <input
                    className="border text-blue-500 p-2 rounded ff focus:ring-2 focus:ring-blue-400"
                    type="text"
                    value={buttonText}
                    onChange={(e) => setbuttonText(e.target.value)}
                />
            </div>

            <button className="ff" onClick={handleUpdate} disabled={loading}>
                {loading ? "Updating..." : "Save Changes"}
            </button>

            {success && <p className="ff" style={{ color: "green" }}>Updated successfully!</p>}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "400px",
        margin: "50px auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },
    field: {
        display: "flex",
        flexDirection: "column"
    }
};