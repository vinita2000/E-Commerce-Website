const productsEl = document.getElementById('products');
const cartBtnEl = document.getElementById('cartBtn');

let cartArr;
let productsArr = [];

// loads previous cart arr
function getCartArr(){
    const temp = localStorage.getItem('cartArr');
    const temp2 = JSON.parse(temp);
    if (temp2 === null || temp2 === undefined) {
        cartArr = [];
        localStorage.setItem('cartArr', JSON.stringify(cartArr));
    } else {
        cartArr = temp2;
    }
}

// loads product data 
const loadProducts = () => {
    const baseUrl = "https://dummyproducts-api.herokuapp.com";
    const mykey = "CrLqTfmXE_7t";
    $.ajax({
        url: `${baseUrl}/api/v1/products?apikey=${mykey}`,
        method: "GET",
        success(res){
            productsArr = res.data;
            displayProductsDOM(res.data);
        },
        error(err){
            alert('Could not fetch products !!');
        }
    });
};

// renders products list on DOM
function displayProductsDOM(products){
    productsEl.innerHTML = products.map(product=>`
        <div class="product">
            <div class="product-info">
                <img src="${product.product_image_md}" alt="product-image">
                <h4>${product.product_name}</h4>
                <h5>Price: $ ${product.product_price}</h5>
                <h5>Rating: ${product.product_ratings}</h5>
                <button id="${product._id}" class="addBtn">add to cart</button>
            </div>
        </div>
    `)
    .join('');

    // add to cart button clicked
    $(".addBtn").on('click', addToCart);
}

// checks if item is already present in the cart
function isItemInCart(currId){
    for (const product of cartArr){
        if (currId === product._id){
            product['qty'] += 1;
            return true;
        }
    }
    return false;
}

// add to cart function
function addToCart(e){
    //cartArr.push(this.id);
    const currId = this.id;
    let item = {};

    // check if item is already in cart
    if(!isItemInCart(currId)){
        for(const product of productsArr){
            if (product._id === currId){
                // console.log(cartArr);
                item['name'] = product.product_name;
                item['price'] = product.product_price;
                item['img'] = product.product_image_sm;
                item['_id'] = product._id;
                item['qty'] = 1;
                cartArr.push(item);
            }
        }
    }
    alert('Item Added to cart');
}

// display cart
function displayCart(){
    // console.log(cartArr);
    saveCartToLocal();
    window.location.href = "./cart.html";
}

// save user cart to local storage
function saveCartToLocal(){
    localStorage.setItem('cartArr', JSON.stringify(cartArr));
}

cartBtnEl.addEventListener('click', displayCart);

loadProducts();
getCartArr();



