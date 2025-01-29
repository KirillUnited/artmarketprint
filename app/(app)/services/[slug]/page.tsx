import BrandForm from "@/components/ui/BrandForm";
import Image from "next/image";
import { Image as HeroImage } from "@heroui/image";
import { siteConfig } from "@/config/site";
import BaseBreadcrumb from "@/components/ui/Breadcrumb";
import BrandButton from "@/components/ui/BrandButton";

type Props = {
    slug: string
}

export function generateStaticParams() {
    return siteConfig?.serviceSection?.items.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Props> }) {
    const { slug: paramsSlug } = await params;
    const data = siteConfig.serviceSection.items.find(({ slug }) => slug === paramsSlug);
    const { title = '', description = '', keywords = '' } = data?.seo || {};

    return {
        title: `${title || ''}`,
        description: `${description}`,
        keywords: `${keywords}`,
        openGraph: {
            title: `${title || ''}`,
            description: `${description}`,
            images: '/apple-touch-icon.png'
        }
    }
}
export default async function ServicePage({ params }: { params: Promise<Props> }) {
    const { slug: paramsSlug } = await params;

    const data = siteConfig.serviceSection.items.find(({ slug }) => slug === paramsSlug);
    const { title = '', description = '', price = '', image = '', href = '', slug = '' } = data || {};

    return (
        <>
            <section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
                <Image
                    priority
                    src={`${image}`}
                    alt={title}
                    className="absolute inset-0 object-cover w-full h-full"
                    width={1920}
                    height={1080}
                />
                <div className="container flex flex-col gap-10 max-w-2xl relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-background sm:text-5xl">
                            {title}
                        </h1>
                        <p className="mt-4 text-xl text-white">
                            {description}
                        </p>
                    </div>

                    <BrandButton state="primary" className={'self-center'}>ЗАКАЗАТЬ</BrandButton>
                </div>
            </section>
            <section className="py-16">
                <div className="container flex flex-col gap-16">
                    <div className="flex flex-col gap-4">
                        <BaseBreadcrumb />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">О услуге</h2>
                        <p className="text-gray-600">
                            УФ-печать — это современная технология, которая позволяет наносить изображения на различные материалы, такие как пластик, стекло, металл, дерево и другие. Благодаря использованию ультрафиолетовых ламп, краска мгновенно затвердевает, что обеспечивает высокое качество и долговечность изображения.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Преимущества</h2>
                        <ul className="space-y-2 text-gray-600">
                            <li><span className="text-primary font-bold">✔</span> Высокое качество печати</li>
                            <li><span className="text-primary font-bold">✔</span> Возможность печати на различных материалах</li>
                            <li><span className="text-primary font-bold">✔</span> Быстрое затвердевание краски</li>
                            <li><span className="text-primary font-bold">✔</span> Устойчивость к внешним воздействиям</li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Технологический процесс</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white p-6 rounded-sm shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900">1. Подготовка макета</h3>
                                <p className="mt-2 text-gray-600">
                                    Наши дизайнеры создают или адаптируют макет под требования заказчика. Мы работаем с векторной графикой для обеспечения высокого качества печати.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-sm shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900">2. Подготовка поверхности</h3>
                                <p className="mt-2 text-gray-600">
                                    Поверхность материала тщательно очищается и обезжиривается для обеспечения лучшего сцепления краски с основой.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-sm shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900">3. Нанесение изображения</h3>
                                <p className="mt-2 text-gray-600">
                                    Специальный принтер наносит изображение на поверхность с использованием УФ-чернил. Краска распределяется тонким слоем для точной передачи деталей.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-sm shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900">4. УФ-сушка</h3>
                                <p className="mt-2 text-gray-600">
                                    Сразу после нанесения изображения материал проходит под ультрафиолетовыми лампами. УФ-излучение мгновенно затвердевает краску, делая изображение устойчивым к внешним воздействиям.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-sm shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900">5. Контроль качества</h3>
                                <p className="mt-2 text-gray-600">
                                    Готовое изделие проверяется на соответствие стандартам качества. Мы гарантируем, что каждый заказ будет выполнен на высшем уровне.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Примеры работ</h2>
                        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <HeroImage loading="lazy" isZoomed src="/images/social-1.jpg" alt="Пример работы" width={'100%'} height={300} className="w-full" />
                            <HeroImage loading="lazy" isZoomed src="/images/social-3.jpg" alt="Пример работы" width={'100%'} height={300} className="w-full" />
                            <HeroImage loading="lazy" isZoomed src="/images/social-2.jpg" alt="Пример работы" width={'100%'} height={300} className="w-full" />
                        </div>
                    </div>

                    <div className="w-full max-w-2xl self-center">
                        <BrandForm />
                    </div>
                </div>
            </section>
        </>
    );
}