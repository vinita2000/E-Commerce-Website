const cartListEl = document.getElementById('cartList');
const totalEl = document.getElementById('total');
const checkoutEl = document.getElementById('checkout');

let products = [];

// get cart items from local storage
const getProducts = () => {
    const temp = localStorage.getItem('cartArr');
    const cartArr = JSON.parse(temp);
    if (cartArr === null || cartArr === undefined) {
        alert('Could not get cart');
    } else {
        products = cartArr;
        // console.log(products);
        displayCart();
        calculateCartTotal();
    }
};

// display cart details
const displayCart = () => {
    cartListEl.innerHTML = `
        <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Option</th>
        </tr>
    `;

    cartListEl.innerHTML += products.map(product=>`
        <tr>
            <td><img src="${product.img}" alt="product-image"></td>
            <td><h4>${product.name}</h4></td>
            <td><h5>${product.price}</h5></td>
            <td>${product.qty}</td>
            <td><button id="${product._id}" class="removeBtn">Remove</button></td>
        </tr>
    `)
    .join('');

    // enable remove item button
    $(".removeBtn").on('click', deleteFromCart);
};

// delete item from cart
function deleteFromCart(){
    currId = this.id;
    // update the cartArr
    for (const i in products){
        if (products[i]._id === currId){
            if(products[i].qty > 1){
                products[i].qty -= 1;
            }else{
                products.splice(i,1);
            }
        }
    }
    updateInLocalStorage();
    getProducts();
}

// update cart in local storage
function updateInLocalStorage(){
    localStorage.setItem('cartArr', JSON.stringify(products));
}

// calculate cart total
function calculateCartTotal(){
    let cartTotal = 0;
    for (const product of products){
        let currTotal = product.qty * product.price;
        cartTotal += currTotal; 
    }
    updateCartTotal(cartTotal);
}

// updates cart total in DOM and local storage
function updateCartTotal(cartTotal){
    totalEl.innerHTML = ` TOTAL : $ ${cartTotal}`;
    localStorage.setItem('cartTotal', cartTotal);
}

// checkout function
function checkout(){
    window.location.href = "./checkout.html";
}

checkoutEl.addEventListener('click', checkout);
getProducts();
