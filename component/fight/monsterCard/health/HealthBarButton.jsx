import { PlusIcon, MinusIcon } from '@heroicons/react/16/solid';
import { Button } from 'flowbite-react';

export default function HealthBarButton({ updateHealth, color, icon }) {
    return (
        <Button onClick={updateHealth} color={color} size="xs" pill>
            {icon === '-' ? <MinusIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
        </Button>
    );
}
