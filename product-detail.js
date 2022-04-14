$(document).ready(function () {
  let id = window.location.href.split("=")[1];
  let currentObj = null;
  console.log("id", id);

  const gallery = (src, index) => {
    let productThumbnail = document.createElement("img");
    productThumbnail.src = src;

    index === 0 && productThumbnail.classList.add("active-img");

    productThumbnail.onclick = function () {
      $("#gallery img").removeClass("active-img");
      productThumbnail.classList.add("active-img");
      $("#product-img").attr("src", src);
    };

    return productThumbnail;
  };

  $("#add-to-cart").click(function () {
    $("#add-to-cart").css({ opacity: "0.5", pointerEvents: "none" });
    setTimeout(() => {
      $("#add-to-cart").removeAttr("style");
    }, 500);

    var productList = window.localStorage.getItem("product-list");
    productList = productList === null || productList === "" ? [] : productList;
    productList = productList.length > 0 ? JSON.parse(productList) : [];

    // productList.push(currentObj);
    // window.localStorage.setItem('product-list', JSON.stringify(productList));
    console.log(productList);

    var foundAtPos = -1;
    for (var i = 0; i < productList.length; i++) {
      // console.log(productList[i].id);
      if (parseInt(productList[i].id) == parseInt(currentObj.id)) {
        foundAtPos = i;
      }
    }

    if (foundAtPos > -1) {
      productList[foundAtPos].count = productList[foundAtPos].count + 1;
      console.log(productList[foundAtPos].count);
      window.localStorage.setItem("product-list", JSON.stringify(productList));
    } else {
      currentObj.count = 1;
      productList.push(currentObj);
      console.log(productList);
      window.localStorage.setItem("product-list", JSON.stringify(productList));
    }

    var totalCount = 0;
    for (var i = 0; i < productList.length; i++) {
      totalCount = totalCount + productList[i].count;
    }

    $("#cart-count").html(totalCount);
  });

  $.get(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + id,
    function (data) {
      currentObj = data;
      console.log(currentObj, "currentObj");
      $("#product-img").attr("src", currentObj.preview);
      $("#product-name").html(currentObj.name);
      $("#brand").html(currentObj.brand);
      $("#price").html(currentObj.price);
      $("#description").html(currentObj.description);

      for (let i = 0; i < currentObj.photos.length; i++) {
        $("#gallery").append(gallery(currentObj.photos[i], i));
      }
    }
  );
});
