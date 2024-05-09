let products = [
  {
    id: 1,
    name: "Laptop",
    details: "15.6-inch display, 8GB RAM, 512GB SSD",
    price: 999.99,
  },
  {
    id: 2,
    name: "Smartphone",
    details: "6.5-inch screen, 128GB storage, 5G capable",
    price: 699.99,
  },
  {
    id: 3,
    name: "Headphones",
    details: "Wireless over-ear headphones with noise cancellation",
    price: 199.99,
  },
  {
    id: 4,
    name: "Smartwatch",
    details: "Water-resistant with fitness tracking features",
    price: 149.99,
  },
];

const getProducts = (req, res) => {
  return res.status(200).json({
    data: products,
    success: true,
    message: "successfully fetched all the products",
  });
};
const getProductById = (req, res) => {
  let productId = req.params.id;
  let product = products.filter((product) => product.id == productId);
  if (product.length > 0) {
    return res.status(200).json({
      message: "succefully get the product by id",
      data: product,
      success: true,
    });
  }
  return res.status(404).json({
    message: "not found",

    success: false,
  });
};

//post request
const createProduct = (req, res) => {
  console.log(req.body);
  const { id, name, details, price } = req.body;
  //cehck product exist or not
  const index = products.findIndex((product) => product.id == id);
  if (index != -1) {
    return res.status(409).json({
      success: false,
      message: "product existed",
    });
  }
  const product = {
    id,
    name,
    details,
    price,
  };
  products.push(product);
  return res.status(201).json({
    data: products,
    success: true,
    message: "succesfully added the product",
  });
};

const deleteProduct = (req, res) => {
  let productId = req.params.id;
  let index = products.findIndex((product) => product.id == productId);
  let product = products.filter((product) => product.id != productId);

  if (index != -1) {
    products = product;

    return res.status(200).json({
      message: `succefuuly deleted the product with  id ${productId}`,
      data: products,
      success: true,
    });
  }
  return res.status(404).json({
    message: "not found",

    success: false,
  });
};
//update product
const updateProduct = (req, res) => {
  //getOrignal Product
  let productId = req.params.id;
  const updateData = req.body;
  const index = products.findIndex((product) => product.id == productId);
  console.log(index);
  if (index !== -1) {
    for (let key in updateData) {
      if (updateData.hasOwnProperty(key)) {
        products[index][key] = updateData[key];
      }
    }
    res.status(200).json(products[index]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};
module.exports = {
  getProductById,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
