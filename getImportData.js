import { firebase, db } from "./firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";

export default function getImportData() {
  const iqamahTimings = {
    fajr: "0:00",
    dhuhr: "0:00",
    asr: "0:00",
    maghrib: "0:00",
    isha: "0:00",
  };

  // Create database object and grab relevant document
  const docRef = doc(
    db,
    "users",
    "bUyFLCnK10ghb9wFyVW6XUfjXGh1",
    "data",
    "prayers"
  );
  // Import data on mount

  const fetchData = async () => {
    try {
      let data = await getDoc(docRef);
      let final = data.data();
      iqamahTimings.fajr = final.fajr;
      iqamahTimings.dhuhr = final.dhuhr;
      iqamahTimings.asr = final.asr;
      iqamahTimings.maghrib = final.maghrib;
      iqamahTimings.isha = final.isha;
      console.log("data collected");
    } catch (e) {
      console.log(e);
      console.log("Failure");
    }
  };
  fetchData();

  console.log("about to return");
  return iqamahTimings;
}
