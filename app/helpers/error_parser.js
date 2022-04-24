module.exports = (error) => {
    const errors = []

    if(error && error.errors){
        for(const e of Object.values(error.errors)){
            errors.push(e.message)
        }
    }
    
    return errors.length ? errors : ['Não foi possível finalizar essa operação, Ocorreu um erro no processo!']
}