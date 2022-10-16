document.getElementsByClassName("btn")[0].addEventListener("click", (e) => {
  e.preventDefault();
  const userName = document.getElementById("exampleInputName1").value;
  const userMail = document.getElementById("exampleInputEmail1").value;
  const userPassword = document.getElementById("exampleInputPassword1").value;

  const obj = {
    userName,
    userMail,
    userPassword,
  };

  axios
    .post("http:// 34.217.123.175:3000", obj)
    .then((res) => {
      console.log("result");
      console.log(res);
      if (res.status == 200) alert("User added successfully");
      window.location.href = "./login/login.html";
      document.getElementById("exampleInputName1").value = "";
      document.getElementById("exampleInputEmail1").value = "";
      document.getElementById("exampleInputPassword1").value = "";
    })
    .catch((err) => {
      console.log("catch of app.js");
      if (err.response.status == 400) alert("something went wrong");
      console.log(err);
    });
});
