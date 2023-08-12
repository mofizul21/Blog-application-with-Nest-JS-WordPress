import Link from "next/link";
import Image from "next/image";

export default function FeaturedImage({post}){
    let img = "";
    const defaultFeaturedImage = 'https://testwp.envirosonic.com.au/wp-content/uploads/2023/07/hiking-backpack.jpg';
    const defaultWidth = '300';
    const defaultHeight = '200';

    if (post.featuredImage) {
        let size = post.featuredImage.node.mediaDetails.sizes[1];
        img = {
            src: size.sourceUrl,
            width: size.width,
            height: size.height
        }
    } else {
        img = {
            src: defaultFeaturedImage,
            width: defaultWidth,
            height: defaultHeight
        }
    }

    return (
        <Link href={`/blog/${post.slug}`}>
            <Image className="w-full object-cover rounded-xl" src={img.src} width={img.width} height={img.height} alt={post.title} />
        </Link>
    )
}