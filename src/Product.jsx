import React, {Component} from 'react';

export default class Product extends Component {
  state = {
    id: this.props.product.id,
    productName: this.props.product.productName,
    price: this.props.product.price
  }

  render() {

    return (
    <div className='col-lg-6'>
      <div className="card m-2">
        <div className="card-body">
          <div className="text-muted"># {this.state.id}</div>

          <h5 className="p-2 border-top">{this.state.productName}</h5>

          <div>$ {this.state.price}</div>
        </div>
      </div>
    </div>  
    )
  }
};