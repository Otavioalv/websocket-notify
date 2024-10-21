import {InputHTMLAttributes} from "react"
import { IconType } from "react-icons"


export interface textFieldProps extends InputHTMLAttributes<HTMLInputElement>{
    icon: IconType,
    altIcon?: IconType
}