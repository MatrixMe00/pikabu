//show or hide hamburgar content
$(document).ready(function(){
    $("#blurry_nav").click(function(){
        $("#ham_content").hide();
        $("#ham").removeClass("closable");
    })

    $("#ham").click(function(){
        $("#ham_content").toggle();
        $(this).toggleClass("closable");
    })
})