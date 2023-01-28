import PropTypes, { InferProps } from "prop-types";

const ImgProps = {
  className: PropTypes.string,
  alt : PropTypes.string,
  src : PropTypes.object,
  
};

const Icon = ({className, alt, src, ...rest}: InferProps <typeof ImgProps >) => {
    return <img src={src} alt={alt} className={className} {...rest}/>
}

export {
    Icon
}