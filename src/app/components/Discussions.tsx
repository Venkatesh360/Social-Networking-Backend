
function Discussions() {
  return (
    <div className="flex bg-red-300 h-full p-2" >
    <img height="100" src="https://img.icons8.com/stickers/100/user.png" alt="user"/> 
    <div className="flex flex-col h-full w-full">
    <span className="w-full h-[60%] bg-white" ></span>
    <button className="h-8 border-2 bg-blue-400 hover:bg-blue-800 ">Join Discussion</button>
    </div>
  
    </div>
  )
}

export default Discussions