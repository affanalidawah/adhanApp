import { firebase } from "../firebase";
import {
  firestore,
  getFirestore,
  doc,
  collection,
  getDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";

const useImportData = () => {
  const [iqamahTimings, setIqamahTimings] = useState("");

  // database variable
  const db = getFirestore();
  const iqamahTimes = doc(db, "masjid/sanantonio/data/iqamah-times");

  // mount
  useEffect(() => {
    // initialize firebase data imports
    const getDocument = async () => {
      const one = await getDoc(iqamahTimes);
      setIqamahTimings(one.data());
    };
    getDocument();
  }, []);
  return iqamahTimings;
};

export default useImportData;
