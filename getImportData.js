import { firebase } from "./firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";

export default function getImportData() {
  const [iqamahTimings, setIqamahTimings] = useState("");
  // let iqamahTimings = "";

  // Create database object and grab relevant document
  const db = getFirestore();
  const iqamahTimesLocation = doc(db, "masjid/sanantonio/data/iqamah-times");

  // Import data on mount
  useEffect(() => {
    const getDocument = async () => {
      const one = await getDoc(iqamahTimesLocation);
      setIqamahTimings(one.data());
      // iqamahTimings = one.data();
    };
    getDocument();
  }, []);
  return iqamahTimings;
}
