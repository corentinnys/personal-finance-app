import { useState } from "react";

function Transaction({ data = [] }) {
    const itemsPerPage = 10;

    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    //const currentItems = data.slice(firstIndex, lastIndex);
    const [search, setSearch] = useState("");

    const filteredItems = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );


    const currentItems = filteredItems.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handleChange = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };
    return (
        <div>
            <h1>transaction</h1>
            <input type="text" placeholder="Search transaction"
                   onChange={(e) => handleChange(e.target.value)}
            />
            <table className="table">
                <thead>
                <tr>
                    <th>Seeder</th>
                    <th>Company</th>
                    <th>Transaction date</th>
                    <th>Amount</th>
                </tr>
                </thead>

                <tbody>
                {currentItems.map((item, index) => (
                    <tr key={index} className="align-middle">
                        <td className="d-flex align-items-center gap-3">
                            <img
                                className="rounded-circle"
                                src={item.avatar}
                                alt={item.name}
                                style={{
                                    width: "45px",
                                    height: "45px",
                                    objectFit: "cover",
                                }}
                            />
                            {item.name}
                        </td>

                        <td>{item.category}</td>

                        <td>
                            {new Date(item.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </td>

                        <td>{item.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-center gap-2 mt-3">
                <button
                    className="btn btn-dark"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`btn ${
                            currentPage === index + 1
                                ? "btn-primary"
                                : "btn-outline-primary"
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    className="btn btn-dark"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Transaction;