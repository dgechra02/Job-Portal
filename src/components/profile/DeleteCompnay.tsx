import React from 'react'

export default function DeleteCompnay({id} : { id : String}) {

 async function handleDelete(){
    const res = await fetch("/api/company/"+id, { // ye client side hai to domain name dene ki need nhi hai
        method : "DELETE"
    });
    const data = await res.json();
    if(data?.success){
        console.log("company deleted")
    } else {
        console.log("deleting company failed")
    }
 }
  return (
    <div>
      <button>Delete company</button>
    </div>
  )
}

// make upadte company page
