import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Overview from "./overvieuw.jsx"; // keep file name if needed
import "./navigation.css";
import Pots from "./pots.jsx";
import Transaction from "./Transaction.jsx";
import Budgets from "./Budgets.jsx";

function Navigation() {
    const [items, setItems] = useState({
        balance: 0,
        pots: [],
        budgets: [],
        transactions: [],
        bills: []
    });

    useEffect(() => {
        fetch('/data.json')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setItems(data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-2 bg-dark text-white h-100">
                    <h1>Personal Finance App</h1>
                    <nav className="nav p-3">
                        <ul className="list-unstyled">
                            <li className="pt-3">
                                <Link to="/" className="nav-link-custom text-decoration-none">
                                    Overview
                                </Link>
                            </li>
                            <li className="pt-3">
                                <Link to="/transactions" className="nav-link-custom text-decoration-none">
                                    Transaction
                                </Link>
                            </li>
                            <li className="pt-3">
                                <Link to="/budgets" className="nav-link-custom text-decoration-none">
                                    Budgets
                                </Link>
                            </li>
                            <li className="pt-3">
                                <Link to="/pots" className="nav-link-custom text-decoration-none">
                                    Pots
                                </Link>
                            </li>
                            <li className="pt-3">
                                <Link to="/bill" className="nav-link-custom text-decoration-none">
                                    Recurring bill
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="col-10 h-100 overflow-auto">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Overview
                                    balance={items.balance}
                                    pots={items.pots}
                                    budgets={items.budgets}
                                    transactions={items.transactions}
                                    bills={items.bills}
                                />
                            }
                        />

                        <Route
                            path="/transactions"
                            element={<Transaction data={items.transactions} />}
                        />

                        <Route
                            path="/budgets"
                            element={
                                <Budgets
                                    data={items.budgets}
                                    transactions={items.transactions}
                                    setData={(updatedBudgets) =>
                                        setItems((prev) => ({
                                            ...prev,
                                            budgets: updatedBudgets,
                                        }))
                                    }
                                />
                            }
                        />

                        <Route
                            path="/pots"
                            element={<Pots data={items.pots} />}
                        />

                        <Route
                            path="/bill"
                            element={<div>Recurring Bills Page</div>}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Navigation;