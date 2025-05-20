import {format, parseISO} from 'date-fns';
import {toZonedTime} from 'date-fns-tz';

const KOREA_TIMEZONE = 'Asia/Seoul';

export const formatDate = (isoString: string) => {
    const date = parseISO(isoString);
    const koreaDate = toZonedTime(date, KOREA_TIMEZONE);
    return format(koreaDate, 'yyyy-MM-dd');
};

export const formatDateTime = (isoString: string) => {
    const date = parseISO(isoString);
    const koreaDate = toZonedTime(date, KOREA_TIMEZONE);
    return format(koreaDate, 'yyyy-MM-dd HH:mm');
};

export const toKoreaTime = (date: Date | string) => {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return toZonedTime(parsedDate, KOREA_TIMEZONE);
};

export const toISODateString = (date: Date) => {
    const koreaDate = toZonedTime(date, KOREA_TIMEZONE);
    return format(koreaDate, 'yyyy-MM-dd');
};

export const toISODateTimeString = (date: Date) => {
    const koreaDate = toZonedTime(date, KOREA_TIMEZONE);
    return format(koreaDate, 'yyyy-MM-dd\'T\'HH:mm');
};
