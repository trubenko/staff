//Написать класс Cat, который наследуется от класcа Animal.
//Класс Animal имеет метод getName (name можно передать в конструктор).
// Класс Cat имеет метод meow (возвращает строку “Cat {catname} is sayig meow”.
//
// function Animal(name){
//   this.name = name || 'Unknown';
//   this.getName = function(){
//     return this.name
//   };
// }
//
// function Cat(name){
//   Animal.call(this, name);
//   this.meow = function(){
//     return 'Cat '+ this.getName() +' is saying meow'
//   };
// }
//===========================================================================//

// function Animal(name){
//   this.name = name || 'Unknown';
// }
//
// Animal.prototype.getName = function(){
//   return this.name;
// }
//
// function Cat(name){
//   Animal.call(this, name);
// }
//
// Cat.prototype = Object.create(Animal.prototype);
// Cat.prototype.constructor = Cat;
// Cat.prototype.meow = function(){
//   return 'Cat '+ this.getName() +' is saying meow'
// }
//===========================================================================//

class Animal {
  constructor(name){
    this.name = name
  }
  getName(){
    return this.name
  }
}

class Cat extends Animal {
  meow(){
    return 'Cat '+ super.getName() +' is saying meow'
  }
}
//===========================================================================//
var cat = new Cat('garfield');
console.log(cat.getName());
console.log(cat.meow());
console.log(cat.getName() === 'garfield'); // true
console.log(cat.meow() === 'Cat garfield is saying meow'); // true
//===========================================================================//
