import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import NavBar from "./Navbar";

function Home() {
    const [products, setProducts] = useState([]);
    const [name,  setName] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5505/products")
            .then((r) => r.json())
            .then(data => setProducts(data));
    }, []);

    function handleName(event) {
        const input = event.target.value;
        setName(input);

        // Fetch suggestions based on current input
        fetch(`http://127.0.0.1:5505/products?name=${input}`)
            .then(response => response.json())
            .then(data => setSuggestions(data))
            .catch(error => console.error('Error fetching suggestions:', error));
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Fetch search results based on input
        fetch(`http://127.0.0.1:5505/products?name=${name}`)
            .then(response => response.json())
            .then(data => {
                console.log('Search results:', data);
                setProducts(data);
            })
            .catch(error => console.error('Error fetching search results:', error));
    }

    function handleSuggestionClick(suggestionName) {
        setName(suggestionName);
        setSuggestions([]); // Clear suggestions
    }
    
    return (
        <div className="home-container">
            <div className="home-navbar">
                <NavBar/>
                {/* Your NavBar content */}
            </div>
            <div className="home-content">

            <h1 className="home-h1">Products</h1>

            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by Name"
                    value={name}
                    onChange={handleName}
                />
                <button className="search-button" type="submit">
                    Search
                </button>
            </form>

           <div className="goods">           <ul className="goods">
                {suggestions.map((product) => (
                    <li key={product.id} onClick={() => handleSuggestionClick(product.name)}>
                        <div className="productcard">
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <Link to={`/product/${product.id}`}>View Details</Link>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="home-inventory-container">
                    {products.map((product, index) => (
                        <div className="home-card" key={index}>
                        <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="product-image"
                        />
                            <h3>{product.name}</h3>
                            <p>Price: {product.price}</p>
                            <Link to={`/product/${product.id}`} className="home-more-button">Add to Cart</Link>

                        </div>
                    ))}
                </div>

            </div>

        </div>
        </div>
    )
}

export default Home