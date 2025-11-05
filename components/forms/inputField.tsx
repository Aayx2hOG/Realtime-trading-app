import { cn } from "@/lib/utils"
import { Label } from "../ui/label"

export const InputField = ({ name, label, placeholder, type = "text", register, error, validation, disabled, value }: FormInputProps) => {
    return (
        <div className="space-y-2 ">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>
            <input
                id={name}
                placeholder={placeholder}
                type={type}
                {...register(name, validation)}
                className={cn('form-input', { 'opacity-50 cursor-not-allowed': disabled }, 'w-full')}
                disabled={disabled}
                value={value}
            />
            {error && <span className="text-red-500">{error.message}</span>}
        </div>
    )
}