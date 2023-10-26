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
//=============================================================
class PurchaseProduct {
  static #list = []
  static #count = 0
  constructor(img, title, description, category, price, amount = 0) {
    this.id = ++PurchaseProduct.#count
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.amount = amount

  }
  static add = (
    img,
    title,
    description,
    category,
    price,
    
  ) => {
    const newProduct = new PurchaseProduct(
  img,
  title,
  description,
  category,
  price,
    )
    this.#list.push(newProduct)
  }
  static getList = () => {
    return this.#list
  }
  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }
  static getRandomList = (id) => {
    const filteredList = this.#list.filter((product) => product.id !== id)
    const shuffledList = filteredList.sort((product) => Math.random() - 0.5)
    return shuffledList.slice(0, 3)
  }
}
PurchaseProduct.add(
  'https://picsum.photos/200/300',
  'ASUS Vivobook 15 X1500EA-BQ3733 (90NB0TY6-M040W0) Прозорий сріблястий',
  'Vivobook 15 - це ноутбук на кожен день, готовий впоратися з будь-якими завданнями, будь то офісні або особисті справи, робочі або розважальні додатки. Процесор Intel Core 11-го покоління значно перевершує за продуктивністю своїх попередників.',
  [
    {id: 1, text: 'Готовий до відправки'},
    {id: 2, text: 'Топ продажів'}
  ],
  27900,
  10,

)
PurchaseProduct.add(
  'https://picsum.photos/200/300',
  "Ігровий комп'ютер Artline (X43v31) AMD Ryzen 5 3600",
  "AMD Ryzen 5 3600 (3,6 - 4,2 ГГц) / 16 ГБ оперативної пам'яті / 1 ТБ HDD + 480 ГБ SSD / nVidia GeForce RTX 3050, 8 ГБ / без OD / LAN / без ОС",
  [{id:2, text: 'Топ продажів'}],
  39000,
  10,
)
PurchaseProduct.add(
  'https://picsum.photos/200/300',
  "ARTLINE Gaming X47 (X47v45) AMD Ryzen 5 5500",
  "AMD Ryzen 5 5500 (3,6 - 4,2 ГГц) / 16 ГБ оперативної пам'яті / 1 ТБ HDD + 480 ГБ SSD / nVidia GeForce RTX 3060, 12 ГБ / без OD / LAN / без ОС",
  [{id: 1, text: 'Готовий до відправки'}],
  75000,
  10
)
class Purchase {
  static DELIVERY_PRICE = 150
  static #BONUS_FACTOR = 0.1
  static #count = 0
  static #list = []
  static #bonusAccount = new Map()
  static getBonusBalance = (email) => {
    return Purchase.#bonusAccount.get(email) || 0
  }
  static calcBonusAmount = (value) => {
    return value * Purchase.#BONUS_FACTOR
  }
  static updeteBonusBalance = (email, price, bonusUse = 0) => {
    const amount = price * this.calcBonusAmount(price)
    const currentBalance = Purchase.getBonusBalance(email)
    const updateBalance = currentBalance + amount - bonusUse
    Purchase.#bonusAccount.set(email, updateBalance)
    console.log(email, updateBalance)
    return amount
  }
  constructor(data, product) {
    this.id = ++Purchase.#count
    this.firstname = data.firstname
    this.lastname = data.lastname
    this.phone = data.phone
    this.email = data.email
    this.comment = data.comment || null
    this.bonus = data.bonus || 0
    this.promocode = data.promocode || null
    this.totalPrice = data.totalPrice
    this.productPrice = data.productPrice
    this.deliveryPrice = data.deliveryPrice
    this.amount = data.amount
    this.product = product

  }
  static add = (...arg) => {
    const newPurchase = new Purchase(...arg)
    this.#list.push(newPurchase)
    return newPurchase
  } 
  static getList = () => {
    return Purchase.#list.reverse()
    .reverse()
    .map(({id, product: {title}, totalPrice}) => ({
      id,
      title,
      totalPrice,
      bonusAdd: this.calcBonusAmount(totalPrice)
    }))
    //=========
  }
  static getById = (id) => {
    return Purchase.#list.find((item) => item.id === id)
  }
  static updateById = (id, data) => {
    const purchase = Purchase.#list.find((item) => item.id === id)
    if(purchase) {
      if(data.firstname)
      purchase.firstname = data.firstname
    if(data.lastname) purchase.lastname = data.lastname
    if(data.phone) purchase.phone = data.phone
    if(data.email) purchase.email = data.email
    return true
    } else {
      return false
    }
  }
}
//=================================================================
class Promocode {
  static #list = []
  constructor(name, factor) {
    this.name = name
    this.factor = factor
  }
  static add = (name, factor) => {
    const newPromocode = new Promocode(name, factor)
    Promocode.#list.push(newPromocode)
    return newPromocode
  }
  static getByName = (name) => {
    return this.#list.find((promo) => promo.name === name)
  }
  static calc = (promo, price) => {
    return price * promo.factor
  }
}
Promocode.add('SUMMER2023', 0.9)
Promocode.add('DISCOUT50', 0.5)
Promocode.add('SALE25', 0.75)
//===============================================================

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


