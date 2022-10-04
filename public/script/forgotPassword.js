document.getElementsByClassName('btn')[0].addEventListener('click',(e)=>{
    e.preventDefault()
    const email=document.getElementById('exampleInputEmail1').value
    console.log(email)
    axios.post('http://localhost:3000/password/forgotpassword',{emailObj:email}).then(res=>{
        console.log(res)
        alert(`User New Password ${res.data.fiveString}`)
        window.location.href='../login/login.html';
    }).catch(err=>console.log(err));
        
})