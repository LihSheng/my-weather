const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "ed3bbecb5bc326ee22950707e6ccb965";

export const weatherApi = {
  get: async (location: string) => {
    const response = await fetch(
      `${baseUrl}?q=${location}&appid=${apiKey}&units=metric`
    );
    return response.json();
  },
};
