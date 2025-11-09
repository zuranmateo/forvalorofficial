import Link from "next/link";
export default function Home() {
  return (
  <>
    <main className="main">
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
        <Link href={"/buygame"}>
          <button className="homepage-button">
            BUY GAME
          </button>
        </Link>
      </div>
    </main>
    
  </>
  );
}
