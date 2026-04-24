import DoughnutChart from "./DoughnutChart";

function Overvieuw({ balance = {}, pots = [], budgets = [],transactions = [],bills =[] }) {
    return (
        <>
            <h1 className="mb-4">Page Overview</h1>

            <div
                className="container-fluid py-4"
                style={{
                    background: "#F8F4F0",
                    minHeight: "100vh",
                }}
            >
                <div className="row g-5 align-items-start">

                    {/* BALANCE */}
                    {Object.entries(balance).map(([key, value]) => (
                        <div key={key} className="col-12 col-md-4">
                            <div
                                className="p-4"
                                style={{
                                    background: "white",
                                    borderRadius: "20px",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                                }}
                            >
                                <h3 className="fs-6 text-capitalize text-secondary">
                                    {key}
                                </h3>
                                <p className="fs-1 fw-bold mb-0">${value}</p>
                            </div>
                        </div>
                    ))}

                    {/* ✅ COLONNE GAUCHE : POTS + TEST */}
                    <div className="col-12 col-md-6 d-flex flex-column gap-4">

                        {/* POTS */}
                        <div
                            style={{
                                background: "white",
                                borderRadius: "20px",
                                padding: "20px",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                            }}
                        >
                            <h3 className="mb-3">Pots</h3>

                            <div className="row">
                                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center mb-3">
                                    <span>Total saved:</span>
                                    <span style={{ fontSize: "40px", fontWeight: "bold" }}>
                                        {pots.reduce((acc, pot) => acc + pot.total, 0)}
                                    </span>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="row">
                                        {pots.slice(0, 4).map((item, index) => (
                                            <div
                                                key={index}
                                                className="col-6 mb-3"
                                                style={{
                                                    borderLeft: `4px solid ${item.theme}`,
                                                    paddingLeft: "10px",
                                                }}
                                            >
                                                <h5 className="fs-6">{item.name}</h5>
                                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                                    ${item.total}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TEST (MAINTENANT SOUS POTS) */}
                        <div
                            style={{
                                background: "white",
                                borderRadius: "20px",
                                padding: "20px",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                            }}
                        >
                            <h2>Transactions</h2>
                            {transactions.slice(0, 4).map((item, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3 p-4 border-bottom">
                                    <div>
                                        <img src={item.avatar} alt={item.name} style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}  />
                                        <span>{item.name}</span>

                                    </div>
                                    <div className="d-flex flex-column align-items-end">
                                        <span
                                            style={{
                                                fontWeight: "bold",
                                                color: item.amount > 0 ? "green" : "red",
                                            }}
                                        >${item.amount}
                                        </span>
                                        <span >
                                             {new Date(item.date).toLocaleDateString(
                                                 "fr-FR",
                                                 {
                                                     day: "numeric",
                                                     month: "long",
                                                     year: "numeric",
                                                 }
                                             )}
                                        </span>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>

                    {/* ✅ COLONNE DROITE : BUDGETS */}
                    <div className="col-12 col-md-6">
                        <div
                            className="d-flex justify-content-center"
                            style={{
                                background: "white",
                                borderRadius: "20px",
                                padding: "20px",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                                height: "450px",
                                overflowY: "auto",
                            }}
                        >
                            <DoughnutChart dataBudgets={budgets} />
                        </div>
                        <div>
                            {transactions.map((el, index) => (
                                <div key={index}>
                                    {el.recurring && <p>{el.name}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Overvieuw;