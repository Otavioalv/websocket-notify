// Manipula as respostas pra retornar ao usuario

// Interface basica da resposta
interface ApiResponseInterface<T> {
    status: 'success' | 'error';
    message: string;
    results?: T;
    errors?: any;
}

// Retorna uma resposta de sucesso
const successResponse = <T>(message: string, results?: T):ApiResponseInterface<T> => ({
    status: "success",
    message: message,
    results
});

// Retorna uma resposta de erro
const errorResponse = (message: string, errors?:any): ApiResponseInterface<null> => ({
    status: "error",
    message: message, 
    errors: errors instanceof Error ? errors.message : errors
})

export {ApiResponseInterface, successResponse, errorResponse};