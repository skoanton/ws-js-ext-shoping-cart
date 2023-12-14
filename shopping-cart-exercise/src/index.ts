const productButtons: NodeList = document.querySelectorAll("button");
const shoppingCart: (string | null)[] = [];
const cart: HTMLElement | null = document.querySelector("#cart");
const openCartButton: HTMLElement | null = document.querySelector("#open-cart");
const cartWrapper: HTMLElement | null = document.getElementById("cart");
const booksInStore: HTMLElement | null = document.querySelector("card");
const productsListEl: HTMLElement | null = document.getElementById("products");
const removeAllBtn: HTMLElement = document.getElementById("removeAllBtn");

let productsInCart : number = 0;
let booksExistsInCart: boolean;

function showCart(): void {

  if(cartWrapper.classList.contains("hide")){
      cartWrapper.classList.remove("hide");
      console.log("Hide finns");
      
  }

  else{
    cartWrapper.classList.add("hide");
    console.log("Hide finns inte");
    
  }


}

function updateCart(): void{

    while(productsListEl?.firstChild){
      productsListEl?.firstChild.remove();
    }

    shoppingCart.forEach(cartObj => {
      let pEl: HTMLElement = document.createElement("p");
      pEl.innerHTML = cartObj

      let liEl:HTMLElement = document.createElement("li");
      liEl.appendChild(pEl);

      productsListEl?.appendChild(liEl);
      let buttonEl :HTMLElement = document.createElement("button");
      buttonEl.innerHTML ="x";
      buttonEl.setAttribute("id","removeBtn");
      buttonEl.addEventListener("click", function(){
        remove(event.target as HTMLElement);
      });
      liEl.appendChild(buttonEl);
      console.log("addded to list");
    });

  

}


function remove(book:HTMLElement): void{
  console.log("remove");
  let bookParentEl:HTMLElement = book.parentNode as HTMLElement;
  console.log(bookParentEl);
  let bookData: HTMLElement = bookParentEl.firstChild as HTMLElement;
  
  console.log("Ska nu ta bort:" + bookData);


  for(let i=0; i<shoppingCart.length;i++){
    if(shoppingCart[i] === bookData.innerHTML){
      console.log("removed" + shoppingCart[i]);
      delete shoppingCart[i]; 
      
      break;
    }
  }
  productsInCart--;
  document.getElementById("productsInCart").innerHTML = productsInCart.toString();
  bookParentEl.remove();


}
function addClickEvent(): void {
  // Void betyder att funktionen ej returnerar något värde
  // För att kunna använda parentElement behöver vi göra om det till ett HTMLElement istället för typen EventTarget
  productButtons.forEach(productButton => {
    productButton.addEventListener("click", function(){
      addToCart(event.target as HTMLElement);
    })
  });

  openCartButton.addEventListener("click", showCart);

  removeAllBtn.addEventListener("click", removeAll)


}

function removeAll(){
  while(productsListEl.firstChild){
    productsListEl.firstChild.remove();

  }
  while(shoppingCart.length>0){
    shoppingCart.pop();
  }
  productsInCart = 0;
  document.getElementById("productsInCart").innerHTML = productsInCart.toString();
}

function listProductsInCart(): void { }

addClickEvent();

function addToCart(product: HTMLElement): void {
    let bookEl = product.parentNode as HTMLElement;
   let bookData = bookEl.getAttribute("data-product");


      for (let i = 0; i<shoppingCart.length; i++){
        if(shoppingCart[i] === bookData){
          console.log("running");
            booksExistsInCart = true;
            break;
        }
      }

      if(!booksExistsInCart){

        shoppingCart.push(bookData);
        productsInCart++;
        console.log(productsInCart);
        document.getElementById("productsInCart").innerHTML = productsInCart.toString();
        updateCart();
        
      }

      else{
        window.alert("Bok redan tillagd");
        booksExistsInCart = false;
      }
     
  
}