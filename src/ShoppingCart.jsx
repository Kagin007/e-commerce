import React, {Component} from "react";
import Product from "./Product";

export default class ShoppingCart extends Component {


//Executes when the component is mounted
constructor(props) {
  // console.log("constructor - Shopping Cart")
  super(props); //calling super class's constructor
  
  //initialization of the state
  this.state= {
    products: [

    ],    
  }  
}



  render() {
    console.log("render - ShoppingCart")
    return (
    <div>
      <h4>Shopping Cart</h4>

      <div className="row">
        {this.state.products.map((prod) => {
          return (
            <Product
              key={prod.id}
              product={prod}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
            >
              <button className="btn btn-primary">Buy Now</button>
            </Product>
          );
        })}
      </div>
    </div>
    )
  }
  //render ends here

  //Executes after constructor and render method (includes life cycle of child components, if any) of current component.
  componentDidMount = async () => {
    //fetch data from data source

    var response = await fetch("http://localhost:5000/products", {method: "GET"});
    console.log(response)

    var prods = await response.json()

    console.log(prods)

    this.setState({ products: prods });

  };


  componentDidUpdate(prevProps, prevState){
    // console.log("componentDidUpdate - ShoppingCart", prevProps, prevState, this.props, this.state)
  }

  //Executes when the current instance of current component is being deleted from memory
  componentWillUnmount() {
    // console.log("componentWIllUnmount - Shopping Cart")
  }

  //executes when the user clicks on + button
  handleIncrement = (product, maxValue) => {
    //get index of selected products
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if(allProducts[index].quantity < maxValue){
      allProducts[index].quantity++

    //update the state of current component (parent component)
    this.setState({products: allProducts})      
    }    
  };

  handleDecrement = (product, minValue) => {
    let allProducts = [...this.state.products]
    let index = allProducts.indexOf(product)

    if(allProducts[index].quantity > minValue) {
      allProducts[index].quantity--

      //update the state of current component (parent component)
      this.setState({products: allProducts})      
    }
  }

  handleDelete = (product) => {
    console.log("DELETED!")
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product)

    if(window.confirm("Are you sure you want to delete?")) {
      //delete product by index
      allProducts.splice(index, 1);

      //update the state of current component (parent component)
      this.setState({products: allProducts});      
    }
  }
}