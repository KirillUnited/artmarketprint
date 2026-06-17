// Blog Layout - shared wrapper for all blog pages
import Section from '@/components/layout/Section';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
	return <Section innerClassname='pt-6 md:pt-10'>{children}</Section>;
}
