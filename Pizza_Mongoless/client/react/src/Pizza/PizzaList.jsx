import { useEffect, useState } from "react";
import PageHeader from "../header/PageHeader";
import axios from "axios";

function PizzaList() {
    const [pizzas, setPizzas] = useState([]);

    const readAllPizzas = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.get(`${baseUrl}/pizzas`);
            setPizzas(response.data);
        } catch (error) {
            alert("Server Error");
        }
    };

    useEffect(() => {
        readAllPizzas();
    }, []);

    return (
        <>
            <PageHeader />
            <h3>List of Pizzas</h3>
            <div className="container">
                <table className="table table-warning table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Sl.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col">Size</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pizzas.map((pizza, index) => (
                            <tr key={pizza.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{pizza.Name}</td>
                                <td>{pizza.Category}</td>
                                <td>{pizza.Price}</td>
                                <td>{pizza.Size}</td>
                                <td><a href={`/pizzas/view/${pizza.id}`} className="btn btn-success">View</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PizzaList;
