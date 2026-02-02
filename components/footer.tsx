import Image from "next/image";

export default function Footer(){
  return (
    <main className="footer">
        <Image 
          src="/logo-round.png"
          alt="logo" 
          width={75} 
          height={75} 
        />

        <div className="text-xl px-5">
            © 2025 Mateo Žuran. All rights reserved. For Valor is an indie strategy game, and all content—including design, art, models, and audio—is original work by the creator. All trademarks belong to their respective owners.
        </div>
        
        <div className="text-xl min-w-[350px]">
            <div>contact support:</div>
            <div>zuranmateo@gmail.com</div>
        </div>
    </main>
  )
}
