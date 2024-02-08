var productNameInput=document.getElementById("productNameInput");
var productPriceInput=document.getElementById("productPriceInput");
var productCategoryInput=document.getElementById("productCategoryInput");
var productDescInput=document.getElementById("productDescInput");
var tableBody=document.getElementById("tableBody");
var add=document.getElementById("add");
var table=document.getElementById("table")
var cartona
var deleteAll=document.getElementById("deletAll")
var btnupdate= document.getElementById("update")
if(localStorage.getItem("products")!=null) {
    cartona=JSON.parse(localStorage.getItem("products"))
    displaydata(cartona)
} else {
    cartona=[]
}
var storedDarkMode = localStorage.getItem("darkMode");
if (storedDarkMode !== null) {
    isDarkMode = storedDarkMode === "true";
    updateMode();
}

function fes(){
    if(productCategoryInput.value===''){
        return false
    } else {
        return true
    }
}
  
function addProd(){
  
    productPriceInput=document.getElementById("productPriceInput");
    if((valdationname() && valdationprace() && valdationdes() && fes()) ==true ){
        var product={
            name:productNameInput.value ,
            price:productPriceInput.value,
            gategory:productCategoryInput.value,
            desc:productDescInput.value 
        }
        cartona.push(product)
        
        localStorage.setItem("products" , JSON.stringify(cartona))
        clear()
    } else {
        alert("You Must full all Inputs and Make Sure your inputs are Vaild ")
    }
}

function clear(){
    productCategoryInput.value=""
    productPriceInput.value=""
    productNameInput.value="" 
    productDescInput.value="" 
}

function displaydata(cartona){
    var products=``
    for(i=0 ; i<cartona.length ; i++) {
        products+=` <tr>
        <td class="number"> ${i+1} </td>
        <td> ${cartona[i].name} </td>
        <td> ${cartona[i].price} </td>
        <td> ${cartona[i].gategory} </td>
        <td> ${cartona[i].desc} </td>
        <td> <button  onclick="update(${i})" class="btn btn-outline-warning" > Update </Button> </td>
        <td> <button onclick="del(${i})"  class="btn btn-outline-danger delete" > Delete </Button> </td>
        </tr>
        `
    }
    tableBody.innerHTML=products
    
}

add.addEventListener("click" , function(){
    addProd()
    displaydata(cartona)
})

var sinputname=document.getElementById("searchname")
function search(searchinput){
    let serachResult=[]
    for(var i=0 ; i<cartona.length ; i++) {
        if(cartona[i].name.toLowerCase().includes(searchinput.toLowerCase())==true) {
            serachResult.push(cartona[i])
        } 
    }
    displaydata(serachResult)
}

var searchcat=document.getElementById("searchcat")
function searchbycat(searchinputcat){
    let serachresult=[]
    for(var m=0 ; m<cartona.length ; m++) {
        if(cartona[m].gategory.toLowerCase().includes(searchinputcat.toLowerCase())==true) {
            serachresult.push(cartona[m])
        } 
    }
    displaydata(serachresult)
}

function del(number) {
    cartona.splice(number,1);
    localStorage.setItem("products" , JSON.stringify(cartona))
    displaydata(cartona)
    
}

function update(number) {
    productNameInput.value = cartona[number].name;
    productPriceInput.value = cartona[number].price;
    productCategoryInput.value = cartona[number].gategory;
    productDescInput.value = cartona[number].desc;

    if (add.classList.contains("d-inline-block")) {
        add.classList.replace("d-inline-block", "d-none");
    } else {
        add.classList.add("d-none");
    }
    btnupdate.classList.replace("d-none", "d-inline-block");
    
    btnupdate.removeEventListener("click", handleUpdate);
    
    btnupdate.addEventListener("click", handleUpdate);
    
    function handleUpdate() {
        cartona[number].name = productNameInput.value;
        cartona[number].price = productPriceInput.value;
        cartona[number].gategory = productCategoryInput.value;
        cartona[number].desc = productDescInput.value;
        clear();
        localStorage.setItem("products" , JSON.stringify(cartona))
        displaydata(cartona);
        btnupdate.removeEventListener("click", handleUpdate);
        btnupdate.classList.replace("d-inline-block" , "d-none");
        add.classList.replace("d-none" , "d-inline-block")
    }
}

function valdationname(){
    let regname=/^[A-Z][\w|\d|\s]{3,15}$/
    if(regname.test(productNameInput.value ) ==true)
    {
        productNameInput.classList.replace("is-invalid","is-valid");
        return true;
    } else
    {
        productNameInput.classList.add("is-invalid")
        return false;
    }
}

function valdationdes(){
    let regdesc=/^[\w|\d|\s]{3,200}$/
    if(regdesc.test(productDescInput.value)==true)
    {
        productDescInput.classList.replace("is-invalid","is-valid");
        return true;
    } else
    {
        productDescInput.classList.add("is-invalid")
        return false
    }
}
function valdationprace(){
    let reqpr=/[\d]{1,10}$/
    if(reqpr.test(productPriceInput.value)==true)
    {
        productPriceInput.classList.replace("is-invalid" , "is-valid" ) ;
        return true
    } else {
        productPriceInput.classList.add("is-invalid");
        return false
    }
}
document.getElementById("deletAll").onclick=function(){
        cartona.length = 0;;
        localStorage.setItem("products", JSON.stringify(cartona));
        displaydata(cartona);
    
}

var isDarkMode = false;
var modeToggleBtn = document.getElementById("modeToggle");
var body = document.body;

modeToggleBtn.addEventListener("click", function () {
    isDarkMode = !isDarkMode;
    updateMode();
});

function updateMode() {
    var moden = document.getElementById("moden");
    var modes = document.getElementById("modes");
    var body = document.body;
    
    if (isDarkMode) {
        body.classList.add("dark-mode");
        table.classList.add("table-dark");
        modes.classList.remove("d-none");
        moden.classList.add("d-none");
    } else {
        table.classList.remove("table-dark");
        body.classList.remove("dark-mode");
        modes.classList.add("d-none");
        moden.classList.remove("d-none");
    }

    localStorage.setItem("darkMode", isDarkMode);
}

var storedDarkMode = localStorage.getItem("darkMode");
if (storedDarkMode !== null) {
    isDarkMode = storedDarkMode === "true";
    updateMode();
}

