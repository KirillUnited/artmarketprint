import { Input } from '@heroui/input';

export const UsernameInput = ({ ...props }) => (
    <Input
        isRequired
        color="primary"
        errorMessage="Пожалуйста, введите Ваше имя"
        id='user_name'
        label="Имя"
        labelPlacement='outside'
        name='user_name'
        placeholder="Напишите Ваше имя"
        radius='sm'
        variant="bordered"
    />
);