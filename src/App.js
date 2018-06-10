import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';

const products = [
  {
    name: 'phone',
    price: 200
  },
  {
    name: 'house',
    price: 2000000
  }
];

localStorage.setItem('products', JSON.stringify(products));

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    };
    
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }
  
  componentWillMount() {
    const products = this.getProducts();
    this.setState({ products });
  }
  
  getProducts() {
    return this.state.products;
  }
  
  onDelete(name) {
    const products = this.getProducts();
    
    const filteredProducts = products.filter(product => {
      return product.name !== name;
    });
    
    this.setState({ products: filteredProducts });
  }
  
   onEditSubmit(name, price, originalName) {
    const products = this.getProducts();
    
    const filteredProducts = products.map(product => {
      if (product.name === originalName) {
        product.name = name;
        product.price = price;
      } 
      
      return product;
    });
    this.setState({ products: filteredProducts });
  }
  
  onEdit(name, price) {
    const products = this.getProducts();
  }
  
  onAdd(name, price) {
    const products = this.getProducts();
    const moreProducts = products.push({
      name,
      price
    });
    
    this.setState({ products: products });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <h1>products manager</h1>
        <AddProduct 
          onAdd={this.onAdd}/>
        {
          this.state.products.map(product => {
            return (
              <ProductItem 
                key={product.name}
                name={product.name}
                price={product.price}
                onDelete={this.onDelete}
                onEditSubmit={this.onEditSubmit}
              />)
          })
        }
      </div>
    );
  }
}

export default App;
