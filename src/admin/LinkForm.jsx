import { div } from "framer-motion/client"

export default function LinkForm({ formData, setFormData, editMode, onSave, onClearForm }) {
    return (
        <div>
            <div className="p-4 border rounded space-y-4">

                <p className="ff flex font-semibold text-lg">
                    <h3 className="ff">{editMode ? "Edit Link" : "Add New Link"}</h3>
                    <button className="rounded-3xl bg-gray-100 hover:bg-gray-300 px-5 ms-4 border text-sm text-blue-600" onClick={()=>onClearForm()}>clear</button>
                </p>

                <div>
                    <label className="ff text-sm">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full border p-2 rounded ff focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="ff text-sm">Href</label>
                    <input
                        type="text"
                        value={formData.href}
                        onChange={(e) =>
                            setFormData({ ...formData, href: e.target.value })
                        }
                        className="w-full border p-2 rounded ff focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                
            </div>
            <button
                onClick={onSave}
                className="w-full bg-green-600 text-white my-2 p-2 rounded ff hover:bg-blue-700"
            >
                {editMode ? "Update" : "Save"}
            </button>
        </div>
    );
}
