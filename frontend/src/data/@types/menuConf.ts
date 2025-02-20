interface keysFromOpcListInterface {
    router: string,
    handleFunction?: () => void
}

export interface opcListInterface extends Record<string, keysFromOpcListInterface>{
}