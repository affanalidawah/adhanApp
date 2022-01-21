const moment = require("moment");
import setUpAdhan from "../setUpAdhan";
import React from "react";
import { View, Text } from "react-native";
import { useState } from "react/cjs/react.development";

export default function Countdown() {
  const prayerTimes = setUpAdhan();
  const curAdhan = prayerTimes.currentPrayer();
  let [nextPrayerTime, setNextPrayerTime] = useState(prayerTimes.nextPrayer());
  let [currentPrayer, setCurrentPrayer] = useState(prayerTimes.currentPrayer());

  if (curAdhan != "isha" || curAdhan != none) {
    setCurrentPrayer(curAdhan);
    setNextPrayerTime(prayerTimes.nextPrayer());
  } else {
    setCurrentPrayer("isha");
    moment().isBefore("12:00 AM")
      ? setNextPrayerTime(prayerTimes.nextFajr)
      : setNextPrayerTime(prayerTimes.Fajr);
  }

  const [countdown, setCountdown] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(
        moment.utc(nextPrayerTime.diff(moment())).format("HH:mm:ss")
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>
        {countdown} until {nextPrayerTime}
      </Text>
    </View>
  );
}
