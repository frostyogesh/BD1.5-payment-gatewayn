let express = require('express');
let cors = require("cors");

let app = express();
app.use(cors());


let taxrate = 5;
let discountpercentage = 10;
let loyaltyRate = 5;
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = cartTotal+newItemPrice;
  
  res.send(totalCartPrice.toString());
});


function membershipDiscount(cartTotal,isMember){
  let discount = cartTotal-((cartTotal*10)/100);

if  (isMember === 'true'){
  return discount;
}else{
  return cartTotal;
}
}

app.get('/membership-discount',(req,res) => {
  let cartTotal  = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;

  

  res.send(membershipDiscount(cartTotal,isMember).toString());
  
})

app.get('/calculate-tax',(req,res) => {
  let cartTotal  = parseFloat(req.query.cartTotal);
  let tax = (cartTotal*5)/100;

  
  

  res.send(tax.toString());
})


app.get('/estimate-delivery',(req,res) => {
  let shippingMethod  = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  let result=[];
  if  (shippingMethod === 'standard'){
    result =  distance/50;
  }else{
    result =  distance/100;
  }

  res.send(result.toString());
})
app.get('/shipping-cost',(req,res) => {
  let weight  = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = (weight*distance*0.1);

  res.send(shippingCost.toString());
})
app.get('/loyalty-points',(req,res) => {
  let purchaseAmount  = parseFloat(req.query.purchaseAmount);
  
  let loyaltyPoints = purchaseAmount*2;

  res.send(loyaltyPoints.toString());
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

