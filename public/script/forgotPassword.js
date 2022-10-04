document.getElementsByClassName('btn')[0].addEventListener('click',(e)=>{
    e.preventDefault()
    const email=document.getElementById('exampleInputEmail1').value
    console.log(email)
    axios.post('http://localhost:3000/password/forgotpassword',{emailObj:email}).then(res=>console.log(res)).catch(err=>console.log(err));
})