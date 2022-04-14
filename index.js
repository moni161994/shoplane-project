$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    center: true,
    autoplay: true,
    margin: 10,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
  });

  const productCard = (card) => {
    let listItem = document.createElement("li");

    let listItemLink = document.createElement("a");

    let productImage = document.createElement("img");

    let productDetails = document.createElement("div");

    let productName = document.createElement("h4");

    let productBrand = document.createElement("h5");

    let productPrice = document.createElement("p");

    listItem.appendChild(listItemLink);

    listItemLink.href = "/product-details.html?product=" + card.id;

    listItemLink.appendChild(productImage);

    productImage.src = card.preview;

    productImage.alt = card.name;

    productDetails.classList.add("product-details");

    listItemLink.appendChild(productDetails);

    productDetails.appendChild(productName);

    productName.innerText = card.name;

    productDetails.appendChild(productBrand);

    productBrand.innerText = card.brand;

    productDetails.appendChild(productPrice);

    productPrice.innerText = card.price;

    return listItem;
  };

  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function (data) {
    let apiResponse = data;
    console.log(apiResponse);
    for (let i = 0; i < apiResponse.length; i++) {
      apiResponse[i].isAccessory
        ? $("#accessories").append(productCard(apiResponse[i]))
        : $("#clothing").append(productCard(apiResponse[i]));
    }
  });
});

