import { B, Y } from "../mock/constants";
import { Fade } from "./primitives";

export default function ApplicationsSection() {
	const apps = [
		{ n: "01", title: "Реклама", desc: "Вывески, таблички, баннеры, указатели" },
		{ n: "02", title: "Сувениры", desc: "Корпоративные подарки и мерч-продукция" },
		{ n: "03", title: "Производство", desc: "Маркировка оборудования и деталей" },
		{ n: "04", title: "Интерьер", desc: "Декоративные панели и арт-объекты" },
		{ n: "05", title: "Выставки", desc: "Стенды, экспопродукция, POS-материалы" },
	];
	return (
		<section style={{ background: B, padding: "88px 0" }}>
			<div className="max-w-screen-xl mx-auto px-6">
				<Fade>
					<div className="flex items-center gap-3 mb-6">
						<span style={{ color: "#444", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>03</span>
						<span style={{ height: 1, width: 24, background: "#333", flexShrink: 0 }} />
						<span style={{ color: "#444", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>применение</span>
					</div>
					<h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>
						Где применяется
					</h2>
					<p style={{ color: "#666", marginBottom: 48, maxWidth: 520, lineHeight: 1.6 }}>
						Каждый сценарий — отдельная карточка с переходом в раздел каталога.
					</p>
				</Fade>
				<div className="grid md:grid-cols-5 gap-3">
					{apps.map((a, i) => (
						<Fade key={a.title} delay={i * 0.07}>
							<div
								style={{
									border: "1px solid #222", borderRadius: 16, padding: 24, cursor: "pointer",
									transition: "border-color .2s, background .2s",
								}}
							>
								<span style={{ fontSize: 11, fontWeight: 700, color: "#444", fontVariantNumeric: "tabular-nums" }}>{a.n}</span>
								<h3 style={{ marginTop: 48, fontSize: 20, fontWeight: 700, color: "#fff" }}>{a.title}</h3>
								<p style={{ marginTop: 8, fontSize: 13, color: "#666", lineHeight: 1.5 }}>{a.desc}</p>
							</div>
						</Fade>
					))}
				</div>
			</div>
		</section>
	);
}