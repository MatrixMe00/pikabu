//global variables
const images = [
    "Babies All Over Print Jumpsuit", "Baby Bath Seat Support", "Baby Pacifier Feeder Fresh Fruit Silicone Feeding Teether",
    "Boys Baby Clothes Children's Short Sleeve Pants Set", "Children's Casual Sneakers Unisex Running Shoes", "Children's Clothing 2-Piece Overalls Short-Sleeved Suit Yellow",
    "Children's Clothing 2-Piece Sweatshirt + Pants Set Green", "Children's Clothing Set Sweatshirt+Pants+Shoulder Bag Blue", "Children's Luminous Sports Shoes",
    "Ghandour Cosmetics Baby Girl Powder", "girl underwear", "Girls Sports Sweet Princess Board Shoes", "Girls Vest Sleeveless Dress Chiffon Skirt Princess Dress-Black", "Multifunctional Waterproof Mom Baby",
    "New Born Baby Boy Clothes Babies", "Sandals For Newborn Babies", "Seba Med Baby Cream", "Softcare 1 Set of Baby Wipes"
];

let cart_items = 0;
let cart_items_element = $("#cart_counter");
let total_cash_element = $(".total_cash_element");
let total_cash = 0;
const shipping_fee = 0;

//global functions
function updateCart(type, item_id = 0){
    //the selected item
    const item = $("#item" + item_id);

    //get the cash amount
    const cash = parseFloat(item.find(".item_price").attr("data-price"));
    
    if(type == "add"){
        total_cash += cash;
        cart_items++;
        is_new = false;

        if(cart_items === 1){
            is_new = true;
        }

        modifyBoughtItems(item_id, "add", is_new);
    }else if(type == "remove"){
        total_cash = total_cash < 0 ? 0 : total_cash - cash;
        cart_items = cart_items > 0 ? cart_items - 1 : 0;

        modifyBoughtItems(item_id, "remove");
    }

    if(cart_items == 0){
        $("#cart-section, #cart-empty").toggleClass("no_disp")
    }

    item.find(".add_to_cart, .remove_from_cart").toggleClass("no_disp");

    //update the cart
    updateCartElement();
    updateTotalCashElement();
}

function updateCartElement(){
    cart_items_element.html(cart_items);
}

function updateTotalCashElement(){
    total_cash_element.html("GHC " + makeRealisticMoney(total_cash.toFixed(2)));
}

function modifyBoughtItems(item_id, operation, is_new = false){
    const container = $("#b_items");

    if(operation == "remove"){
        $("#item" + item_id).remove();
    }else{
        const item = $("#item" + item_id);
        const bought_item = "<div class=\"item\" id=\"b_item" + item_id + "\">" + item.find(".content").html() + "</div>";
        
        if(is_new){
            container.html(bought_item);
        }else{
            container.append(bought_item);
        }
    }
}

function createDemoItems(){
    const container = $("#cart-section .items");

    //create demo items if its empty
    if(container.html() == ""){
        const max_items = parseInt(Math.random() * 10) + 1;
        cart_items = max_items;

        for(i = 1; i <= max_items; i++){
            const image = images[parseInt(Math.random() * 100) % images.length];
            const item = "" + 
                "<div class=\"item\" id=\"item" + i + "\">" +
                "   <div class=\"img\">" +
                "       <img src=\"assets/images/products/" + image + ".jpg\" alt=\"\">" +
                "   </div>" +
                "   <div class=\"content\">" +
                "       <h4 class=\"title\">" + image + "</h4>" +
                "       <div class=\"price item_price\" data-price=\"299.99\">" +
                "           <span class=\"current_price\">GHC 299.99</span>" +
                "           <span class=\"discounted_price\"><s>599.99</s></span>" +
                "       </div>" +
                "   </div>" +
                "   <div class=\"button\">" +
                "       <button onclick=\"updateCart('remove'," + i + ")\">Remove Item</button>" +
                "   </div>" +
                "</div>";
            
            container.append(item);
        }
    }
}

function giveRandomPricing(){
    $(".item_price").each(function(index, element){
        //create a random money
        const money = randomMoney()
        const current_price = $(element).children(".current_price");
        const discounted_price_element = $(element).children(".discounted_price").children("s");
        const discounted = parseFloat(parseFloat(money) + (money * 20 / 100)).toFixed(2)
        
        $(element).attr("data-price", money)
        current_price.html("GHC " + makeRealisticMoney(money));
        discounted_price_element.html("GHC " + makeRealisticMoney(discounted));

        //get the current total price
        total_cash += parseFloat(money);
    })
}

function randomMoney(){
    const multiplier = [10,100,1000,10000];
    const current_multiplier = parseInt(Math.random()*10) % multiplier.length;
    let money = parseFloat(Math.random() * multiplier[current_multiplier]).toFixed(2);

    return money;
}

function makeRealisticMoney(money){
    //make the money a little bit realistic
    if(money.split(".")[0].length > 3){
        lhs = money.split(".")[0]; rhs = money.split(".")[1];
        money = "";

        for(i = lhs.length - 1, count = 0; i >= 0; i--, count++){
            if(count > 0 && count % 3 == 0){
                money = "," + money;
            }
            money = lhs[i] + money;
        }

        money = money + "." + rhs;
    }

    return money;
}

function payWithPaystack(){
    const cust_amount = total_cash * 100;
    const cust_email = "safosah00@gmail.com";
    const api_key = "pk_test_3a5dff723cbd3fe22c4770d9f924d05c77403fca";

    try {
        var handler = PaystackPop.setup({
            key: api_key,
            email: cust_email,
            amount: cust_amount,
            currency: "GHS",
            callback: function(response){
                alert("Payment was successful. Reference is " + response.reference);
            },
            onClose: function(){
                alert('Transaction has been canceled by user');
            }
        });
        handler.openIframe();   
    } catch (error) {
        error = error.toString();

        alert(error);
    }
}

//on ready function
$(document).ready(function(){
    //add or remove from cart buttons
    let add_to_cart = $(".add_to_cart");
    let remove_from_cart = $(".remove_from_cart");

    //cart counter
    cart_items = 0;

    createDemoItems();
    updateCartElement();
    giveRandomPricing();
    updateTotalCashElement();

    //button functionality for preloaded items
    add_to_cart.click(function(){
        updateCart("add");
        $(this).addClass("no_disp");
        $(this).siblings(".remove_from_cart").removeClass("no_disp");
    })

    remove_from_cart.click(function(){
        updateCart("remove");
        $(this).addClass("no_disp");
        $(this).siblings(".add_to_cart").removeClass("no_disp");
    })
})