import { format, isToday, isYesterday } from 'date-fns';

export const groupMessagesByDate = (messages) => {
    console.log(messages);
    // Sort messages by timestamp in descending order
    messages.sort((b, a) => new Date(b.createdAt) - new Date(a.createdAt));
    return messages.reduce((groups, message) => {
        const date = new Date(message.createdAt);
        let dateKey;

        if (isToday(date)) {
            dateKey = 'Today';
        } else if (isYesterday(date)) {
            dateKey = 'Yesterday';
        } else {
            dateKey = format(date, 'MMMM d, yyyy'); // Format date as 'Month day, year'
        }

        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }

        groups[dateKey].push(message);

        return groups;
    }, {});
};
