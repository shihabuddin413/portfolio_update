import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import LinksTable from "./LinksTable";
import LinkForm from "./LinkForm";

export default function EditHeader() {
    const [shortName, setShortName] = useState("");
    const [links, setLinks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const [formData, setFormData] = useState({ name: "", href: "" });

    // Load Firestore Data
    useEffect(() => {
        const loadHeader = async () => {
            try {
                const docRef = doc(db, "header", "config");
                const snap = await getDoc(docRef);
                const data = snap.data();

                setShortName(data.shortName || "");
                setLinks(data.navLinks || []);
            } catch (err) {
                console.log(err);
            }
        };
        loadHeader();
    }, []);

    // Save or Update
    const saveShortName = async () => {
        try {
            const docRef = doc(db, "header", "config");
            await updateDoc(docRef, {
                shortName,
                navLinks: links,
            });

            alert('Short name updated successfully');


        } catch (err) {
            console.log(err);
        }
    }

    const saveHeader = async () => {
        try {
            const docRef = doc(db, "header", "config");

            let updatedLinks = [...links];

            // Edit mode
            if (editIndex !== null) {
                updatedLinks[editIndex] = formData;
            } else {
                // Add new
                if (!formData.name.trim() || !formData.href.trim()){
                    console.log('empty data cannot be updated')
                    alert('link name or href is empty')
                } else {
                    updatedLinks.push(formData);
                }
                
            }

            await updateDoc(docRef, {
                shortName,
                navLinks: updatedLinks,
            });

            setLinks(updatedLinks);
            setFormData({ name: "", href: "" });
            setEditIndex(null);
        } catch (err) {
            console.log(err);
        }
    };

    // Delete
    const deleteItem = async (name) => {
        const newList = links.filter((i) => i.name !== name);

        setLinks(newList);

        await updateDoc(doc(db, "header", "config"), {
            shortName,
            navLinks: newList,
        });
    };

    // Edit button
    const editItem = (item, index) => {
        setEditIndex(index);
        setFormData({ name: item.name, href: item.href });
    };

    //clear form data
    const clearFormData = () => {
        setEditIndex(null);
        setFormData({ name: '', href: '' });
    };

    return (
        <div className="p-4 space-y-6">

            {/* SHORT NAME */}
            <div>
                <label className="ff text-sm">Short Name</label>
                <div className="flex">
                    <input
                        className="border p-2 rounded ff focus:ring-2 focus:ring-blue-400"
                        value={shortName}
                        onChange={(e) => setShortName(e.target.value)}
                    />
                    <button 
                        onClick={()=>saveShortName()}
                        className="ms-2 rounded bg-green-500 p-2 ff text-gray-50 hover:bg-blue-500">Save</button>
                </div>
                
            </div>

            {/* LINKS TABLE */}
            <LinksTable links={links} onEdit={editItem} onDelete={deleteItem} />

            {/* LINK FORM (OUTSIDE TABLE – NO BLUR) */}
            <LinkForm
                formData={formData}
                setFormData={setFormData}
                editMode={editIndex !== null}
                onSave={saveHeader}
                onClearForm = {clearFormData}
            />
        </div>
    );
}
