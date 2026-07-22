'use client';

import { Button } from '@heroui/react';
import { Form } from '@heroui/form';
import { Textarea } from '@heroui/input';
import { FileText, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { toast } from 'sonner';

import { sendServiceOrderRequest } from '@/lib/actions/order.actions';
import { UserPhoneInput, UsernameInput } from '@/components/ui/form';

import { B, BORDER, CARD, MUTED, Y } from '../mock/constants';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

type ServiceOrderMessageFormProps = {
  serviceTitle?: string;
};

export default function ServiceOrderMessageForm({ serviceTitle }: ServiceOrderMessageFormProps) {
  const router = useRouter();
  const [phoneValid, setPhoneValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setFileError('');
    setFileName('');

    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError('Загрузите PDF, JPG или PNG');
      event.target.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('Файл должен быть не больше 5 МБ');
      event.target.value = '';
      return;
    }

    setFileName(file.name);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (fileError) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);

    try {
      const result = await sendServiceOrderRequest(formData);

      if (!result?.ok) {
        toast.error(result?.error || 'Не удалось отправить заявку');
        return;
      }

      form.reset();
      setFileName('');
      setPhoneValid(false);
      toast.success('Заявка отправлена');
      router.push('/success');
    } catch (error) {
      console.error(error);
      toast.error('Не удалось отправить заявку');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 24,
        padding: 32,
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: MUTED,
          marginBottom: 12,
        }}
      >
        Отправить заявку
      </p>
      <h3 style={{ fontSize: 26, fontWeight: 800, color: B, marginBottom: 10 }}>
        Приложите макет или опишите задачу
      </h3>
      <p className="text-muted mb-6 text-sm">
        Оставьте контакты, а макет и комментарий можно добавить при необходимости.
      </p>
      <Form className="items-stretch gap-5" validationBehavior="native" onSubmit={handleSubmit}>
        <input name="service_title" type="hidden" value={serviceTitle || 'Страница услуг'} />
        <UsernameInput />
        <UserPhoneInput validPhone={setPhoneValid} />
        <Textarea
          color="default"
          label="Комментарий"
          labelPlacement="outside"
          minRows={4}
          name="user_comment"
          placeholder="Опишите задачу, тираж, размеры, материалы или сроки"
          radius="sm"
          variant="bordered"
        />
        <div className="w-full">
          <input
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            className="sr-only"
            id="layout-file"
            name="layout_file"
            type="file"
            onChange={handleFileChange}
          />
          <label
            className="rounded-small hover:border-primary focus-within:border-primary flex cursor-pointer items-center gap-4 border-2 border-dashed px-4 py-4 transition-colors"
            htmlFor="layout-file"
            style={{ borderColor: fileError ? '#ef4444' : BORDER }}
          >
            <span
              className="rounded-small grid h-11 w-11 shrink-0 place-items-center"
              style={{ background: '#FFF8CC', color: B }}
            >
              {fileName ? <FileText size={20} /> : <Upload size={20} />}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold" style={{ color: B }}>
                {fileName || 'Добавить файл с макетом'}
              </span>
              <span className="block text-xs" style={{ color: MUTED }}>
                PDF, JPG или PNG до 5 МБ
              </span>
            </span>
          </label>
          {fileError && <p className="text-danger mt-1 text-xs">{fileError}</p>}
        </div>
        <Button
          className="w-full"
          variant="primary"
          isDisabled={!phoneValid || isSubmitting || Boolean(fileError)}
          isPending={isSubmitting}
          type="submit"
          size="lg"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </Button>
      </Form>
    </div>
  );
}
