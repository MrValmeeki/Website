import { ImageResponse } from "next/og";
export const alt = "Atharv Babu — Games, simulations, and apps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
 return new ImageResponse(
  <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",background:"#eeeee6",color:"#23251e",padding:"55px 68px",fontFamily:"sans-serif"}}>
   <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #c9cbbf",paddingBottom:24}}><span style={{fontSize:40,fontWeight:700,letterSpacing:-3}}>ab.</span><span style={{fontSize:17,letterSpacing:2}}>ROBOTICS & AI STUDENT</span></div>
   <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"space-between"}}>
    <div style={{display:"flex",flexDirection:"column"}}><span style={{fontSize:98,letterSpacing:-6,lineHeight:1.1}}>Atharv Babu</span><span style={{fontSize:35,color:"#aa3d21",marginTop:22}}>A few things I’ve been building.</span></div>
    <div style={{display:"flex",position:"relative",width:230,height:230,alignItems:"center",justifyContent:"center",borderRadius:115,background:"#95a5a6"}}><svg width="180" height="180" viewBox="0 0 180 180"><g stroke="#df542f" strokeWidth="10"><path d="M90 16v148M16 90h148M38 38l104 104M38 142 142 38"/></g></svg></div>
   </div>
   <div style={{display:"flex",justifyContent:"space-between",fontSize:18,borderTop:"1px solid #c9cbbf",paddingTop:22}}><span>Games, physics simulations, and apps.</span><span>SELECTED WORK ↗</span></div>
  </div>, size
 );
}
