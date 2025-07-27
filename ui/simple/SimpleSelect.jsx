import { Select, Label } from 'flowbite-react';

export default function SimpleSelect({ label, options, onChange }) {
    return (
        <div className="max-w">
            <div className="mb-2 block">
                <Label htmlFor={label}>{label}</Label>
            </div>
            <Select id={label}>
                {options.map(option => (
                    <option id={option.id}>{option.label}</option>
                ))}
            </Select>
        </div>
    );
}
