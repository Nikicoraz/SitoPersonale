function enterOne(id){
    var child = document.getElementById(id).children[0];
    child.innerHTML = child.innerHTML + "1";
}
function enterZero(id){
    var child = document.getElementById(id).children[0];
    child.innerHTML = child.innerHTML + "0";
}
function ok(id){
    var child = document.getElementById(id).children[0];
    numbers = child.innerHTML.replace("Inserire " + id + ": ", "");
    result = parseInt(numbers, 2);
    child.innerHTML = "Inserire " + id +": " + result;
}