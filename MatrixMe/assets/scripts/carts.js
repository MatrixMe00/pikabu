//global variables
let cart_items = 0;
let cart_items_element = $("#cart_items_element");
let total_cash_element = $("#total_cash_element");
let total_cash = 0;

//global functions
function updateCart(type, item_id = 0){
    //the selected item
    const item = $("#item" + item_id);

    //get the cash amount
    const cash = parseFloat(item.find("p.item_price").attr("data-price"));
    
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
        $("#b_items").html(
            "<p class=\"no-item\">" +
            "No items in the cart" +
            "</p>"
        )
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
    total_cash_element.html(total_cash.toFixed(2));
}

function modifyBoughtItems(item_id, operation, is_new = false){
    const container = $("#b_items");

    if(operation == "remove"){
        $("#b_item" + item_id).remove();
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
    const container = $("#items");
    const max_items = parseInt(Math.random() * 10) + 1;

    for(i = 1; i <= max_items; i++){
        const item = "" + 
            "<div class=\"item\" id=\"item" + i + "\">" +
            "   <div class=\"content\">" +
            "      <div class=\"name\">" +
            "          <h2>Item name " + i +"</h2>" +
            "      </div>" +
            "      <div class=\"price\">" +
            "          <p class=\"item_price\" data-price=\"\"></p>" +
            "      </div>" +
            "   </div>" +
            "   <div class=\"buttons\">" +
            "       <button type='button' class=\"add_to_cart\" onclick=\"updateCart('add'," + i + ")\">Add to Cart</button>" +
            "       <button type='button' class=\"remove_from_cart no_disp\" onclick=\"updateCart('remove'," + i + ")\">Remove From Cart</button>" +
            "   </div>" +
            "</div>";
        
        container.append(item);
    }
}

function giveRandomPricing(){
    $("p.item_price").each(function(index, element){
        //create a random money
        const money = randomMoney()
        $(element).html("GHC " + makeRealisticMoney(money)).attr("data-price", money)
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

//on ready function
$(document).ready(function(){
    //add or remove from cart buttons
    let add_to_cart = $(".add_to_cart");
    let remove_from_cart = $(".remove_from_cart");

    //cart counter
    cart_items = 0;

    createDemoItems();
    updateCartElement();
    updateTotalCashElement();
    giveRandomPricing();

    //button functionality for preloaded items
    add_to_cart.click(function(){
        updateCart("add");
    })

    remove_from_cart.click(function(){
        updateCart("remove");
    })
})