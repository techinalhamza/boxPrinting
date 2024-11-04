const hamburger = document.querySelector(".hamburger-menu");
const navLink = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLink.classList.toggle("mobile-nav");
});

// function toggleDropdown(open) {
//   const dropdown = document.getElementById("productDropdown");
//   if (open) {
//     dropdown.style.maxHeight = "600px"; // Set maximum height when open
//   } else {
//     dropdown.style.maxHeight = "0";
//   }
// }

// Function to Map Categories
function mapCategories(data) {
  const dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.innerHTML = ""; // Clear existing content

  data.forEach(category => {
    // Create a container for each category
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");

    // Add category title
    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.textContent = category.category;
    categoryDiv.appendChild(categoryTitle);

    // Map products for this category
    const productsList = mapProducts(category.items);
    categoryDiv.appendChild(productsList);

    dropdownContent.appendChild(categoryDiv);
  });
}

// Function to Map Products Under Each Category
function mapProducts(products) {
  const productUl = document.createElement("ul");

  products.forEach(product => {
    const productLi = document.createElement("li");
    productLi.classList.add("product-item");

    const productLink = document.createElement("a");
    productLink.href = `/singleproduct.html?id=${product.id}`;
    productLink.textContent = product.name;
    productLink.classList.add("product-link");

    productLi.appendChild(productLink);
    productUl.appendChild(productLi);
  });

  return productUl;
}

// Toggle Dropdown on Hover
function toggleDropdown(open) {
  const dropdown = document.getElementById("productDropdown");
  if (open) {
    dropdown.style.maxHeight = "600px"; // Set maximum height when open
  } else {
    dropdown.style.maxHeight = "0";
  }
}

