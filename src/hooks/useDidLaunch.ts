// import { useEffect, useState } from "react";

// // Returns true if the `window.xnft` object is ready to be used.
// export function useDidLaunch() {
//   const [didConnect, setDidConnect] = useState(false);
//   useEffect(() => {
//     window.addEventListener("load", () => {
//       window.xnft.on("connect", () => {
//         setDidConnect(true);
//       });
//       window.xnft.on("disconnect", () => {
//         setDidConnect(false);
//       });
//     });
//   }, []);
//   return didConnect;
// }
