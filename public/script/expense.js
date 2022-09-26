const expenseList=document.getElementById('expense-list');

document.getElementsByClassName('btn')[0].addEventListener('click',(e)=>{
    e.preventDefault()
    const description=document.getElementById('inputDescription').value;
    const category=document.getElementById('inputCategory').value;
    const money=document.getElementById('inputPrice').value;

    const obj={
        description,
        category,
        money
    }
    axios.post('http://localhost:3000/expense/AddExpense',obj).then(result=>{
        console.log('user added')
        console.log(result)
        if(result.status==200)
        alert(`${result.data.message}`);
        const obj1=result.data.obj;
        console.log(obj1)
        showExpenseinUI(obj1)
        
        
        
    }).catch(err=>{
        if(err.response.status==401){
            alert(`${err.response.data.message}`);
        }

    });
})


window.addEventListener('DOMContentLoaded',()=>{
    
    axios.get('http://localhost:3000/expense/getExpense').then(data=>{
        console.log(data);
        var temp=data.data;
        temp.forEach(ele=>{
            showExpenseinUI(ele)
        })
    }).catch(err=>console.log(err))
})



function showExpenseinUI(obj){
        console.log('showExpenseinUI inside')
        console.log(obj);
        var description=obj.description;
        var price=obj.money;
        var category=obj.category;
        var id=obj.id
        
        
        var temp=document.createElement('div');
        temp.setAttribute('class',"d-flex justify-content-between border-bottom border-dark p-2");
        temp.setAttribute('id',`expense-${id}`)
        temp.innerHTML=`<div class="p-2">${description}</div>
        <div class="p-2">${category}</div>
        <div class="p-2">${price}</div>
        <button type="button" class="btn btn-danger" onclick='deleteExpense(${id})'>Remove</button>`;
        
        console.log(expenseList)
        expenseList.appendChild(temp);
       

}

function deleteExpense(id){
     axios.delete(`http://localhost:3000/expense/deleteExpense/${id}`).then(result=>{
         removeExpenseinUI(id)
     }).catch(err=>console.log(err))
}

function removeExpenseinUI(id){
    const expenseId=`expense-${id}`;
    document.getElementById(expenseId).remove();

}