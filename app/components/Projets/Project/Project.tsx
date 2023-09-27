'use client'

import styles from "./Project.module.scss"
import { ThemeContext } from "@context/ThemeContext/ThemeContext";
import { useContext, useEffect } from "react";
import { useFetch } from "@Hooks/Fetch/useFetch";
import Loader from "@components/Loader/Loader"
import CardProject from "@/app/components/Projets/CardProject/CardProject";
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { NextArrow, PrevArrow } from "@components/SwipperNavButtons/SwipperNavButtons";
import { animationSlideScrollToRight, animationSlideScrollToBottom } from "@animation/gsapAnimation"


interface IntItems {
    id: number,
    title: string,
    description: string,
    cover: { [key: string]: string },
    technologies: { [key: string]: string },
    site: string,
    code: string
}

const Project = () => {

    const themeContext = useContext(ThemeContext);
    const isDarkMode = themeContext!.isDarkMode;

    const { items, error } = useFetch<IntItems[]>();

    // Application du light/dark mode
    useEffect(() => {
        if (document.getElementById("projets") !== null && document.getElementById("caroussel") !== null || document.getElementById("errors") !== null) {
            const componentForCssChange = [
                {
                    htmlElement: document.getElementById("projets"),
                    name: 'projects',
                    scss: styles
                },
                {
                    htmlElement: document.getElementById("caroussel"),
                    name: 'projects__caroussel',
                    scss: styles
                },
                {
                    htmlElement: document.getElementById("errors"),
                    name: 'error',
                    scss: styles
                },
            ]
            themeContext?.changeDarkLightMode(componentForCssChange)
        }
    }, [themeContext, isDarkMode])


    //Animations gsap
    useEffect(() => {
        animationSlideScrollToRight("projetTitle", 0.1, 0.2, 0)
    }, []);

    useEffect(() => {
        animationSlideScrollToBottom("caroussel", 0.2, 0.2, 0)
    }, []);



    return (
        <section id="projets" className={styles.projects}>
            <h2 id="projetTitle" className={styles["projects__title"]}> Mes projets</h2>
            {error === undefined ? (
                <div id="caroussel" className={styles["projects__caroussel"]}>
                    {items ? (
                        <Swiper
                            watchSlidesProgress={true}
                            onResize={(swiper) => swiper.slideTo(1)}
                            modules={[Navigation, Pagination, EffectCoverflow, Scrollbar, A11y]}
                            scrollbar={{ draggable: true }}
                            className={styles.swiper}
                            spaceBetween={2}
                            slidesPerView={1}
                            centeredSlides={true}
                            // effect={"coverflow"}
                            // coverflowEffect={{
                            //     rotate: 50,
                            //     stretch: 0,
                            //     depth: 50,
                            //     modifier: 1,
                            //     slideShadows: false,
                            // }}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 0,
                                    centeredSlides: false,
                                },
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                    centeredSlides: true,
                                },
                            }}
                            pagination={false}
                            loop={true}
                        >
                            {items.map((item: IntItems, index: number) => (
                                <SwiperSlide className={styles["swiper__slide"]} key={index}>
                                    {({ isActive, isVisible }) => (
                                        <CardProject
                                            inId={item.title}
                                            inData={item}
                                            inStyleSlider={isActive ? 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5)) grayscale(0%)' : 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5)) grayscale(100%)'}
                                            inBool={isVisible ? true : false}
                                        />
                                    )}
                                </SwiperSlide>
                            ))}
                            <PrevArrow />
                            <NextArrow />
                            <div className={styles["touch"]}>
                                <Icon icon="icon-park-solid:move" aria-label="touch" />
                            </div>
                        </Swiper>
                    ) : (
                        <Loader />
                    )}
                </div>
            ) : (
                <div id="errors" className={styles["error"]}>
                    <p>Une erreur est survenue. Veuillez réessayer ultérieurement.</p>
                </div>
            )}
        </section>
    );
};

export default Project;
