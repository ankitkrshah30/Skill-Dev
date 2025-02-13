import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from 'axios';

function PizzaView() {
    const [pizza, setPizza] = useState({ id: '', name: '', category: '', price: '', size: '' });
    const params = useParams();

    const readById = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.get(`${baseUrl}/pizzas/${params.id}`);
            const queriedPizza = response.data;
            setPizza(queriedPizza);
        } catch (error) {
            alert('Server Error');
        }
    };

    useEffect(() => {
        readById();
    }, []);

    return (
        <>
            <PageHeader />
            <h3><a href="/pizzas/list" className="btn btn-light">Go Back</a> View Pizza</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label className="form-label">Pizza Name:</label>
                    <div className="form-control">{pizza.name}</div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Pizza Category:</label>
                    <div className="form-control">{pizza.category}</div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Pizza Price:</label>
                    <div className="form-control">₹{pizza.price}</div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Pizza Size:</label>
                    <div className="form-control">{pizza.size} cm</div>
                </div>
            </div>
        </>
    );
}

export default PizzaView;