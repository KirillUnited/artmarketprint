import { Textarea } from '@heroui/input';

export const UserTextareaInput = ({ ...props }) => (
    <Textarea
        color="primary"
        id='comment'
        label="Комментарий"
        labelPlacement='outside'
        name='user_comment'
        placeholder="Введите Ваш комментарий"
        radius='sm'
        variant="bordered"
    />
);