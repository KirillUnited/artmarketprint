export const scrollTo = (selectorId: string) => {
    if (typeof window !== 'undefined') {
        window.scrollTo({
            top: document.getElementById(selectorId)?.offsetTop || 0,
            behavior: 'smooth'
        });
    }
}