import { useState, useRef, useEffect } from "react";
import { Check, X } from "lucide-react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface RankOption {
  name: string;
  price: string;
  icon: React.ReactNode;
  features: string[];
  notIncluded?: string[];
  bulkDeal?: string;
  popular?: boolean;
}

const rankOptions: RankOption[] = [
  {
    name: "Новичок",
    price: "Бесплатно",
    icon: <Icon name="Sword" className="w-6 h-6" />,
    features: [
      "Доступ ко всем основным мирам",
      "1 приватный участок",
      "Базовый набор команд",
      "Общий чат и форум",
      "Участие в ивентах",
      "Стандартная скорость строительства",
    ],
    bulkDeal: "ЗАРЕГИСТРИРУЙСЯ И ПОЛУЧИ СТАРТОВЫЙ КИТ!",
  },
  {
    name: "Строитель",
    price: "299 руб/мес",
    icon: <Icon name="Hammer" className="w-6 h-6" />,
    features: [
      "Всё из тарифа Новичок",
      "3 приватных участка",
      "Цветной ник в чате",
      "Доступ к /fly в своих зонах",
      "Расширенный набор команд",
      "Приоритет при входе на сервер",
    ],
    popular: true,
  },
  {
    name: "Легенда",
    price: "599 руб/мес",
    icon: <Icon name="Crown" className="w-6 h-6" />,
    features: [
      "Всё из тарифа Строитель",
      "10 приватных участков",
      "Доступ к /fly везде",
      "Уникальный префикс [Легенда]",
      "Эксклюзивные косметика и питомцы",
    ],
    notIncluded: ["Без доступа к Creator-серверу"],
  },
  {
    name: "Creator",
    price: "999 руб/мес",
    icon: <Icon name="Star" className="w-6 h-6" />,
    features: [
      "Всё из тарифа Легенда",
      "Неограниченные приватные участки",
      "Доступ к эксклюзивному Creator-серверу",
      "Своя точка телепортации на сервере",
      "Участие в закрытых тест-сессиях",
      "Личный значок на сервере",
    ],
  },
];

const LicenseSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="licenses" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black"></div>

      <div className="container mx-auto px-4 relative">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Выбери свой ранг</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Открывай новые возможности и преимущества на сервере ZeroTime — выбери тариф под свой стиль игры
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rankOptions.map((option, index) => (
            <div
              key={option.name}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className={`relative h-full bg-black border-white/10 ${
                  hoveredCard === index ? "scale-105" : "scale-100"
                } transition-all duration-300`}
              >
                <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-br from-green-400/20 to-white/0">
                  <div className="absolute inset-0 rounded-lg bg-black"></div>
                </div>

                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-green-400 text-black px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                      Популярный
                    </span>
                  </div>
                )}

                <CardContent className="relative p-6 rounded-lg h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 rounded-full bg-zinc-900 border border-green-400/20 mb-4 text-green-400">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{option.name}</h3>
                    <div className="text-3xl font-bold text-green-400">{option.price}</div>
                  </div>

                  <div className="flex-grow">
                    <ul className="space-y-3 mb-6">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                          <span className="text-sm text-zinc-300">{feature}</span>
                        </li>
                      ))}
                      {option.notIncluded?.map((feature, i) => (
                        <li key={i} className="flex items-start text-zinc-500">
                          <X className="h-5 w-5 text-zinc-500 mr-2 shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {option.bulkDeal && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-green-400 bg-green-400/5 py-2 px-3 rounded-lg border border-green-400/20 animate-pulse">
                        {option.bulkDeal}
                      </p>
                    </div>
                  )}

                  <Button
                    className="w-full bg-green-400 text-black hover:bg-green-300 transition-colors font-bold"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Выбрать
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LicenseSection;
