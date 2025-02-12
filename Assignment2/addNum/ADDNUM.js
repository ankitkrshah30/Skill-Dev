function addNumber() {
    let num = parseInt(document.getElementById("number").value);
    let btn = document.createElement("button");
    btn.className = "btn btn-warning m-2";
    btn.textContent = num;

    // Append the new button to the designated container
    document.getElementById("numberContainer").appendChild(btn);

    // Clear the input field after adding
    document.getElementById("number").value = "";
}
