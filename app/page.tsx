import Productlist from "@/app/product/[slug]/Productlist";



export default function Home() {
 
  return (
    <div >
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
            <Productlist/>
      </div>
    </div>
  );
}
