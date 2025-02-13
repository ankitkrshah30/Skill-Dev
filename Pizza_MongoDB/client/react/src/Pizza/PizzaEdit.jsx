import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from "axios";

function PizzaEdit() {
    const [pizza, setPizza] = useState({ id: "", name: "", size: "", price: "", category: "" });
    const params = useParams();
    const navigate = useNavigate();

    const txtBoxOnChange = (event) => {
        setPizza({
            ...pizza,
            [event.target.id]: event.target.value
        });
    };

    const readById = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.get(`${baseUrl}/pizzas/${params.id}`);
            setPizza(response.data); // Assuming API returns the correct format
        } catch (error) {
            alert("Server Error: Unable to fetch pizza details");
        }
    };

    const updatePizza = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.put(`${baseUrl}/pizzas/${params.id}`, {
                ...pizza,
                size: parseInt(pizza.size),
                price: parseFloat(pizza.price)
            });
            setPizza(response.data.pizza);
            alert(response.data.message);
            navigate("/pizzas");
        } catch (error) {
            alert("Server Error: Unable to update pizza details");
        }
    };

    useEffect(() => {
        readById();
    }, []);

    return (
        <>
            <PageHeader />
            <h3><a href="/pizzas" className="btn btn-light">Go Back</a> Edit Pizza</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">🍕 Pizza Name:</label>
                    <input type="text" className="form-control" id="name"
                        placeholder="Enter pizza name"
                        value={pizza.name}
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="size" className="form-label">📏 Pizza Size (cm):</label>
                    <input type="number" className="form-control" id="size"
                        placeholder="Enter pizza size"
                        value={pizza.size}
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="price" className="form-label">💰 Pizza Price (₹):</label>
                    <input type="number" className="form-control" id="price"
                        placeholder="Enter pizza price"
                        value={pizza.price}
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="category" className="form-label">🍕 Pizza Category:</label>
                    <input type="text" className="form-control" id="category"
                        placeholder="Enter pizza category"
                        value={pizza.category}
                        onChange={txtBoxOnChange} />
                </div>
                <button className="btn btn-warning" onClick={updatePizza}>Update Pizza</button>
            </div>
        </>
    );
}

export default PizzaEdit;
