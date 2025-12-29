
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

const agencies = [
    {
        name: "Elite Marriages",
        location: "Mumbai, Maharashtra",
        description: "Premium wedding planning for the elite.",
        rating: 4.9,
        reviewCount: 150,
        tags: "Premium,Wedding,Luxury",
        smartMatchScore: 95,
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
        portfolio: JSON.stringify(["/p1.jpg"]),
        priceRangeMin: 500000,
        priceRangeMax: 2000000
    },
    {
        name: "Capital Corporate Events",
        location: "Delhi NCR",
        description: "Professional corporate event management.",
        rating: 4.7,
        reviewCount: 80,
        tags: "Standard,Corporate,Conferences",
        smartMatchScore: 85,
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        portfolio: JSON.stringify(["/p2.jpg"]),
        priceRangeMin: 200000,
        priceRangeMax: 800000
    },
    {
        name: "Tech-City Galas",
        location: "Bengaluru, Karnataka",
        description: "Modern and tech-savvy event experiences.",
        rating: 4.6,
        reviewCount: 65,
        tags: "Modern,Tech,Startups",
        smartMatchScore: 88,
        imageUrl: "https://images.unsplash.com/photo-1505373877741-e8ad17715131?w=800&h=600&fit=crop",
        portfolio: JSON.stringify(["/p3.jpg"]),
        priceRangeMin: 150000,
        priceRangeMax: 500000
    },
    {
        name: "Heritage Celebrations",
        location: "Chennai, Tamil Nadu",
        description: "Keeping traditions alive with every event.",
        rating: 4.8,
        reviewCount: 110,
        tags: "Traditional,Cultural,Weddings",
        smartMatchScore: 90,
        imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
        portfolio: JSON.stringify(["/p4.jpg"]),
        priceRangeMin: 300000,
        priceRangeMax: 1000000
    },
    {
        name: "Durga Decorators",
        location: "Kolkata, West Bengal",
        description: "Artistic decor for festivals and weddings.",
        rating: 4.7,
        reviewCount: 95,
        tags: "Cultural,Decor,Festivals",
        smartMatchScore: 82,
        imageUrl: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop",
        portfolio: JSON.stringify(["/p5.jpg"]),
        priceRangeMin: 100000,
        priceRangeMax: 400000
    },
    {
        name: "Nawabi Feasts",
        location: "Hyderabad, Telangana",
        description: "Exquisite catering with royal Hyderabadi flavors.",
        rating: 4.9,
        reviewCount: 130,
        tags: "Food,Catering,Royal",
        smartMatchScore: 92,
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
        portfolio: JSON.stringify(["/p6.jpg"]),
        priceRangeMin: 250000,
        priceRangeMax: 600000
    },
    {
        name: "Birthday Bashers",
        location: "Pune, Maharashtra",
        description: "Fun and exciting parties for kids and adults.",
        rating: 4.5,
        reviewCount: 45,
        tags: "Birthday,Kids,Parties",
        smartMatchScore: 88,
        imageUrl: "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?w=800&h=600&fit=crop",
        portfolio: JSON.stringify(["/p7.jpg"]),
        priceRangeMin: 50000,
        priceRangeMax: 150000
    },
    {
        name: "Gujju Garba Events",
        location: "Ahmedabad, Gujarat",
        description: "Vibrant Navratri and wedding events.",
        rating: 4.8,
        reviewCount: 105,
        tags: "Festival,Garba,Colorful",
        smartMatchScore: 86,
        imageUrl: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=800&h=600&fit=crop",
        portfolio: JSON.stringify(["/p8.jpg"]),
        priceRangeMin: 150000,
        priceRangeMax: 500000
    },
    {
        name: "Royal Rajasthan Weddings",
        location: "Jaipur, Rajasthan",
        description: "Palace weddings and luxury experiences.",
        rating: 5.0,
        reviewCount: 200,
        tags: "Luxury,Palace,Destination",
        smartMatchScore: 99,
        imageUrl: "https://images.unsplash.com/photo-1544158428-r7-e02d847846?w=800&h=600&fit=crop",
        portfolio: JSON.stringify(["/p9.jpg"]),
        priceRangeMin: 1000000,
        priceRangeMax: 5000000
    },
    {
        name: "Beachside Vows",
        location: "Goa",
        description: "Dreamy beach weddings and sunset parties.",
        rating: 4.8,
        reviewCount: 160,
        tags: "Destination,Beach,Romantic",
        smartMatchScore: 91,
        imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=600&fit=crop",
        portfolio: JSON.stringify(["/p10.jpg"]),
        priceRangeMin: 400000,
        priceRangeMax: 1500000
    },
    {
        name: "Punjabi Beats",
        location: "Chandigarh",
        description: "High energy events with bhangra and beats.",
        rating: 4.7,
        reviewCount: 88,
        tags: "Music,Dance,Energetic",
        smartMatchScore: 84,
        imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
        portfolio: JSON.stringify(["/p11.jpg"]),
        priceRangeMin: 200000,
        priceRangeMax: 700000
    },
    {
        name: "Awadhi Adab Planners",
        location: "Lucknow, Uttar Pradesh",
        description: "Elegant events with a touch of tehzeeb.",
        rating: 4.6,
        reviewCount: 70,
        tags: "Traditional,Elegant,Culture",
        smartMatchScore: 80,
        imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop",
        portfolio: JSON.stringify(["/p12.jpg"]),
        priceRangeMin: 150000,
        priceRangeMax: 500000
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const agency of agencies) {
        const result = await prisma.agency.create({
            data: agency,
        })
        console.log(`Created agency with id: ${result.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
