import Link from "next/link";
export default function Home() {
  return (
  <>
    <main className="main-two">
      <div className="heading">
        FOR VALOR
      </div>
      <div className="subheading">
        Fight for fame, fight for glory, fight for valor
      </div>
      <div className="flex justify-between items-center my-10">
        <Link href={"/updates"}>
          <button className="homepage-button">
            UPDATES
          </button>
        </Link>
        <Link href={"/getgame"}>
          <button className="homepage-button">
            GET GAME
          </button>
        </Link>
      </div>
    </main>
    
  </>
  );
}
