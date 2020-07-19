import moment from "moment";

export const formatDate = (date, format = 'YYYY-MM-DD') => {
    return moment(date).format(format)
};
