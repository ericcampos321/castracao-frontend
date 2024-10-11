export const setStorage = (typeStorage, value) => {
    if (typeStorage) {  // Verifica se o parâmetro 'typeStorage' foi passado
        switch (typeStorage) {  // Escolhe qual tipo de dado armazenar no localStorage
            case 'token':
                window.localStorage.setItem('token', value);  // Armazena o 'value' com a chave 'token'
                break;
            case 'id':
                window.localStorage.setItem('id', value);  // Armazena o 'value' com a chave 'id'
                break;
            case 'auth':
                window.localStorage.setItem('auth', value);  // Armazena o 'value' com a chave 'auth'
                break;
            case 'permission':
                window.localStorage.setItem('permission', value);  // Armazena o 'value' com a chave 'permission'
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