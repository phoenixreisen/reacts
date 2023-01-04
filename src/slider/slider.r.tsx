import Swiper, { Navigation, Pagination, Scrollbar, SwiperOptions } from 'swiper';
import React, { Children, useEffect, useState } from 'react';

//--- Types -----

type Props = {
    name: string,
    options?: SwiperOptions,
    children: React.ReactNode
}

//--- Komponente -----

export const Slider = (props: Props) => {
    const [slider, setSlider] = useState<Swiper>(null);

    if(!props.name) {
        throw new Error('No classname for Swiper instance given.');
    } else if(!props.children || Children.toArray(props.children).length === 0) {
        throw new Error('Slider has no slides to present.');
    }

    useEffect(() => {
        !slider && setSlider(new Swiper('.swiper', {
            pagination: {
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
                clickable: true,
                el: `.swiper-pagination-${props.name}`,
            },
            navigation: {
                nextEl: `.swiper-button-next-${props.name}`,
                prevEl: `.swiper-button-prev-${props.name}`,
            },
            scrollbar: {
                el: `.swiper-scrollbar-${props.name}`,
            },
            modules: [
                Scrollbar,
                Navigation,
                Pagination
            ],
            longSwipes: false,
            shortSwipes: true,
            simulateTouch: false,
            allowTouchMove: false,
        }));
    }, []);

    return (
        <div className="swiper">
            <div className="swiper-wrapper">
                {Children.toArray(props.children).map((slide, index) => {
                    return <div className="swiper-slide" key={`slide-${index}`}>{slide}</div>;
                })}
            </div>
            <div className={`swiper-scrollbar swiper-scrollbar-${props.name}`}></div>
            <div className={`swiper-button-prev swiper-button-prev-${props.name}`}><i className="fas fa-arrow-circle-left"></i></div>
            <div className={`swiper-button-next swiper-button-next-${props.name}`}><i className="fas fa-arrow-circle-right"></i></div>
            <div className={`swiper-pagination swiper-pagination-${props.name}`}></div>
        </div>
    );
};

export default Slider;