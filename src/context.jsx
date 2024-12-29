import { createContext, useState } from "react";
import { run } from './server'

export const Context = createContext();
const ContextProvider = (props) =>{
     const [input , setinput] = useState("");
     const [recentprompt , setrecentprompt] = useState("");
     const [prevprompts , setprevprompts] = useState([]);
     const [showresult , setshowresult] = useState(false);
     const [loading , setloading] = useState(false);
     const [resultdata , setresultdata] = useState("");

     const delaypara = (index,nextword) =>{
        setTimeout(function (){
           setresultdata(prev => prev + nextword);
        },75*index)
     }
     const newchat =()=>{
          setloading(false)
          setshowresult(false)
     }

     const onsent = async (prompt) =>{
          setresultdata("");
          setloading(true)
          setshowresult(true)
          setinput("")
          let response 
          if(prompt != undefined){
             response = await run(prompt)
             setrecentprompt(prompt)
          }else{
               setprevprompts(prev => [...prev,input])
               setrecentprompt(input)
               response = await run(input)
          }
          
          let responsearray = response.split("**");
          let newresponse = "";
          for(let i = 0; i < responsearray.length; i++ ){
               if(i == 0 || i%2 !== 1){
                    newresponse += responsearray[i];
               }else{
                    newresponse += "<b>"+responsearray[i]+"</b>"
               }
          }
          let newresponse2 = newresponse.split("*").join("</br>")
          let newresponsearray = newresponse2.split(" ");
          for(let i =0; i<newresponsearray.length; i++){
               const nextword = newresponsearray[i];
               delaypara(i,nextword+" ")
          }
          setloading(false)
     }
     
     const contextValue = {
          prevprompts,
          setprevprompts,
          onsent,
          setrecentprompt,
          recentprompt,
          showresult,
          loading,
          resultdata,
          input,
          setinput,
          newchat

     }
     return (
          <Context.Provider value={contextValue}>
                 {props.children}
          </Context.Provider>
     )
}

export default ContextProvider