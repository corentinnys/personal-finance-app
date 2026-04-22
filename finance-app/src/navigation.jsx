
import { Routes, Route,Link } from "react-router-dom";
import {useEffect, useState} from "react";
import Overvieuw from "./overvieuw.jsx";
import "./navigation.css"
import Pots from "./pots.jsx";
import Transaction from "./Transaction.jsx";
function Navigation() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then((res) => res.json())
            .then((data) => {
                console.log(data); // ✅ maintenant OK
                setItems(data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className=" container h-100">
            <div className="row h-100">
                <div className="col-4 bg-dark text-white h-100">
                    <h1>Personal Finance App</h1>
                    <nav className="nav p-3">
                        <ul className="list-unstyled ">
                            <li style={{paddingTop:"20px"}}><Link to="/"  className="nav-link-custom " style={{textDecoration:"none"}}>Overvieuw</Link></li>
                            <li style={{paddingTop:"20px"}}><Link to="/transactions" className="nav-link-custom " style={{textDecoration:"none"}}>Transaction</Link></li>
                            <li style={{paddingTop:"20px"}}><Link to="/budgets" className="nav-link-custom " style={{textDecoration:"none"}}>Budgets</Link></li>
                            <li style={{paddingTop:"20px"}}><Link to="/pots" className="nav-link-custom " style={{textDecoration:"none"}}>Pots</Link></li>
                            <li style={{paddingTop:"20px"}}><Link to="/bill" className="nav-link-custom " style={{textDecoration:"none"}}>Recuring bill</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className="col-8 h-100 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Overvieuw />} />
                        <Route path="/transactions" element={<Transaction data={items.transactions}/>}/>
                        <Route path="/budgets" />
                        <Route path="/pots" element={<Pots data={items.pots} />} />
                        <Route path="/bill" />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Navigation
