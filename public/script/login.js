
document.getElementsByClassName('btn')[0].addEventListener('click',(e)=>{
    e.preventDefault();
    const userMail=document.getElementById('exampleInputEmail1').value;
    const userPassword=document.getElementById('exampleInputPassword1').value;
    const obj={
        userMail,
        userPassword
    }

   axios.post('http://localhost:3000/login',obj).then(result=>{
       console.log(result);
       console.log(result.data.message)
      if(result.status==200){
        alert(`${result.data.message}`);
      }
  
      document.getElementById('exampleInputEmail1').value='';
      document.getElementById('exampleInputPassword1').value='';  
      localStorage.setItem('token',result.data.token)

      window.location.href='../expense/expense.html'
      
   }).catch(err=>{
    console.log(err)
      if(err.response.status==401 || err.response.status==404){
        alert(`${err.response.data.message}`);
      }
       
   })
})