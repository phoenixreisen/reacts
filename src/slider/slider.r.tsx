import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
import React, { Children, useEffect, useState } from 'react';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './slider.style.scss';

//--- Types -----

type Props = {
    children: React.ReactNode
}

// Static Modules
Swiper.use([Navigation, Pagination, Scrollbar]);

//--- Komponente -----

export const Slider = (props: Props) => {
    const [slider, setSlider] = useState<Swiper>(null);

    useEffect(() => {
        setSlider(new Swiper('.swiper', {
            pagination: {
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
                clickable: true,
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            longSwipes: true,
            shortSwipes: false,
            simulateTouch: false,
        }));
    }, []);

    useEffect(() => {
        slider?.update?.();
    }, [slider]);

    return (
        <div className="swiper">
            <div className="swiper-wrapper">
                {Children.toArray(props.children).map((slide, index) => {
                    return <div className="swiper-slide" key={`slide-${index}`}>{slide}</div>;
                })}
            </div>
            <div className="swiper-scrollbar"></div>
            <div className="swiper-button-prev"><i className="fas fa-arrow-circle-left"></i></div>
            <div className="swiper-button-next"><i className="fas fa-arrow-circle-right"></i></div>
            <div className="swiper-pagination"></div>
        </div>
    );
};

export default Slider;