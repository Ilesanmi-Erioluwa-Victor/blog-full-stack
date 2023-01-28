// import PropTypes, { InferProps } from "prop-types";

// const ImgProps = {
//   className: PropTypes.string,
//   alt : PropTypes.string || undefined,
//   src : PropTypes.any,
// };

interface Img {
    src : any,
    alt : string,
    className : string,
}

export const Icon = ({className, alt, src}: Img) => {
    return <img src={src} alt={alt} className={className} />
}


