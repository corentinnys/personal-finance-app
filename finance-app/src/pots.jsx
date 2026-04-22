import { useState } from "react";

function Pots({ data }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [amount, setAmount] = useState(0);
    const [action, setAction] = useState("");

    const [pots, setPots] = useState(data);

    // Open modal
    const handleClick = (item, type) => {
        setSelectedItem(item);
        setAction(type);
        setShowModal(true);
    };

    // Add money
    const handleAddMoney = () => {
        if (!amount || amount <= 0) return;

        const updatedPots = pots.map((pot) =>
            pot.name === selectedItem.name
                ? {
                    ...pot,
                    total: pot.total + amount,
                }
                : pot
        );

        setPots(updatedPots);

        // update selected item
        setSelectedItem(
            updatedPots.find((pot) => pot.name === selectedItem.name)
        );

        setAmount(0);
        setShowModal(false);
    };

    // Withdraw money
    const handleLessMoney = () => {
        if (!amount || amount <= 0) return;

        const updatedPots = pots.map((pot) =>
            pot.name === selectedItem.name
                ? {
                    ...pot,
                    total: Math.max(0, pot.total - amount),
                }
                : pot
        );

        setPots(updatedPots);

        // update selected item
        setSelectedItem(
            updatedPots.find((pot) => pot.name === selectedItem.name)
        );

        setAmount(0);
        setShowModal(false);
    };

    return (
        <div
            className="container py-4"
            style={{ background: "#F8F4F0", minHeight: "100vh" }}
        >
            <div className="row g-4">
                {pots?.map((item, index) => {
                    const percentage = Math.min(
                        (item.total / item.target) * 100,
                        100
                    );

                    return (
                        <div key={index} className="col-12 col-md-6">
                            <div
                                className="bg-white p-4 shadow-sm h-100"
                                style={{ borderRadius: "20px" }}
                            >
                                {/* Header */}
                                <div className="d-flex align-items-center gap-2">
                                    <span
                                        className="bulles"
                                        style={{
                                            background: item.theme,
                                            width: "15px",
                                            height: "15px",
                                            borderRadius: "50%",
                                            display: "inline-block",
                                        }}
                                    ></span>

                                    <h3 className="m-0">{item.name}</h3>
                                </div>

                                {/* Total */}
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <span>Total saved</span>
                                    <span className="fs-1 fw-bold">
                                        ${item.total}
                                    </span>
                                </div>

                                {/* Progress */}
                                <div className="progress mt-3">
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: `${percentage}%`,
                                            background: item.theme,
                                        }}
                                    >
                                        {Math.round(percentage)}%
                                    </div>
                                </div>

                                {/* Target */}
                                <div className="d-flex justify-content-between mt-2">
                                    <span>Target</span>
                                    <span>${item.target}</span>
                                </div>

                                {/* Buttons */}
                                <div className="d-flex gap-2 mt-4">
                                    <button
                                        className="btn w-50"
                                        style={{ background: "#F8F4F0" }}
                                        onClick={() =>
                                            handleClick(item, "add")
                                        }
                                    >
                                        Add money
                                    </button>

                                    <button
                                        className="btn w-50"
                                        style={{ background: "#F8F4F0" }}
                                        onClick={() =>
                                            handleClick(item, "withdraw")
                                        }
                                    >
                                        Withdraw
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {showModal && selectedItem && (() => {
                const percentageItem = Math.min(
                    (selectedItem.total / selectedItem.target) * 100,
                    100
                );

                return (
                    <div
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                        style={{
                            background: "rgba(0,0,0,0.5)",
                            zIndex: 999,
                        }}
                    >
                        <div
                            className="bg-white p-4"
                            style={{
                                width: "500px",
                                borderRadius: "20px",
                            }}
                        >
                            {/* Title */}
                            <h4 className="mb-3">
                                {action === "add"
                                    ? `Add money to '${selectedItem.name}'`
                                    : `Withdraw from '${selectedItem.name}'`}
                            </h4>

                            <p className="text-muted">
                                Enter the amount you want to{" "}
                                {action === "add"
                                    ? "add to"
                                    : "withdraw from"}{" "}
                                this pot.
                            </p>

                            {/* Amount */}
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <span>Current amount</span>

                                <span className="fs-1 fw-bold">
                                    ${selectedItem.total}
                                </span>
                            </div>

                            {/* Progress */}
                            <div className="progress mt-3">
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${percentageItem}%`,
                                        background: selectedItem.theme,
                                    }}
                                >
                                    {Math.round(percentageItem)}%
                                </div>
                            </div>

                            {/* Target */}
                            <div className="d-flex justify-content-between mt-2">
                                <span>Target</span>
                                <span>${selectedItem.target}</span>
                            </div>

                            {/* Input */}
                            <div className="mt-4">
                                <label className="form-label">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={(e) =>
                                        setAmount(Number(e.target.value))
                                    }
                                />
                            </div>

                            {/* Buttons */}
                            <div className="d-flex gap-2 mt-4">
                                <button
                                    className="btn btn-secondary w-50"
                                    onClick={() => {
                                        setShowModal(false);
                                        setAmount(0);
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-dark w-50"
                                    onClick={() => {
                                        if (action === "add") {
                                            handleAddMoney();
                                        } else {
                                            handleLessMoney();
                                        }
                                    }}
                                >
                                    {action === "add"
                                        ? "Confirm Addition"
                                        : "Confirm Withdraw"}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

export default Pots;