const BBC_NEWS = 'bbc-news',
    DAILY_MAIL = 'daily-mail',
    MTV_NEWS = 'mtv-news',
    NATIONAL_GEOGRAPHIC = 'national-geographic',
    THE_NEW_YORK_TIMES = 'the-new-york-times';

export const newsReducer = (state = BBC_NEWS, action) => {
    switch(action.type) {
    case 'daily': return DAILY_MAIL;
        break;
    case 'mtv': return MTV_NEWS;
        break;
    case 'nat-geo': return NATIONAL_GEOGRAPHIC;
        break;
    case 'times': return THE_NEW_YORK_TIMES;
        break;
    case 'bbc': return BBC_NEWS;
        break;
    default: return state;
    }
};
