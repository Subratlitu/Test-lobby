console.log("dff")
const senders = ["Balbant", "Sartaj", "Riya", "Nikhil"];
const receivers = ["Pallav", "Arun", "Aditya", "Sharvari"];

const inputField = document.getElementById("input-text");
const sendButton = document.getElementById("sendBtn");

const senderSelect = document.getElementById("selectSender");
const receiverSelect = document.getElementById("selectReceiver");

const addOptionsToSender = () => {
 for (let i = 0; i < senders.length; i++) {
 const sender = senders[i];
 const option = document.createElement("option");
 option.value = sender;
 option.textContent = sender;
 senderSelect.appendChild(option);
 }
};

const addOptionsToReceiver = () => {
 for (let i = 0; i < receivers.length; i++) {
 const receiver = receivers[i];
 const option = document.createElement("option");
 option.value = receiver;
 option.textContent = receiver;
 receiverSelect.appendChild(option);
 }
};

const handleEmptyValueIssue = () => {
 inputField.addEventListener("input", () => {
 const inputValue = inputField.value;
 sendButton.disabled = inputValue.trim() === "";
 });
};

const handleButtonClick = () => {
 sendButton.addEventListener("click", () => {
 const inputValue = inputField.value;

 if (inputValue.trim() === "") {
 alert("Please Provide Appropriate Query :)");
 return;
 }

 const postData = {
 sender: senderSelect.value,
 receiver: receiverSelect.value,
 query: inputValue,
 };

 console.log(postData);
 });
};

addOptionsToSender();
addOptionsToReceiver();
handleEmptyValueIssue();
handleButtonClick();