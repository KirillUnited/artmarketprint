import { ServiceSearch } from "@/components/ServiceSearch";
import { Button } from "@heroui/button";
import Link from "next/link";

export default function ServiceSearchPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Поиск услуг</h1>
        <p className="text-muted-foreground mb-8">
          Найдите нужную услугу быстро и удобно
        </p>

        <div className="bg-card rounded-lg border p-6 mb-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <ServiceSearch />

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Или перейдите к <Link href="/services" className="text-primary hover:underline">всем услугам</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Быстрый поиск</h3>
            <p className="text-sm text-muted-foreground">
              Мгновенные результаты по всем вашим запросам
            </p>
          </div>

          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Актуальные данные</h3>
            <p className="text-sm text-muted-foreground">
              Всегда свежая информация о наших услугах
            </p>
          </div>

          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Удобная навигация</h3>
            <p className="text-sm text-muted-foreground">
              Простой интерфейс с возможностью сортировки
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}