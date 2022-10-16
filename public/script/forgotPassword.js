document.getElementsByClassName("btn")[0].addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("exampleInputEmail1").value;
  console.log(email);
  axios
    .post("http:// 34.217.123.175:3000/password/forgotpassword", {
      emailObj: email,
    })
    .then((res) => {
      alert(
        `http:// 34.217.123.175:3000/password/resetpassword/${res.data.requestId}`
      );
      window.location.href = "../login/login.html";
    })
    .catch((err) => console.log(err));
});