// Initialize Mega Menu with Categories and Products
document.addEventListener("DOMContentLoaded",async function() {
  try {
    const response = await fetch("products.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const productsData = await response.json();
    // console.log("Fetched Products Data:", productsData); // Log productsData for debugging

    products = productsData;

    mapCategories(productsData);

  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

if (
  window.location.pathname === "/" ||
  window.location.pathname.includes("index.html")
) {
  function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const isOpen = content.style.maxHeight;
    // Close all open accordions
    document.querySelectorAll(".accordion-content").forEach((item) => {
      item.style.maxHeight = null;
      item.previousElementSibling.querySelector("span:last-child").textContent =
        "+";
    });

    // Toggle the clicked accordion
    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
      button.querySelector("span:last-child").textContent = "-";
    } else {
      content.style.maxHeight = null;
      button.querySelector("span:last-child").textContent = "+";
    }

    document.querySelectorAll(".accordion-content").style.marginBottom = "4rem";
  }

  let products = [];

  async function fetchProducts() {
    try {
      const response = await fetch("products.json");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const productsData = await response.json();
      // console.log("Fetched Products Data:", productsData); // Log productsData for debugging

      products = productsData;

      bestSeller(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const bestSeller = (products) => {
    // console.log(products);
    const popularProductsSection = document.getElementById(
      "popularProductsSection"
    );
    popularProductsSection.innerHTML = "";

    const popularProducts = products.flatMap((val) =>
      val.items.filter((val_) => val_.popular === "true")
    );

    const cluster = popularProducts
      .map((val_) => {
        return `
          <a href="/singleproduct.html?id=${val_.id}" class="product-link">
            <div class="product-card">
              <div class="product-content">
                <!-- Product Image -->
                <div class="product-image-bx">
                  <img src="${val_.img}" alt="${
          val_.name
        }" class="product-image"/>
                </div>
                <!-- Product Name and Description -->
                <div class="product-info">
                  <h1 class="product-name">${val_.name}</h1>
                  <p class="product-description">${val_.desc.substr(
                    0,
                    100
                  )}...</p>
                </div>
                <!-- Rating and Button -->
                <div class="product-btn">
                  <div class="rating">★★★★☆</div>
                  <button class="buy-now-btn">Buy Now</button>
                </div>
              </div>
            </div>
          </a>
        `;
      })
      .join("");

    popularProductsSection.innerHTML = cluster;
    bestSellerTab.classList.add("active");
  };

  const newArrival = (products) => {
    const popularProductsSection = document.getElementById(
      "popularProductsSection"
    );
    popularProductsSection.innerHTML = "";

    // Flatten the new arrival products
    const newArrivalProducts = products.flatMap((val) =>
      val.items.filter((val_) => val_.newArrival === "true")
    );

    // Create the HTML structure for new arrival products
    const cluster = newArrivalProducts
      .map((val_) => {
        return `
          <a href="/singleproduct.html?id=${val_.id}" class="product-link">
            <div class="product-card">
              <div class="product-content">
                <!-- Product Image -->
                <div class="product-image-bx">
                  <img src="${val_.img}" alt="${
          val_.name
        }" class="product-image"/>
                </div>
                <!-- Product Name and Description -->
                <div class="product-info">
                  <h1 class="product-name">${val_.name}</h1>
                  <p class="product-description">${val_.desc.substr(
                    0,
                    50
                  )}...</p>
                </div>
                <!-- Rating and Button -->
                <div class="product-btn">
                  <div class="rating">★★★★☆</div>
                  <button class="buy-now-btn">Buy Now</button>
                </div>
              </div>
            </div>
          </a>
        `;
      })
      .join(""); // Join to create a single string for innerHTML

    popularProductsSection.innerHTML = cluster; // Set the innerHTML to the cluster
  };
  const topSeller = (products) => {
    const popularProductsSection = document.getElementById(
      "popularProductsSection"
    );
    popularProductsSection.innerHTML = "";

    // Flatten the new arrival products
    const topSellerProducts = products.flatMap((val) =>
      val.items.filter((val_) => val_.topSeller === "true")
    );

    const cluster = topSellerProducts
      .map((val_) => {
        return `
          <a href="/singleproduct.html?id=${val_.id}" class="product-link">
            <div class="product-card">
              <div class="product-content">
                <!-- Product Image -->
                <div class="product-image-bx">
                  <img src="${val_.img}" alt="${
          val_.name
        }" class="product-image"/>
                </div>
                <!-- Product Name and Description -->
                <div class="product-info">
                  <h1 class="product-name">${val_.name}</h1>
                  <p class="product-description">${val_.desc.substr(
                    0,
                    50
                  )}...</p>
                </div>
                <!-- Rating and Button -->
                <div class="product-btn">
                  <div class="rating">★★★★☆</div>
                  <button class="buy-now-btn">Buy Now</button>
                </div>
              </div>
            </div>
          </a>
        `;
      })
      .join("");

    popularProductsSection.innerHTML = cluster; // Set the innerHTML to the cluster
  };

  // Event listeners for tab links
  const bestSellerTab = document.getElementById("bestSellerLink");
  const newArrivalTab = document.getElementById("newArrivalLink");
  const topSellerTab = document.getElementById("topSellerLink");
  document.addEventListener("DOMContentLoaded", () => {

    // const bestSellerTab = document.getElementById("bestSellerTab");
    // const newArrivalTab = document.getElementById("newArrivalTab");
    // const topSellerTab = document.getElementById("topSellerTab");

    if (bestSellerTab && newArrivalTab && topSellerTab) {
      // Ensure elements exist
      bestSellerTab.addEventListener("click", () => {
        bestSeller(products);
        bestSellerTab.classList.add("active");
        newArrivalTab.classList.remove("active");
        topSellerTab.classList.remove("active");
      });

      newArrivalTab.addEventListener("click", () => {
        newArrival(products);
        bestSellerTab.classList.remove("active");
        newArrivalTab.classList.add("active");
        topSellerTab.classList.remove("active");
      });

      topSellerTab.addEventListener("click", () => {
        topSeller(products);
        bestSellerTab.classList.remove("active");
        newArrivalTab.classList.remove("active");
        topSellerTab.classList.add("active");
      });
    } else {
      console.warn("Tab elements not found on this page.");
    }

    fetchProducts();
  });
  const options = [
    "COATING & LAMINATIONS",
    "PRINTING OPTIONS",
    "SPECIAL FINISHES",
    "PAPERBOARD",
    "CORRUGATED",
    "FLUTED GRADES",
    "RIGID MATERIALS",
  ];

  let coatingData = []; // Global variable to store fetched data
  let activeIndex = 0;

  async function renderCoatchingProducts() {
    try {
      const response = await fetch("coating.json");
      coatingData = await response.json(); // Store data globally
      renderItems(); // Render items after fetching data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCoatchingProducts();
    renderOptions(); // Render options on page load
  });

  function renderOptions() {
    const navLinks = document.getElementById("nav-links");
    navLinks.innerHTML = options
      .map(
        (option, index) => `
      <li class="${
        activeIndex === index ? "active-option" : "inactive-option"
      }" onclick="handleClick(${index})">
        ${option}
      </li>
    `
      )
      .join("");
  }

  function renderItems() {
    const cardsContainer = document.getElementById("cards-container");
    const filteredItems = coatingData
      .filter((data) => data.category === options[activeIndex])
      .flatMap((data) => data.items); // Use flatMap to directly flatten items array

    cardsContainer.innerHTML = filteredItems
      .map(
        (item) => `
      <a href="/coatingProduct.html?id=${item.id}" class="coating-card">
        <img src="${item.img}" alt="${item.name}" class="coating-image">
        <div class="coating-info">
          <h1 class="coating-title">${item.name}</h1>
          <p class="coating-description">${item.desc}</p>
        </div>
      </a>
    `
      )
      .join("");
  }

  function handleClick(index) {
    activeIndex = index;
    renderOptions(); // Re-render options to show the active state
    renderItems(); // Render items based on the new activeIndex
  }
}

// Search bar functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        const searchQuery = searchInput.value.trim();

        if (searchQuery) {
          // Check if we are on the shop page
          if (window.location.pathname.includes("shop.html")) {
            // If on the shop page, filter products without redirecting
            filterProductsOnShop(searchQuery);
          } else {
            // If not on the shop page, redirect to shop.html with search query
            window.location.href = `shop.html?search=${encodeURIComponent(
              searchQuery
            )}`;
          }
        }
      }
    });
  }
});
