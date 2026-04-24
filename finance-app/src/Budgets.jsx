import DoughnutChart from "./DoughnutChart.jsx";
import { useState } from "react";

function Budgets({ data = [], transactions = [], setData }) {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [modify, setModify] = useState(false);
    const [editBudget, setEditBudget] = useState(null);
    const [deleteItems, setDeleteItems] = useState(null);
    const [addItems, setAddItems] = useState(false);

    const [newBudget, setNewBudget] = useState({
        category: "",
        theme: "#277C78",
        maximum: 0,
    });

    const THEMES = [
        { name: "Green", color: "#277C78" },
        { name: "Yellow", color: "#F2CDAC" },
        { name: "Cyan", color: "#82C9D7" },
        { name: "Navy", color: "#626070" },
        { name: "Red", color: "#C94736" },
        { name: "Purple", color: "#826CB0" },
    ];

    const CATEGORIES = [
        { name: "Entertainment" },
        { name: "Bills" },
        { name: "Dining Out" },
        { name: "Personal Care" },
    ];

    const toggleMenu = (index) => {
        setOpenMenuIndex((prev) => (prev === index ? null : index));
    };

    const handleModify = (budget, index) => {
        setEditBudget({ ...budget, __index: index });
        setModify(true);
        setOpenMenuIndex(null);
    };

    const openDeleteModal = (index) => {
        setDeleteItems(index);
        setOpenMenuIndex(null);
    };

    const handleDelete = () => {
        const updated = data.filter((_, i) => i !== deleteItems);
        setData?.(updated);
        setDeleteItems(null);
    };

    const handleSave = () => {
        const updated = data.map((b, i) =>
            i === editBudget.__index
                ? {
                    category: editBudget.category,
                    theme: editBudget.theme,
                    maximum: editBudget.maximum,
                }
                : b
        );

        setData?.(updated);
        setModify(false);
        setEditBudget(null);
    };

    const handleAdd = () => {
        setNewBudget({
            category: CATEGORIES[0].name,
            theme: THEMES[0].color,
            maximum: 0,
        });
        setAddItems(true);
    };

    const handleNewSave = () => {
        if (!newBudget.category || newBudget.maximum <= 0) return;

        if (data.some((b) => b.category === newBudget.category)) {
            alert("Category already exists");
            return;
        }

        setData?.([...data, newBudget]);
        setAddItems(false);
    };

    return (
        <div style={{ background: "#F8F4F0", minHeight: "100vh", padding: 20 }}>
            <h1 className="mb-4">Budgets</h1>
            <button className="btn btn-primary" onClick={handleAdd}>
                Ajouter
            </button>

            <div className="row g-4">
                <div className="col-12 col-lg-4">
                    <div style={{ background: "white", padding: 20, borderRadius: 20 }}>
                        <DoughnutChart dataBudgets={data} />
                    </div>
                </div>

                <div className="col-12 col-lg-8">
                    {data.map((el, index) => {
                        const isOpen = openMenuIndex === index;

                        const categoryTransactions = transactions.filter(
                            (t) => t.category === el.category
                        );

                        const totalSpent = categoryTransactions.reduce(
                            (a, t) => a + Math.abs(t.amount),
                            0
                        );

                        const remaining = el.maximum - totalSpent;

                        const percentage =
                            el.maximum > 0
                                ? Math.min((totalSpent / el.maximum) * 100, 100)
                                : 0;

                        return (
                            <div key={index} className="p-3 mb-3 bg-white rounded position-relative">
                                <div className="d-flex justify-content-between">
                                    <h5>{el.category}</h5>
                                    <span onClick={() => toggleMenu(index)}>⋮</span>
                                </div>

                                {isOpen && (
                                    <div className="position-absolute bg-white shadow p-2">
                                        <button onClick={() => handleModify(el, index)}>
                                            Edit
                                        </button>
                                        <button onClick={() => openDeleteModal(index)}>
                                            Delete
                                        </button>
                                    </div>
                                )}

                                <p>Max: ${el.maximum}</p>

                                <div className="progress mb-2">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${percentage}%`, background: el.theme }}
                                    />
                                </div>

                                <small>
                                    ${totalSpent} / ${el.maximum}
                                </small>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ADD MODAL */}
            {addItems && (
                <div className="modal d-block">
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h4>Add Budget</h4>

                            <select
                                className="form-select mb-2"
                                value={newBudget.category}
                                onChange={(e) =>
                                    setNewBudget({
                                        ...newBudget,
                                        category: e.target.value,
                                    })
                                }
                            >
                                {CATEGORIES.map((c) => (
                                    <option key={c.name}>{c.name}</option>
                                ))}
                            </select>

                            <select
                                className="form-select mb-2"
                                value={newBudget.theme}
                                onChange={(e) =>
                                    setNewBudget({
                                        ...newBudget,
                                        theme: e.target.value,
                                    })
                                }
                            >
                                {THEMES.map((t) => (
                                    <option key={t.color} value={t.color}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                className="form-control mb-3"
                                value={newBudget.maximum}
                                onChange={(e) =>
                                    setNewBudget({
                                        ...newBudget,
                                        maximum: Number(e.target.value),
                                    })
                                }
                            />

                            <button className="btn btn-secondary me-2" onClick={() => setAddItems(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={handleNewSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE MODAL */}
            {deleteItems !== null && (
                <div className="modal d-block">
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h4>Confirm Delete</h4>
                            <button className="btn btn-danger" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {modify && editBudget && (
                <div className="modal d-block">
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h4>Edit Budget</h4>

                            <input
                                className="form-control mb-2"
                                value={editBudget.category}
                                onChange={(e) =>
                                    setEditBudget({
                                        ...editBudget,
                                        category: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="number"
                                className="form-control mb-3"
                                value={editBudget.maximum}
                                onChange={(e) =>
                                    setEditBudget({
                                        ...editBudget,
                                        maximum: Number(e.target.value),
                                    })
                                }
                            />

                            <button className="btn btn-secondary me-2" onClick={() => setModify(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Budgets;