// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
const list = User.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      }
    }
  })
  // ↑↑ сюди вводимо JSON дані
})
//=================================================================

class User {
 static #list = []
  constructor(email, login, password) {
this.email = email
this.login = login
this.password = password
this.id = new Date().getTime()
  }
  verifyPassword = (password) => this.password === password
  static add = (user) => {
this.#list.push(user)
  }
  static getList = () => 
 this.#list



  static getById = (id) => 
    this.#list.find(user => user.id === id)
   static deleteById = (id) => {
    const index = this.#list.findIndex((user) => user.id === id)
    if(index !== -1) {
    this.#list.splice(index, 1)
    return true
    } else {
      return false
    }
   }

   static updateById = (id, data) => {
const user = this.getById(id)
if(user) {
 if(email) {
 this.update(user, data)
 }
 return true
} else {
  return false
}
   }
 static update = (user, {email}) => {
  if(email) {
    user.email = email
   }
 }
};
//=========================================================
class Product {
  static #list = []
   constructor(name, price, description) {
    this.id = Math.floor(Math.random() * 1000000)
    this.createData = new Date().toISOString()
 this.name = name
 this.price = price
 this.description = description

   }
  
   static getList = () => {
  return this.#list
  
   }
   static add = (product) => {
    this.#list.push(product)
   }
  
   
   static getById = (id) => {

    return this.#list.find(product => product.id === id)
   }
    static updateById = (id, data) => {
     const product = this.getById(id)
    
     if(product) {
     this. update(product, data)
     return true
     } else {
       return false
     }
    }
 
    static update = (
      product, {id, name, price, description}) => {
 product.name = name
 product.price = price
 product.description = description
 product.id = Number(id)

    }
  static deleteById = (id) => {
  const index = this.#list.findIndex(
    (product) => product.id === id)
  if(index !== -1) {
    this.#list.splice(index, 1)
    return true
  } else {
    return false
  }
  }
 };


// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/user-create', function (req, res) {
  const {email, login, password} = req.body;
  const user = new User(email, login, password)
  User.add(user);
  console.log(User.getList());


  res.render('success-info', {

    style: 'success-info',
    info: 'користувач створений',
  })
 
})
//==================================================
router.get('/user-delete', function (req, res) {
  const {id} = req.query
  
  User.deleteById(Number(id))

  

  res.render('success-info', {

    style: 'success-info',
    info: 'користувач видалений',
  })
 
})
//=================================================
router.post('/user-update', function (req, res) {
  const {email, password, id} = req.body
  let result = false
  const user = User.getById(Number(id))
  

if(user.verifyPassword(password)) {
  User.update(user, {email})
  result = true
}



  res.render('success-info', {

    style: 'success-info',
    info: result ? 'Email оновлено' :'Сталася помилка',
  })

})

//==============================================

router.post('/product-create', function (req, res) {
  const {name, price, description} = req.body
  console.log(req.body)
  const product = new Product(name, price, description)
  Product.add(product);
  console.log(Product.getList());


  res.render('alert', {

    style: 'alert',
    alert: 'Успішно',
    alert_msg: 'Товар створений',
  })
 
})



router.get('/product-create', function (req, res) {
  const {id} = req.query
  
  User.deleteById(Number(id))

  

  res.render('product-create', {

    style: 'product-create',
   
  })
 
})


router.get('/product-list', function (req, res) {
  const list = Product.getList()

  
 

  

  res.render('product-list', {
   

    style: 'product-list',
    data: {
     products: {
      list,
      isEmpty: list.length === 0,
     }
    }
   
  })
 
})


router.get('/product-edit', function (req, res) {
  const {id} = req.query
const product =  Product.getById(Number(id))
// console.log(product)
if (!product) {
  res.render('alert', {
    style: 'alert',
    alert: 'Товар відсутній',
  })
} else {
  res.render('product-edit', {
    style: 'product-edit',
    data: {
      product,
    },
  })
}


//  if(product) {

//   return res.render('product-edit', {

//     style: 'product-edit',
//     data: {
//       name: product.name,
//       price: product.price,
//       id: product.id,
//       description: product.description,
//     }
   
//   })
//  } else {
//   return res.render('alert', {

//     style: 'alert',
//    alert: 'Товар відсутній'
   
//   })
//  }
})

router.post('/product-edit', function (req, res) {
  const {id, name, price, description} = req.body
 
  const product = Product.getById(Number(id))
  // product.name = name,
  // product.price = price,
  // product.description = description
  // console.log(id)
  console.log(product.id)
  if (!product) {
    res.render('alert', {
      style: 'alert',
      alert: 'Товар відсутній',
    })
  } else {
    product.name = name
    product.price = price
    product.description = description

    res.render('alert', {
        style: 'alert',
        alert: 'Успішно',
        alert_msg: 'Товар оновлено',
      })
  }
 
// if(product) {
//   res.render('alert', {

//     style: 'alert',
//     alert: 'Успішно',
//     alert_msg: 'Товар створений',
//   })
// } else {
//   product.name = name
//   product.price = price
//   product.description = description
// }

 
 
})


router.get('/product-delete', function (req, res) {
  const {id} = req.query
 Product.deleteById(Number(id))
 res.render('alert', {

  style: 'alert',
 alert: 'Товар видалений'
 
})
})

// router.post('/product-update', function (req, res) {
//   const {id, name, price, description} = req.body
  
//   let result = false
//   const product = Product.getById(Number(id))
// Product.update(product, {id, name, price, description})
// result = true

//   res.render('alert', {

//     style: 'alert',
//     alert: result ?  'Оновлено продукт' : 'Помилка',
    
//   })
 
// })




// Підключаємо роутер до бек-енду

//========================================================




module.exports = router
   