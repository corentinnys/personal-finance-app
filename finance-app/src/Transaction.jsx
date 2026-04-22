import { useState } from "react";

function Transaction({ data = [] }) {
    const itemsPerPage = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState("latest");
    const [category, setCategory] = useState("");
    // Pagination
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    // Search
    const filteredItems = data.filter((item) => {
        const matchesSearch = item.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "" || item.category === category;

        return matchesSearch && matchesCategory;
    });

    // Sort
    const sortedItems = [...filteredItems].sort((a, b) => {
        switch (sortType) {
            case "latest":
                return new Date(b.date) - new Date(a.date);

            case "oldest":
                return new Date(a.date) - new Date(b.date);

            case "az":
                return a.name.localeCompare(b.name);

            case "za":
                return b.name.localeCompare(a.name);

            case "highest":
                return b.amount - a.amount;

            case "lowest":
                return a.amount - b.amount;

            default:
                return 0;
        }
    });

    // Current page items
    const currentItems = sortedItems.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

    const handleChange = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleSort = (value) => {
        setSortType(value);
        setCurrentPage(1);
    };
    const handleTransaction = (value) => {
        setCategory(value);
        setCurrentPage(1);
    };

    return (
        <div>
            <h1>Transaction</h1>

            <input
                type="text"
                placeholder="Search transaction"
                className="form-control mb-3"
                onChange={(e) => handleChange(e.target.value)}
            />

            <div className="mb-3">
                <span className="me-2">Sort by</span>

                <select
                    className="form-select"
                    onChange={(e) => handleSort(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="az">A to Z</option>
                    <option value="za">Z to A</option>
                    <option value="highest">Highest</option>
                    <option value="lowest">Lowest</option>
                </select>
            </div>


            <div className="mb-3">
                <span className="me-2">Category</span>

                <select
                    className="form-select"
                    onChange={(e) => handleTransaction(e.target.value)}
                >
                    <option value="Entertainment">Entertainment</option>
                    <option value="Bills">Bills</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Dining out">Dining out</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Personnal care">Personnal care</option>
                    <option value="Education">Education</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Shopping">Shopping</option>
                    <option value="General">General</option>

                </select>
            </div>


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
                            {new Date(item.date).toLocaleDateString(
                                "fr-FR",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }
                            )}
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