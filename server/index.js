const express=require('express')
const app=express();
const db= require('./models')
const cors= require('cors')

app.use(express.json())
app.use(cors())
//routers
const UserRoute= require('./routes/Users')
const ProductRoutes= require('./routes/Products')
const SalesRoutes= require('./routes/Sales')
const Supplierroutes=require('./routes/Supplier')
const Purchasesroutes=require('./routes/Purchases')
app.use('/users',UserRoute);
app.use('/products', ProductRoutes);
app.use("/sales", SalesRoutes);
app.use("/supplier", Supplierroutes);
app.use("/purchases", Purchasesroutes);

db.sequelize.sync().then(()=>{
    app.listen(5000, ()=>{
        console.log("DEV APP PORT 5000")
    })
})