//================================
router.get('/alert-two', function (req, res) {
  // res.render генерує нам HTML сторінку
// const list = User.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert-two', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert-two',
    data: {
     message: 'Операція успішна',
     info: 'Товар створений',
     link: `/purchase-create`
    }
  })
  // ↑↑ сюди вводимо JSON дані
})
//=================================================================
router.get('/purchase-index', function (req, res) {
  // res.render генерує нам HTML сторінку
// const list = User.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',
    data: {
    list: PurchaseProduct.getList()
    }
  })
  // ↑↑ сюди вводимо JSON дані
})
//===================================================================
router.get('/purchase-product', function (req, res) {
  // res.render генерує нам HTML сторінку
const id = Number(req.query.id)
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',
    data: {
    list: PurchaseProduct.getRandomList(id),
    product: PurchaseProduct.getById(id)
    }
  })
  // ↑↑ сюди вводимо JSON дані
})
//=================================================================
router.get('purchase-list', function(req, res) {
  console.log(Purchase.getList())
  res.render('purchase-list', {
    style: 'purchase-list',
    data: {
      list: Purchase.getList()
    }
  })
})
//============================================
router.get('purchase-info', function(req, res) {
  const id = Number(req.query.id)
  const purchase = Purchase.getById(id)
  const bonus = Purchase.calcBonusAmount(purchase.totalPrice)
  if(!purchase) {
    return res.render('alert-two', {
      style: 'alert-two',
      data: {
        message: 'Помилка',
        info: 'Замовлення не знайдено',
        link: `purchase-list`
      }
    })
  }
  res.render('purchase-info')
})
//============================================================
// router.post('/purchase-create', function (req, res) {
//   // res.render генерує нам HTML сторінку
// const id = Number(req.query.id)
// const amount = Number(req.body.amount)
// if(amount <= 0 || amount > 30) {
//   return res.render('alert-two', {
//      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//      style: 'alert-two',
//      data: {
//      message:'Помилка',
//      info: 'Некоректна кількість товару',
//      link: `/purchase-product?id=${id}`
//      }
//    })
//  }
// const product = PurchaseProduct.getById(id)
// if(product.amount < 1) {
//   return res.render('alert-two', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'alert-two',
//     data: {
//     message:'Помилка',
//     info: 'Такої кількості товару немає в наявності',
//     link: `/purchase-product?id=${id}`
//     }
//   })
// }
// console.log(product, amount)
// const productPrice = product.price * amount
// const totalPrice = productPrice + Purchase.DELIVERY_PRICE
// const bonus = Purchase.calcBonusAmount(totalPrice)

// res.render('purchase-create', {
//   style: 'purchase-create',
//   data: {
//     id: product.id,

//     cart: [
//      { text: `${product.title} (${amount} шт)`,
//       price: productPrice,
//     },
//     {
//       text: 'Доставка',
//       price: Purchase.DELIVERY_PRICE
//     },
//     ],
//     totalPrice, 
//     productPrice,
//     deliveryPrice: Purchase.DELIVERY_PRICE,
//     amount,
//     bonus,
//   }
// })



