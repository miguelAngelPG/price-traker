import HeroCarousel from "@/components/HeroCarousel";
import { ProductCard } from "@/components/ProductCard";
import Searchbar from "@/components/Searchbar";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";

export default async function Home() {

    const allProducts = await getAllProducts()

    return (
        <>
            <section className='px-6 md:px-20 py-24'>
                <div className="flex max-xl:flex-col gap-16">
                    <div className="flex flex-col justify-center">
                        <p className="small-text">
                            Smart Shopping Starts Here:
                            <Image
                                src="/assets/icons/arrow-right.svg"
                                alt="Arrow Right"
                                width={16}
                                height={16}
                            />
                        </p>

                        <h1 className="head-text">
                            Unleast the Power of 
                            <span className="text-primary"> PriceTracking</span>
                        </h1>

                        <p className="mt-6">
                            Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
                        </p>

                        <Searchbar/>
                    </div>

                    <HeroCarousel/>
                </div>
            </section>

            <section className="trending-section">
                <h2 className="section-text">Trending</h2>

                <div className="flex flex-wrap gap-8 gap-y-16">
                    {
                        allProducts?.map((product) => (
                            <div
                                key={product}
                                className="product-card"
                            >
                                <ProductCard key={ product._id } product={ product }/>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    )
}