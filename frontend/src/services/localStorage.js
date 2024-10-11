export const setStorage = (typeStorage, value) => {
    if (typeStorage) {  // Verifica se o parâmetro 'typeStorage' foi passado
        switch (typeStorage) {  // Escolhe qual tipo de dado armazenar no localStorage
            case 'token':
                window.localStorage.setItem('token', value); 
                break;
            case 'id':
                window.localStorage.setItem('id', value);  
                break;
            case 'auth':
                window.localStorage.setItem('auth', value); 
                break;
            case 'permission':
                window.localStorage.setItem('permission', value); 
                break;
        }
    }
}

export const getStorage = (getValue) => {
    const storage = window.localStorage.getItem(getValue);
    return storage;
}

export const clearStorage = () => {
    window.localStorage.clear();
}
