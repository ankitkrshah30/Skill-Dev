import PageHeader from "../header/PageHeader";

function PizzaView(){
    return(
        <>
        <PageHeader />
        <h3><a className="btn btn-primary" href="/Pizza/list" role="button">GoBack</a></h3>
        <div className="container">
            <h3>View Pizza</h3>
            <div className="form-group mb-3">
                <label for="pizzaName" className="form-label">Pizza Name</label>
                <div className="form-control" id="pizzaName">???</div>
            </div>
            <div className="form-group mb-3">
                <label for="pizzaToppings" className="form-label">Toppings</label>
                <div className="form-control" id="pizzaToppings">???</div>
            </div>
            <div className="form-group mb-3">
                <label for="pizzaPrice" className="form-label">Price</label>
                <div className="form-control" id="pizzaPrice">???</div>
            </div>
            <div className="form-group mb-3">
                <label for="pizzaSize" className="form-label" aria-placeholder="">Size</label>
                <div className="form-control" id="pizzaSize">???</div>
            </div>
            <div className="form-group mb-3">
                <label for="pizzaCategory" className="form-label">Category</label>
                <div className="form-control" id="pizzaCategory">???</div>
            </div>
        </div>
        </>
    );
}
export default PizzaView
