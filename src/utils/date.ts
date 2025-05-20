import {format} from 'date-fns';

export const formatDate = (isoString: string) => format(new Date(isoString), 'yyyy-MM-dd');
