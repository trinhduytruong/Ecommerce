import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, defaultSrc, ...props }) => {
    const [imageSrc, setImageSrc] = useState(src);  // Image source
    const [loading, setLoading] = useState(true);   // Loading state

    // Hàm xử lý khi ảnh tải thành công
    const handleLoad = () => {
        setLoading(false);
    };

    // Hàm xử lý khi ảnh bị lỗi, set ảnh mặc định
    const handleError = () => {
        setImageSrc(defaultSrc);
        setLoading(false);
    };

    return (
        <>
            {loading && <div>
                <img
                    src={defaultSrc}
                    alt={alt}
                    {...props}
                />
            </div>} {/* Hiển thị loading khi đang tải ảnh */}
            <img
                src={imageSrc}
                alt={alt}
                onLoad={handleLoad}  // Khi ảnh load thành công
                onError={handleError}  // Khi ảnh load lỗi
                style={{display: loading ? 'none' : 'block'}}  // Ẩn ảnh khi đang loading
                {...props}
            />
        </>
    );
};

export default ImageWithFallback;
