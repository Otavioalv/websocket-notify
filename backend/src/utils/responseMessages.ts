

type statusKey = {
    // Error
    readonly InternalServerError: string,
    readonly InvalidParameters: string,
    readonly ErrorCreatingUser: string, 
    readonly ErrorGenerateImage: string,
    readonly ErrorListUser: string,
    readonly ErrorListMessage: string,
    readonly ErrorSaveMessag: string,
    readonly ErrorSaveImage: string,
    readonly ErrorVerifyImage: string,
    readonly ErrorUpdateUser: string, 

    // Problems
    readonly UserAlreadyExists: string,
    readonly MandatoryParameters: string,
    readonly UserDontExists: string,
    readonly IncorrecPassword: string,  
    readonly InsertImage: string,
    readonly InsertName: string,
    readonly InsertPassword: string,
    readonly MinCharacterPassws: string,
    readonly MaxCharacterPassws: string,
    readonly MinCharacterName: string,
    readonly MaxCharacterName: string,
    readonly UserAuthenticationProblem: string,
    readonly InaccessibleRoute: string,

    // Success
    readonly UserCreatingSuccess: string,
    readonly LoginSuccessful: string
    readonly LogoutSuccessful: string,
    readonly UserListSuccessful: string,
    readonly MessageListSuccessful: string,
    readonly ImageSaveSuccessful: string,
    readonly UserUpdateSuccessful: string,

    // Inform
    readonly UserInformation: string,


}

export const responseMessages:statusKey = {
    // Error
    InternalServerError: "Erro interno no servidor",
    InvalidParameters: "Parâmetros inválidos",
    ErrorCreatingUser: "Erro ao criar usuário",
    ErrorGenerateImage: "Erro ao gerar dados de imagem",
    ErrorListUser: "Erro ao listar usuários",
    ErrorListMessage: "Erro ao listar mensagem",
    ErrorSaveImage: "Erro ao salvar imagem no banco de dados",
    ErrorSaveMessag: "Erro ao salvar mensagem",
    ErrorVerifyImage: "Erro ao verificar imagem",
    ErrorUpdateUser: "Erro ao atualizar usuário",
    
    // Problems
    UserAlreadyExists: "Usuário já existe",
    MandatoryParameters: "Insira os parâmetros corretamente",
    UserDontExists: "Usuário não existe",
    IncorrecPassword: "Senha incorreta",
    InsertImage: "Insira uma imagem",
    InsertName: "Insira um nome",
    InsertPassword: "Insira uma senha",
    MinCharacterPassws: "Senha deve conter no mínimo 8 caracteres",
    MaxCharacterPassws: "Senha deve conter no máximo 10 caracteres",
    MinCharacterName: "Nome deve conter no mínimo 2 caracteres",
    MaxCharacterName: "Nome deve conter no máximo 500 caracteres",
    UserAuthenticationProblem: "Você não tem autorização para acessar esse conteúdo",
    InaccessibleRoute: "Rota inacessível",

    // Success
    UserCreatingSuccess: "Usuário criado com sucesso",
    LoginSuccessful: "Login realizado com sucesso",
    LogoutSuccessful: "LogOut realizado com sucesso",
    UserListSuccessful: "Usuário listado com sucesso",
    MessageListSuccessful: "Menssagem listada com sucesso",
    ImageSaveSuccessful: "Imagem salva com sucesso",
    UserUpdateSuccessful: "Usuário atualizado com sucesso",
    
    // Inform
    UserInformation: "Informações do usuário",

    
}   