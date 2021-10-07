interface ConfigProps {
    headline: string,
    urls: {[name: string]: string}
}

export const Config: ConfigProps = {
    'headline': 'Sie finden uns auch auf',
    'urls': {
        'PHXTV': 'https://www.phoenixreisen.tv/',
        'PHXWEBSITE': 'https://www.phoenixreisen.com',
        'TWITTER': 'https://twitter.com/phoenixreisen',
        'FACEBOOK': 'https://de-de.facebook.com/PHXTV/',
        'YOUTUBE': 'https://www.youtube.com/PhoenixreisenTV',
        'INSTAGRAM': 'https://www.instagram.com/phoenixreisen',
        'INSTAGRAM_HASHTAG': 'https://www.instagram.com/explore/tags/phoenixreisen',
        'XING': 'https://www.xing.com/companies/phoenixreisengmbh',
    },
};

export default Config;