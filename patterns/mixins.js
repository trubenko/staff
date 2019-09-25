function Name(name){
	this.name = name;
}
Name.prototype.getName = function(){
	return this.name;
}

function Surname(surname){
	this.surname = surname;
}
Surname.prototype.getSurname = function(){
	return this.surname;
}

function Age(age){
	this.age = age;
}

Age.prototype.getAge = function(){
	return age;
}

function Collector(){

}

var arr  = [Name, Surname, Age];
for (var i=0; i<arr.length;i++){

	for(var key in arr[i].prototype) Collector.prototype[key] = arr[i].prototype[key]
}

for(var key in Collector.prototype){
	console.log(key);
}
