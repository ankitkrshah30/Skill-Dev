import PageHeader from "../header/PageHeader";
function PizzaList(){
    return(
        <>
        <PageHeader/>
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
                <tr>
                <th scope="row">1</th>
                <td>Apple_Pizza</td>
                <td>fruit</td>
                <td>180</td>
                <td>Small</td>
                <td>
                    <a href="/Pizza/view/1" class="btn btn-success">View</a>
                </td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Mango_Pizza</td>
                <td>fruit</td>
                <td>110</td>
                <td>Medium</td>
                <td>
                    <a href="/Pizza/view/2" class="btn btn-success">View</a>
                </td>
                </tr>
            </tbody>
            </table>
            </div>
        </>
    );
    }
    export default PizzaList;