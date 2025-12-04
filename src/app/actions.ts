// //@ts-nocheck
// "use server";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// const users = [
//   { email: "1@2", password: "2" },
//   { email: "new1@gmail.com", password: "12341" },
// ];

// export default async function handleSumbit(formData) {
//   const { email, password } = formData; // you are destructering formData means 
//   // formData is an object sent by onClick or onSubmit events

//   // const email = formData.get("email");
//   // const password = formData.get("password");
//   // it is used when formData is sent using action attribute
  
//   console.log(email, password);
//   const user = users.find(
//     (user) => user.email == email && user.password == password
//   );
//   if (user) {
//     const userCookies = await cookies();
//     userCookies.set("user", JSON.stringify(user));
//     redirect("/");
//   } else
//     return {
//       message: "invaild user",
//     }
// }