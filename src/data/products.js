// Static product data for Jalaram Sweets
// Products are displayed with their images - place images in /public/images/products/
// Image naming: use the id as filename e.g. /images/products/1.jpg

export const products = [
  {
    id: "1",
    name: "Malai Penda",
    price: 380,
    description:
      "Malai Penda is prepared with full cream milk and sugar. The rich khoya used in it is made by slowly simmering full-fat milk and continuously stirring until the milk evaporates and thickens into a dense, creamy solid.",
    image: "../images/slide2.jpg",
    category: "Traditional",
  },
  {
    id: "2",
    name: "Mava Penda",
    price: 350,
    description:
      "Mawa Peda is a rich, creamy, and soft Indian fudge-like sweet made from simmered milk solids (khoya), sugar, and cardamom.",
    image: "../images/slide1.png",
    category: "Traditional",
  },
  {
    id: "3",
    name: "Mohanthal",
    price: 400,
    description:
      "A classic Gujarati gram flour sweet cooked in pure desi ghee with cardamom and dry fruits. Dense, crumbly texture with an irresistible aroma that fills the room.",
    image: "../images/mohan.png",
    category: "Traditional",
  },
  {
    id: "4",
    name: "Besan Ladoo",
    price: 300,
    description:
      "Besan ladoos are a popular Gujarati sweet made from besan (gram flour) and sugar. These ladoos are typically coated in sugar syrup and garnished with chopped nuts and dried fruits. They are a popular gift item and are often served as a dessert.",
    image: "../images/besan.png",
    category: "Traditional",
  },
  {
    id: "5",
    name: "Kaju Katli",
    price: 1200,
    description:
      "Premium cashew-based diamond-shaped sweet with a thin silver leaf finish. Made from 100% fresh cashews and pure sugar.",
    image: "../images/kajukatri.png",
    category: "Premium",
  },
  {
    id: "6",
    name: "Gulab Jamun",
    price: 200,
    description:
      "Soft, spongy milk-solid dumplings deep fried to golden brown and soaked in rose-flavoured sugar syrup. Served warm, absolutely divine.",
    image: "../images/gulabjambu.png",
    category: "Classic",
  },


  {
    id: "7",
    name: "Shrikhand",
    price: 350,
    description:
      "Strained yogurt sweetened with sugar, saffron and cardamom. Creamy, silky and luxurious — a Maharashtra-Gujarat dessert treasure.",
    image: "../images/shrikhand.png",
    category: "Premium",
  },
  {
    id: "8",
    name: "Jalebi",
    price: 300,
    description:
      "Crisp, warm spirals of fermented batter fried to golden perfection and soaked in saffron sugar syrup. India's most loved festive sweet.",
    image: "../images/jalebi.png",
    category: "Classic",
  },



];

export const categories = ["All", "Traditional", "Premium", "Classic"];

export default products;
