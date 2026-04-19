export default function LinksTable({ links, onEdit, onDelete }) {
    return (
        <div className="border rounded shadow-sm overflow-x-auto">
            <p className="p-2 ff">Links </p>
            <table className="min-w-full text-sm">

                <tbody>
                    {links.map((item, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50">
                            <td className="px-4 ff py-2">{index + 1}</td>
                            <td className="px-4 ff py-2">{item.name}</td>
                            <td className="px-4 ff py-2">{item.href}</td>
                            <td className="px-4 ff py-2 space-x-3">
                                <button
                                    onClick={() => onEdit(item, index)}
                                    className="text-blue-500 underline"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => onDelete(item.name)}
                                    className="text-red-500 underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
