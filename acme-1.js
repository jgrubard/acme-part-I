//instructions
//write the 4 functions below
//no third party libraries
//try not to use any forEach
//each function should be short and some functions can depend on other functions (hint no function should be more than 10 lines)

//list of products
var products = [
  {
    id: 1,
    price: 5,
    name: 'foo'
  },
  {
    id: 2,
    price: 3,
    name: 'bar'
  },
  {
    id: 3,
    price: 9,
    name: 'bazz'
  }
];

//list of line items
var lineItems = [
   {
     productId: 1,
     quantity: 1
   },
   {
     productId: 1,
     quantity: 1
   },
   {
     productId: 2,
     quantity: 1
   },
   {
     productId: 3,
     quantity: 1
   },
];
//returns an object
//keys are the ids of products
//the values are the products themselves
function generateProductsMap(products){
  var num = 0;
  var result = products.reduce(function(newObj, product) {
    num++;
    newObj[num] = product;
    return newObj;
  }, {});
  return result;
}

//returns an object
//keys are the ids of products
//value is the total revenue for that product
function salesByProduct(products, lineItems) {
  var genMap = generateProductsMap(products);
  return lineItems.reduce(function(finalObj, prodObj) {
    var newId = prodObj.productId;
    if(!finalObj[newId]) finalObj[newId] = genMap[newId].price * prodObj.quantity;
    else finalObj[newId] += genMap[newId].price * prodObj.quantity;
    return finalObj;
  }, {});
}

//return the total revenue for all products
function totalSales(products, lineItems){
  var allSales = salesByProduct(products, lineItems);
  return Object.keys(allSales).reduce(function(accumulator, currentValue) {
    return accumulator + allSales[currentValue];
  }, 0);
}

//return the product responsible for the most revenue
function topSellerByRevenue(products, lineItems){
  var mostProfit = 0;
  var allSales = salesByProduct(products, lineItems);
  return Object.keys(allSales).reduce(function(topName, id) {
    if(allSales[id] > mostProfit) {
      mostProfit = allSales[id];  // highest profit so far
      topName = generateProductsMap(products)[id].name; // product name;
    }
    return topName;
  },"");
}

console.log(`generates product map - should be
{
  1:{
    id: 1,
    name: "foo",
    price: 5
  },
  2:{
    id: 2,
    name: "bar",
    price: 3
  },
  3:{
    id: 3,
    name: "bazz",
    price: 9
  }
}
`, generateProductsMap(products));
console.log(`sales by product - should be
  {
    1: 10,
    2: 3,
    3: 9
}`, salesByProduct( products, lineItems));
console.log('total sales - should be 22', totalSales( products, lineItems));
console.log('top seller by revenue', topSellerByRevenue(products, lineItems ));
