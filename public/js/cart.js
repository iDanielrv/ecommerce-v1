//cart 


let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close-cart")

cartIcon.onclick = () => {
    cart.classList.add("active");
}

closeCart.onclick = () => {
    cart.classList.remove("active");
}

// Cart Working JS

if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}
//Este código é escrito em JavaScript e é um evento que é acionado quando o documento HTML é
//completamente carregado e analisado. Se o documento já estiver carregado, o evento será acionado
//imediatamente. A primeira linha adiciona um ouvinte de eventos ao documento que aguarda o evento
//DOMContentLoaded ser acionado. A segunda linha verifica se o documento já está completamente
//carregado. Se estiver carregando, a função ready() é chamada imediatamente. Caso contrário, a função
//ready() será chamada assim que o evento DOMContentLoaded for acionado

// Fazendo a função

function ready() {
    //Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for(var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity")
    for(var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged); //Essa linha de código adiciona um ouvinte de eventos ao elemento input que escuta o evento change e executa a função quantityChanged quando o evento é disparado123. O evento change é disparado quando o valor de um elemento <input>, <select> ou <textarea> é alterado12. A função quantityChanged é executada quando o valor do elemento input é alterado
    }
    // Add To Cart
    var addCart = document.getElementsByClassName("add-cart")
    for (let i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked)
    }

    // Buy Button Work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked)
}
// Buy Button
function buyButtonClicked() {
    alert("your order is placed")
    var cartContent = document.getElementsByClassName("cart-content")[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

    //Remove Items From Cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

    // Quantity Changes Function


function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

    // Add To Cart Function


    function addCartClicked(event) {
        var button = event.target;

        var shopProducts = button.parentElement
        console.log(shopProducts)


        var title = shopProducts.querySelectorAll("h1.h1Card")[0].innerText;
        var price = shopProducts.querySelectorAll("p.price-text")[0].innerText;
        console.log("o valor do price é : " + price)
        var productImg = shopProducts.querySelectorAll("img.imageCard")[0].src;
        addProductToCart(title, price, productImg);
        updateTotal();

    }

    function addProductToCart(title, price, productImg) {
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add('cart-box')
        var cartItems = document.getElementsByClassName("cart-content")[0];
        var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
        console.log("cartitemsnames  é : " +  cartItemsNames)
        for(var i = 0; i < cartItemsNames.length; i++) {
           if(cartItemsNames[i].innerText == title){
            alert("you have already add this item to cart")
            return;
        }
    }

    var cartBoxContent = `
    <img class="imgCart" src="${productImg}" alt="">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}$</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
     <!--  Remove Cart -->
     <i class="cart-remove">lix</i>
`

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem)
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged)






    }


    // Update Total

function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box")
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""))
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        }
        // IF price Contain some Cents Value 
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    
}    




