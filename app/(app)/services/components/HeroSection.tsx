import { ArrowRight, Check, Clock, PackageCheck, Star } from "lucide-react";
import { B, BORDER, MUTED, Y } from "../mock/constants";
import { service } from "../mock/data";
import { BtnDark, BtnPrimary, Card, YellowTag } from "./primitives";

export default function HeroSection() {
	return (
		<section style={{ borderBottom: `1px solid ${BORDER}` }}>
			<div className="max-w-screen-xl mx-auto px-6" style={{ paddingTop: 72, paddingBottom: 80 }}>
				<div className="grid md:grid-cols-12 gap-10 items-center">
					{/* Left — 7 cols */}
					<div className="md:col-span-7">
						<nav style={{ fontSize: 13, color: MUTED, marginBottom: 32 }}>
							Главная <span style={{ margin: "0 8px" }}>/</span> Услуги <span style={{ margin: "0 8px" }}>/</span>
							<span style={{ color: B }}>{service.name}</span>
						</nav>
						<YellowTag><Check className="size-3" /> Собственное производство · Москва</YellowTag>
						<h1
							style={{
								marginTop: 24, fontSize: "clamp(40px,5vw,64px)",
								fontWeight: 900, lineHeight: 1.04, color: B, letterSpacing: "-0.02em",
							}}
						>
							{service.name}<br />
							<span style={{ color: MUTED, fontWeight: 400 }}>для бизнеса</span>
						</h1>
						<p style={{ marginTop: 24, fontSize: 18, color: "#555", lineHeight: 1.7, maxWidth: 520 }}>
							{service.hero.description}
						</p>
						<div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
							<BtnPrimary href="#calculator">Получить расчёт <ArrowRight className="size-4" /></BtnPrimary>
							<BtnDark href="#contacts">Заказать услугу</BtnDark>
						</div>
						{/* Stats row */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ marginTop: 40 }}>
							{([
								[Star, service.hero.rating, "рейтинг"],
								[Clock, service.hero.term, "срок изготовления"],
								[PackageCheck, service.hero.min, "минимальный тираж"],
								[Check, "6 подложек", "материалов"],
							] as [React.ElementType, string, string][]).map(([Icon, val, label]) => (
								<Card key={label} style={{ padding: 16 }}>
									<Icon style={{ width: 16, height: 16, color: Y, marginBottom: 8 }} />
									<p style={{ fontWeight: 700, fontSize: 14, color: B }}>{val}</p>
									<p style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{label}</p>
								</Card>
							))}
						</div>
					</div>

					{/* Right — 5 cols */}
					<div className="md:col-span-5 relative mt-8 md:mt-0">
						<img
							src={service.hero.image}
							alt="Производство ArtMarketPrint"
							style={{ width: "100%", height: 480, objectFit: "cover", borderRadius: 24, display: "block" }}
						/>
						{/* Floating badge */}
						<div
							style={{
								position: "absolute", bottom: -16, left: -16,
								background: Y, borderRadius: 16, padding: "16px 20px",
								boxShadow: "0 8px 32px rgba(0,0,0,.12)",
							}}
						>
							<p style={{ fontSize: 10, fontWeight: 700, color: B, textTransform: "uppercase", letterSpacing: "0.1em" }}>Срочный запуск</p>
							<p style={{ fontSize: 28, fontWeight: 900, color: B, lineHeight: 1, marginTop: 4 }}>24 ч</p>
							<p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>после утверждения макета</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}