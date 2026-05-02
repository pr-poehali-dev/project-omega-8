import { useRef, useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const achievements = [
  { icon: <Icon name="Calendar" className="w-6 h-6" />, label: "Лет в работе", value: "3+" },
  { icon: <Icon name="Users" className="w-6 h-6" />, label: "Игроков за всё время", value: "10К+" },
  { icon: <Icon name="Map" className="w-6 h-6" />, label: "Уникальных миров", value: "10+" },
  { icon: <Icon name="Shield" className="w-6 h-6" />, label: "Защита от гриферов", value: "100%" },
];

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={ref} id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: `translateY(${(1 - scrollProgress) * 50}px)` }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-white/0 rounded-3xl transform -rotate-6"></div>
            <div className="w-full aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl relative z-10 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center">
                  <Icon name="Sword" className="w-16 h-16 text-white" />
                </div>
                <p className="text-zinc-400 text-lg">Логотип ZeroTime</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">О сервере <span className="text-green-400">ZeroTime</span></h2>
            <p className="text-lg mb-6 text-zinc-300">
              ZeroTime — это не просто Minecraft сервер, это живое сообщество игроков, где каждый
              найдёт своё место. Уникальная экономика, собственные моды и активные администраторы
              делают каждый день на сервере незабываемым приключением.
            </p>
            <p className="text-lg mb-8 text-zinc-300">
              Мы создали мир, где время работает на тебя: быстрый старт, честная игра и регулярные
              ивенты с крутыми призами. Присоединяйся — и стань частью легенды ZeroTime!
            </p>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.label}
                  className={`bg-zinc-900/50 rounded-lg p-4 border border-green-400/10 transition-all duration-500 hover:border-green-400/30 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-2">
                    <div className="mr-2 text-green-400">{achievement.icon}</div>
                    <div className="text-2xl font-bold text-white">{achievement.value}</div>
                  </div>
                  <div className="text-sm text-zinc-400">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
