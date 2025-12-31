import { useNavigate } from "react-router";
import { Card } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Period Tracker",
      description: "Track your menstrual cycle and fertile window.",
      route: "/period-tracker",
    },
    {
      title: "Salah Counter",
      description: "Track your pending salah.",
      route: "/salah-counter",
    },
    {
      title: "Todo",
      description: "Daily tasks",
      route: "/todo",
    },
    {
      title: "Groceries",
      description: "Daily purchases",
      route: "/groceries",
    },
    {
      title: "Chat",
      description: "Secret messages",
      route: "/chat",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">Welcome</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            onClick={() => navigate(card.route)}
            className="cursor-pointer hover:shadow-lg transition-shadow p-6"
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-gray-600">{card.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
