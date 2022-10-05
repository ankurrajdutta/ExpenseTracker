document.getElementsByClassName('btn')[0].addEventListener('click',(e)=>{
    e.preventDefault();
 
    let urlComplete=(window.location.href).split('/');
    let id=urlComplete[urlComplete.length-1];
    let newPassword=document.getElementById('newPassword').value;
    let confirmPassword=document.getElementById('confirmPassword').value;
    if(newPassword===confirmPassword){
     
        axios.post(`http://localhost:3000/password/updatePassword/${id}`,{password:newPassword}).then(result=>{
        alert('Password Changed Successfully');
        window.location.href='../../login/login.html';
        
        console.log(result)})
        .catch(err=>console.log(err))
    }
   
    console.log(id)
})