const getStorage=name=>{
   return JSON.parse(localStorage.getItem(name))
}
const setSotrage=(name,val)=>{
    const tokenVal=JSON.stringify(val)
    localStorage.setItem(name,tokenVal)
}
const removeStorage=name=>{
    localStorage.removeItem(name)
}

const todoStorage={
    getStorage,setSotrage,removeStorage
}

export default todoStorage