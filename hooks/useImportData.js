import { firebase } from "../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";

// This is used to grab the Iqamah and Jumuah timings for the Masjid
const useImportData = () => {
  const [iqamahTimings, setIqamahTimings] = useState("");

  // Create database object and grab relevant document
  const db = getFirestore();
  const iqamahTimesLocation = doc(db, "masjid/sanantonio/data/iqamah-times");

  // Import data on mount
  useEffect(() => {
    const getDocument = async () => {
      const one = await getDoc(iqamahTimesLocation);
      setIqamahTimings(one.data());
    };
    getDocument();
  }, []);
  return iqamahTimings;
};

export default useImportData;
