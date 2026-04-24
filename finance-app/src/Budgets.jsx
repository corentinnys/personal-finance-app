import DoughnutChart from "./DoughnutChart.jsx";
import { useState } from "react";

function Budgets({ data = [], transactions = [], setData }) {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [modify, setModify] = useState(false);
    const [editBudget, setEditBudget] = useState(null);
    const [deleteItems, setDeleteItems] = useState(null);

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
        if (deleteItems === null) return;

        const updated = data.filter((_, i) => i !== deleteItems);

        setData?.(updated);

        setDeleteItems(null);
    };

    const handleSave = () => {
        if (!editBudget || editBudget.__index === undefined) return;

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

    return (
        <div style={{ background: "#F8F4F0", minHeight: "100vh", padding: 20 }}>
            <h1 className="mb-4">Budgets</h1>

            <div className="row g-4">
                {/* CHART */}
                <div className="col-12 col-lg-4">
                    <div
                        style={{
                            background: "white",
                            padding: 20,
                            borderRadius: 20,
                        }}
                    >
                        <DoughnutChart dataBudgets={data} />
                    </div>
                </div>

                {/* BUDGET LIST */}
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
                                ? Math.min(
                                    (totalSpent / el.maximum) * 100,
                                    100
                                )
                                : 0;

                        return (
                            <div
                                key={index}
                                style={{
                                    background: "white",
                                    padding: 20,
                                    borderRadius: 20,
                                    marginBottom: 15,
                                    position: "relative",
                                    boxShadow:
                                        "0 2px 10px rgba(0,0,0,0.05)",
                                }}
                            >
                                {/* HEADER */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <div
                                            style={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: "50%",
                                                background: el.theme,
                                            }}
                                        />

                                        <h3 className="m-0 h5">
                                            {el.category}
                                        </h3>
                                    </div>

                                    <div
                                        style={{
                                            cursor: "pointer",
                                            fontSize: 20,
                                            padding: "0 10px",
                                        }}
                                        onClick={() => toggleMenu(index)}
                                    >
                                        ⋮
                                    </div>
                                </div>

                                {/* MENU */}
                                {isOpen && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            right: 20,
                                            top: 50,
                                            background: "white",
                                            borderRadius: 10,
                                            boxShadow:
                                                "0 10px 25px rgba(0,0,0,0.15)",
                                            zIndex: 999,
                                            minWidth: 150,
                                            border: "1px solid #eee",
                                        }}
                                    >
                                        <button
                                            className="btn w-100 text-start p-3 border-bottom"
                                            onClick={() =>
                                                handleModify(el, index)
                                            }
                                        >
                                            Edit Budget
                                        </button>

                                        <button
                                            className="btn w-100 text-start p-3 text-danger"
                                            onClick={() =>
                                                openDeleteModal(index)
                                            }
                                        >
                                            Delete Budget
                                        </button>
                                    </div>
                                )}

                                {/* LIMIT */}
                                <p className="text-muted">
                                    Maximum: ${el.maximum}
                                </p>

                                {/* PROGRESS BAR */}
                                <div
                                    style={{
                                        height: 12,
                                        background: "#F8F4F0",
                                        borderRadius: 10,
                                        marginBottom: 10,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${percentage}%`,
                                            height: "100%",
                                            background: el.theme,
                                            borderRadius: 10,
                                            transition: "width 0.3s",
                                        }}
                                    />
                                </div>

                                {/* STATS */}
                                <div className="d-flex justify-content-between mb-4">
                                    <span>
                                        Spent: <strong>${totalSpent}</strong>
                                    </span>

                                    <span>
                                        Remaining:{" "}
                                        <strong>${remaining}</strong>
                                    </span>
                                </div>

                                {/* TRANSACTIONS */}
                                <ul className="list-unstyled">
                                    {categoryTransactions
                                        .slice(0, 3)
                                        .map((t) => (
                                            <li
                                                key={t.id}
                                                className="d-flex justify-content-between align-items-center p-3 border-bottom"
                                            >
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={t.avatar}
                                                        alt={t.name}
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius: "50%",
                                                            marginRight: "10px",
                                                        }}
                                                    />

                                                    <span
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {t.name}
                                                    </span>
                                                </div>

                                                <strong>
                                                    ${Math.abs(t.amount)}
                                                </strong>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* DELETE MODAL */}
            {deleteItems !== null && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: 30,
                            borderRadius: 15,
                            width: 450,
                        }}
                    >
                        <h3 className="mb-3">Delete Budget</h3>

                        <p className="text-muted mb-4">
                            Are you sure you want to delete this budget?
                            This action cannot be undone.
                        </p>

                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-light w-100"
                                onClick={() => setDeleteItems(null)}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-danger w-100"
                                onClick={handleDelete}
                            >
                                Yes, Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {modify && editBudget && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: 30,
                            borderRadius: 15,
                            width: 450,
                        }}
                    >
                        <h3 className="mb-4">Edit Budget</h3>

                        {/* CATEGORY */}
                        <div className="mb-3">
                            <label className="form-label fw-bold small">
                                Category
                            </label>

                            <select
                                className="form-select"
                                value={editBudget.category || ""}
                                onChange={(e) =>
                                    setEditBudget({
                                        ...editBudget,
                                        category: e.target.value,
                                    })
                                }
                            >
                                {CATEGORIES.map((t, index) => (
                                    <option key={index} value={t.name}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* THEME */}
                        <div className="d-flex align-items-end gap-2 mb-3">
                            <div className="flex-grow-1">
                                <label className="form-label fw-bold small">
                                    Theme
                                </label>

                                <select
                                    className="form-select"
                                    value={editBudget.theme || ""}
                                    onChange={(e) =>
                                        setEditBudget({
                                            ...editBudget,
                                            theme: e.target.value,
                                        })
                                    }
                                >
                                    {THEMES.map((t) => (
                                        <option
                                            key={t.color}
                                            value={t.color}
                                        >
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div
                                style={{
                                    width: 35,
                                    height: 35,
                                    borderRadius: "50%",
                                    backgroundColor: editBudget.theme,
                                    border: "2px solid #ddd",
                                    flexShrink: 0,
                                }}
                            />
                        </div>

                        {/* MAXIMUM */}
                        <label className="form-label fw-bold small">
                            Maximum Limit
                        </label>

                        <input
                            type="number"
                            className="form-control mb-4"
                            value={editBudget.maximum}
                            onChange={(e) =>
                                setEditBudget({
                                    ...editBudget,
                                    maximum: Number(e.target.value),
                                })
                            }
                        />

                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-light w-100"
                                onClick={() => setModify(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-dark w-100"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Budgets;