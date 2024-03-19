export const getEventsRss = async () => {
    try {
        const data = await fetch('/.netlify/functions/getEvents');
        return await data.json();
    } catch (error) {
        return false;
    }
}