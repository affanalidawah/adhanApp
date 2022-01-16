const adhan = require("adhan");

const setUpAdhan = () => {
  // Location of Masjid
  let latitude = 29.637107774550635;
  let longitude = -98.45155341131422;
  var coordinates = new adhan.Coordinates(latitude, longitude);

  // Dates for today and tomorrow
  var date = new Date();
  var nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);

  // Parameters for Adhan timings
  var params = adhan.CalculationMethod.NorthAmerica();

  // Initialize prayerTimes object that will be exported
  var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

  // Grab value for the next day's Fajr time in new object
  const { fajr } = new adhan.PrayerTimes(coordinates, nextDay, params);

  // Add next day's Fajr time to the original object and export it
  prayerTimes.fajrNext = fajr;
  return prayerTimes;
};

export default setUpAdhan;
