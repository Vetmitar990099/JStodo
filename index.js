var list = document.querySelector('#lists')

console.log('Javascript is referenced')

function newlist() {
    list.innerhtml = '<div class="listname"><a href="#">Shopping List</a></div>' + list.innerhtml
}

// historyDiv.innerHTML = `<p>${firstNumber.value} + ${secondNumber.value} = ${sum}</p>`+ historyDiv.innerHTML
