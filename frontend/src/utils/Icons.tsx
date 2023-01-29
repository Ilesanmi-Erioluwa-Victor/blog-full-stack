

interface Img {
    src : any,
    alt : string,
    className? : string,
}

export const Icon = ({className, alt, src, ...rest}: Img) => {
    return <img src={src} alt={alt} className={className} {...rest}/>
}


