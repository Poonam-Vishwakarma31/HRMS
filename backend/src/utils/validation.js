export const ValidateFields = (...value)=>{
    for(let i=0; i<value.length; i++){
        if( !value[i]  || value[i].trim() === "" ){
            return false
        }
    }
    return true
}