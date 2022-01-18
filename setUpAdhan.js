const adhan = require("adhan");
const moment = require("moment");

const setUpAdhan = () => {
  // Location of Masjid
  const latitude = 29.637107774550635;
  const longitude = -98.45155341131422;
  const coordinates = new adhan.Coordinates(latitude, longitude);

  // Dates for today and tomorrow
  const date = new Date();
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Parameters for Adhan timings
  var params = adhan.CalculationMethod.NorthAmerica();

  // Initialize prayerTimes object that will be exported
  var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
  const yesterdayPrayerTimes = new adhan.PrayerTimes(
    coordinates,
    yesterday,
    params
  );

  // Format all times

  // prayerTimes.fajr = moment(prayerTimes.fajr)
  //   .tz("America/Chicago")
  //   .format("h:mm A");
  // prayerTimes.sunrise = moment(prayerTimes.sunrise)
  //   .tz("America/Chicago")
  //   .format("h:mm A");
  // prayerTimes.dhuhr = moment(prayerTimes.dhuhr)
  //   .tz("America/Chicago")
  //   .format("h:mm A");
  // prayerTimes.asr = moment(prayerTimes.asr)
  //   .tz("America/Chicago")
  //   .format("h:mm A");
  // prayerTimes.maghrib = moment(prayerTimes.maghrib)
  //   .tz("America/Chicago")
  //   .format("h:mm A");
  // prayerTimes.isha = moment(prayerTimes.isha)
  //   .tz("America/Chicago")
  //   .format("h:mm A");

  // Adding lastThird and midnight values
  const sunnahTimes = new adhan.SunnahTimes(prayerTimes);
  const midnight = moment(sunnahTimes.middleOfTheNight);
  const lastThird = moment(sunnahTimes.lastThirdOfTheNight);

  // Adding lastThird and midnight values for yesterday
  const yesterdaySunnahTimes = new adhan.SunnahTimes(yesterdayPrayerTimes);
  const prevMidnight = moment(yesterdaySunnahTimes.middleOfTheNight);
  const prevLastThird = moment(yesterdaySunnahTimes.lastThirdOfTheNight);

  // Grab value for the next day's Fajr time in new object
  const { fajr } = new adhan.PrayerTimes(coordinates, nextDay, params);
  const { isha } = new adhan.PrayerTimes(coordinates, yesterday, params);

  // Add next day's Fajr time to the original object and export it
  prayerTimes.fajrNext = fajr;
  prayerTimes.prevIsha = isha;
  prayerTimes.prevMidnight = prevMidnight;
  prayerTimes.prevLastThird = prevLastThird;
  prayerTimes.curMidnight = midnight;
  prayerTimes.curLastThird = lastThird;

  // console.log(prayerTimes);

  return prayerTimes;
};

export default setUpAdhan;
