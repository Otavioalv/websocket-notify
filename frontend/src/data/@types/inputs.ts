import {InputHTMLAttributes} from "react"
import { IconType } from "react-icons"

export interface textFieldProps {
    type: 'text' | 'password',
    name: string,
    icon: IconType,
    altIcon?: IconType  /* altIcon: use if type is equal to 'password' */
}

export interface textFieldPropsTest extends InputHTMLAttributes<HTMLInputElement>{
    icon: IconType,
    altIcon?: IconType  /* altIcon: use if type is equal to 'password' */
}