//   // ↙️ cюди вводимо назву файлу з сontainer
//   res.render('purchase-product', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'purchase-product',
//     data: {
//     list: PurchaseProduct.getRandomList(id),
//     product: PurchaseProduct.getById(id)
//     }
//   })
//   // ↑↑ сюди вводимо JSON дані
// })
//===================================================
router.post('/purchase-create', function (req, res) {
  const id = Number(req.query.id)
  const amount = Number(req.body.amount)

  if (amount <= 0 || amount > 30) {
    return res.render('alert-two', {
      style: 'alert-two',
      data: {
        message: 'Помилка',
        info: 'Некоректна кількість товару',
        link: `/purchase-product?id=${id}`
      }
    })
  }

  const product = PurchaseProduct.getById(id)

  if (isNaN(amount) || amount < 1 || amount > 30) {
    return res.render('alert-two', {
      style: 'alert-two',
      data: {
        message: 'Помилка',
        info: 'Такої кількості товару немає в наявності',
        link: `/purchase-product?id=${id}`
      }
    })
  }

  const productPrice = product.price * amount
  const totalPrice = productPrice + Purchase.DELIVERY_PRICE
  const bonus = Purchase.calcBonusAmount(totalPrice)

  res.render('purchase-create', {
    style: 'purchase-create',
    data: {
      id: product.id,
      cart: [
        {
          text: `${product.title} (${amount} шт)`,
          price: productPrice,
        },
        {
          text: 'Доставка',
          price: Purchase.DELIVERY_PRICE
        },
      ],
      totalPrice,
      productPrice,
      deliveryPrice: Purchase.DELIVERY_PRICE,
      amount,
      bonus,
    }
  })
})
//=========================================
router.post('purchase-submit', function(req, res) {
  const id = Number(req.query.id)
  let {
    totalPrice,
    productPrice,
    deliveryPrice,
    amount,
    firstname,
    lastname,
    email,
    phone,
    promocode,
    bonus,
    comment,
  } = req.body
  const product = PurchaseProduct.getById(id)
  if(!product) {
    return res.render('alert-two', {
      style: 'alert-two',
      component: ['button', 'heading'],
      data: {
        message: 'Помилка',
        info: 'Товар не знайдено',
        link:'/purchase-list'
      }
    })
  }
  if(product.amount < amount ) {
    return res.render('alert-two', {
      style: 'alert-two',
      component: ['button', 'heading'],
      data: {
        message: 'Помилка',
        info: 'Товару немає в потрібній кількості',
        link:'/purchase-list'
      }
    })
  }
  totalPrice = Number(totalPrice)
  productPrice = Number(productPrice)
  deliveryPrice = Number(deliveryPrice)
  amount = Number(amount)
  bonus = Number(bonus)
if(
  isNaN(totalPrice) ||
  isNaN(productPrice) ||
  isNaN(deliveryPrice) ||
  isNaN(amount) ||
  isNaN(bonus)
) {
  return res.render('alert-two', {
    style: 'alert-two',
    component: ['button', 'heading'],
    data: {
      message: 'Помилка',
      info: 'Некоректні дані',
      link:'/purchase-list'
    }
  })
}
if(!firstname || !lastname || !email || !phone || !delivery) {
  return  res.render('alert-two', {
    style: 'alert-two',
    component: ['button', 'heading'],
    data: {
      message: 'Заповніть обов*язкові поля',
      info: 'Некоректні дані',
      link:'/purchase-list'
    }
  })
}
if(bonus || bonus > 0) {
  const bonusAmount = Purchase.getBonusBalance(email)
 console.log(bonusAmount)
 if(bonus > bonusAmount) {
  bonus = bonusAmount
 }
  Purchase.updeteBonusBalance(email, totalPrice, bonus)
totalPrice -= bonus
} else {
  Purchase.updeteBonusBalance(email, totalPrice, 0)
}

if(promocode) {
  promocode = Promocode.getByName(promocode)
  if(promocode) {
    totalPrice = Promocode.calc(promocode, totalPrice)
  }
}
if(totalPrice < 0) totalPrice = 0
const purchase = Purchase.add (
  {
    totalPrice,
    productPrice,
    deliveryPrice,
    amount, 
    bonus,
    firstname,
    lastname,
    email,
    phone,
    promocode,
    comment,
    delivery,

  },
  product
)
console.log(purchase)
 
  res.render('alert-two', {
    style: 'alert-two',
    data: {
      message: 'Успішно',
      info: 'Замовлення створено',
      link:'/purchase-list',
    }
  })
})
// Підключаємо роутер до бек-енду

//========================================================




module.exports = router
   