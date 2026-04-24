import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BudgetChart({
                                        dataBudgets = [],
                                        orientation = "horizontal",
                                    }) {

    const totalLimit = dataBudgets.reduce(
        (acc, b) => acc + b.maximum,
        0
    );

    const totalSpent = dataBudgets.reduce(
        (acc, b) => acc + (b.spent || 0),
        0
    );

    const data = {
        labels: dataBudgets.map(b => b.category),
        datasets: [
            {
                data: dataBudgets.map(b => b.maximum),
                backgroundColor: dataBudgets.map(b => b.theme),
                borderWidth: 0,
                cutout: "78%",
            },
        ],
    };

    const options = {
        plugins: {
            legend: { display: false },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection:
                    orientation === "vertical"
                        ? "row"
                        : "column",
                alignItems: "start",
                gap: "40px",
                width:
                    orientation === "vertical"
                        ?"100%": "600px"

            }}
        >
            {/* GRAPH */}
            <div
                style={{
                    position: "relative",
                    width: "260px",
                    height: "260px",
                }}

            >
                <Doughnut
                    data={data}
                    options={options}
                />

                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform:
                            "translate(-50%, -50%)",
                        textAlign: "center",
                    }}
                >
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "48px",
                        }}
                    >
                        ${totalSpent}
                    </h1>

                    <p
                        style={{
                            margin: 0,
                            color: "#777",
                        }}
                    >
                        of ${totalLimit} limit
                    </p>
                </div>
            </div>

            {/* LEGEND */}
            <div
                style={{
                    display: "flex",
                    flexDirection:
                        orientation === "vertical"
                            ? "column"
                            : "row",

                    gap: "24px",
                }}
            >
                {dataBudgets.map((item) => (
                    <div
                        key={item.category}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <div
                            style={{
                                width: "6px",
                                height: "40px",
                                backgroundColor:
                                item.theme,
                                borderRadius: "4px",
                            }}
                        />

                        <div>
                            <p
                                style={{
                                    margin: 0,
                                    color: "#777",
                                    fontSize: "14px",
                                }}
                            >
                                {item.category}
                            </p>

                            <h3
                                style={{
                                    margin: 0,
                                }}
                            >
                                ${item.maximum}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}