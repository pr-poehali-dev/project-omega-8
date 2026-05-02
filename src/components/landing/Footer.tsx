import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="bg-black py-8 border-t border-green-400/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-xl font-bold text-white">
              <span className="text-green-400">Zero</span>Time
            </p>
            <p className="text-zinc-400 text-sm mt-1">
              &copy; {new Date().getFullYear()} ZeroTime. Все права защищены.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-zinc-400 hover:text-green-400 transition-colors"
              aria-label="VK"
            >
              <Icon name="MessageCircle" />
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-green-400 transition-colors"
              aria-label="Telegram"
            >
              <Icon name="Send" />
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-green-400 transition-colors"
              aria-label="Discord"
            >
              <Icon name="Gamepad2" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
