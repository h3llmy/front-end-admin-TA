export default function productTable(products) {
    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                    <h3>{product.name}</h3>
                    <p className='bg-blue-600'>{product.category}</p>
                    <span>{product.price}</span>
                </li>
            ))}
        </ul>
    )
};