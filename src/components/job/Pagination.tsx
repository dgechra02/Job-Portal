// import { useCustomHook } from "@/contexts/AppContext";
// import React from "react";

// export default function Pagination() {
//   const arr = [1, 2, 3, 4, 5, 6];
//   const { currPage, setCurrPage } = useCustomHook();
//   return (
//     <div>
//       <button
//         onClick={() => {
//           currPage >= 1 && setCurrPage(currPage - 1);
//         }}
//         className={`${currPage == 1 && 'pointer-events-none opacity-50'} px-3 py-1.5 border bg-gray-100 hover:bg-gray-300 cursor-pointer`}
//       >
//         prev
//       </button>
//       {arr.map((num) => (
//         <button key={num} className={`${currPage == num && 'bg-gray-300'} px-3 py-1.5 border bg-gray-100 hover:bg-gray-300 focus:bg-gray-300 cursor-pointer`}
//         onClick={() => {
//           setCurrPage(num);
//         }}>
//           {num}
//         </button>
//       ))}
//       <button
//         onClick={() => {
//           currPage < 6 && setCurrPage(currPage + 1)
//         }}
//         className={`${currPage == 6 && 'pointer-events-none opacity-50'} px-3 py-1.5 border bg-gray-100 hover:bg-gray-300 cursor-pointer`}
//       >
//         next
//       </button>
//     </div>
//   );
// }
