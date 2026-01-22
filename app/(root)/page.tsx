import Link from "next/link"
import Image from "next/image";

export default function Home() {
  return (
  <>
    <main className="main">
      <h1 className="heading">
        FOR VALOR
      </h1>

      <div className="subheading">
        Fight for fame, fight for glory, fight for valor.
      </div>

      <div className="flex justify-between items-center my-10">
        <Link href={"/updates"}>

          {/* Povezava do posodobitev */}
          <button className="homepage-button cursor-pointer">
            UPDATES
          </button>

        </Link>

        <Link href={"/getgame"}>

          {/* Povezava do strani za prenos igre */}
          <button className="homepage-button cursor-pointer">
            GET GAME
          </button>

        </Link>
      </div>

      <div className="flex-col justify-between items-center my-10 md:px-30 px-5 bg-primary p-10">

        <h2 className="text-2xl md:text-4xl text-textprimary py-4">
          About
        </h2>

        <div className="text-textprimary">
          <div className="py-3">
            For Valor is a free-to-play real-time strategy game inspired by Mount & Blade: Bannerlord and Manor Lords. The game focuses on tactical decision-making, army management, and economic growth, combining large-scale battles with strategic planning. You take the role of a commander who must carefully manage soldiers, formations, and resources while facing a challenging enemy AI.
          </div>

          <div className="py-3">
            Your main objective is simple but demanding: destroy the enemy’s castle while successfully defending your own. Every battle requires preparation, smart positioning, and the right use of units. Poor decisions can quickly lead to defeat, while good planning can turn even a weaker army into a winning force.
          </div>

          <div className="py-3">
            The game offers a wide range of strategic possibilities. You are free to experiment with different formations, unit compositions, and economic approaches. There is no single correct way to win — aggressive attacks, defensive playstyles, or long-term economic dominance are all viable paths to victory.
          </div>

          <div className="py-3">
            The economy plays a crucial role in For Valor. It is based on building and upgrading structures that generate income over time. Strong economic management allows you to recruit better armies, reinforce your losses faster, and maintain pressure on your opponent throughout the match. Neglecting your economy will leave you vulnerable, even if your army is strong early on.
          </div>

          <div className="py-3">
            <h3>
              What are we doing?
            </h3>

            <div>
              We are making the game for research project in school. We are using unity hub to make the game, and blender to make the models. We are doing our best to make the game in time and ready to play.
            </div>

          </div>
        </div>

        <ul className="text-xl text-textprimary bg-secondary w-fit p-5 rounded-xl">
          <li>Author: Mateo Žuran</li>
          <li>Release date: 20.02.2025</li>
          <li>Contact: zuran.mateo@scv.si</li>
        </ul>
        <Image 
          src="/formationExample.png" 
          alt="formation example" 
          width={500} 
          height={500} 
          className="md:py-4 py-2 px-1 md:px-10 rounded-2xl md:w-[1000px] w-[450px]"
        />
      </div>
    </main>
    
  </>
  );
}
