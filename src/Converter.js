import { useState } from "react";
import "./styles.css";

const Converter = () => {
  const [state, setState] = useState({
    ropani: "",
    squareMeters: "",
    squareFeet: "",
    paisa: "",
    aana: "",
    daam: "",
    bigah: "",
    dhur: "",
    kattha: "",
  });

  let {
    ropani,
    squareMeters,
    squareFeet,
    paisa,
    aana,
    daam,
    kattha,
    dhur,
    bigah,
  } = state;

  const resetState = () => {
    setState({
      ropani: "",
      squareMeters: "",
      squareFeet: "",
      paisa: "",
      aana: "",
      daam: "",
      bigah: "",
      dhur: "",
      kattha: "",
    });
  };

  const sqmToRopaniSystem = () => {
    dhur = +squareMeters / 16.93;
    if (dhur >= 20) {
      let tempDhurDec = dhur % 20;
      let tempDhurWhole = dhur - tempDhurDec;
      dhur = tempDhurDec;
      kattha = tempDhurWhole / 20;
      if (kattha >= 20) {
        let tempKatthaDec = kattha % 20;
        let tempKatthaWhole = kattha - tempKatthaDec;
        kattha = tempKatthaDec;
        bigah = tempKatthaWhole / 20;
      }
    } else {
      bigah -= bigah;
      kattha -= kattha;
    }

  }

  const sqmToBigahSystem = () => {
    let daamValue = squareMeters / 1.99;


    daam = daamValue;
    if (daam >= 4) {
      let tempDaamDec = +daamValue % 4;
      let tempDaamWhole = +daamValue - tempDaamDec;
      daam = +tempDaamDec;
      let tempPaisaValue = +tempDaamWhole / 4;
      paisa = tempPaisaValue;
      if (tempPaisaValue >= 4) {
        let tempPaisaDec = +tempPaisaValue % 4;
        let tempPaisaWhole = +tempPaisaValue - +tempPaisaDec;
        paisa = +tempPaisaDec;
        aana = +tempPaisaWhole / 4;
        if (aana >= 16) {
          let tempAanaDec = aana % 16;
          let tempAanaWhole = aana - tempAanaDec;
          aana = tempAanaDec;
          ropani = tempAanaWhole / 16;
        }

      }
    } else {
      ropani -= ropani;
      aana -= aana;
      paisa -= paisa;
    }
  }

  const converter = (name, value) => {
    switch (name) {
      case "squareMeters":
        squareMeters = +value;
        squareFeet = +value * 10.76;
        sqmToRopaniSystem();
        sqmToBigahSystem();
        break;

      case "ropani":
        ropani = +value;
        let totalRopani = +value + +aana / 16 + +paisa / 64 + +daam / 256;
        squareMeters = +totalRopani * 508.72;
        squareFeet = +squareMeters * 10.76;
        sqmToRopaniSystem();
        break;

      case "aana":
        aana = +value;
        squareMeters = +(ropani * 16 + +value + +paisa / 4 + +daam / 16) * 31.8;
        squareFeet = squareMeters * 10.76;
        sqmToRopaniSystem();
        break;
      case "paisa":
        paisa = +value;
        squareMeters = +(ropani * 256 + +aana * 16 + +value + +daam / 4) * 7.95;
        squareFeet = squareMeters * 10.76;
        sqmToRopaniSystem();
        break;

      case "daam":
        daam = +value;
        squareMeters =
          +(ropani * 256 + +aana * 16 + +paisa * 4 + +value) * 1.99;
        squareFeet = squareMeters * 10.76;
        sqmToRopaniSystem();
        break;
      case "bigah":
        bigah = +value;
        squareMeters = (+value + +kattha / 20 + +dhur / (20 * 20)) * 6772.41;
        squareFeet = +squareMeters * 10.76;
        sqmToBigahSystem();

        break;
      case "kattha":
        kattha = +value;
        squareMeters = (bigah * 20 + +value + +dhur / 20) * 338.62;
        squareFeet = squareMeters * 10.76;
        sqmToBigahSystem();

        break;
      case "dhur":
        dhur = +value;
        squareMeters = (bigah * 20 + +kattha * 20 + +value) * 16.93;
        squareFeet = squareMeters * 10.76;
        sqmToBigahSystem();

        break;
      case "squareFeet":
        squareFeet = +value;
        squareMeters = +value / 10.76;
        sqmToRopaniSystem();
        sqmToBigahSystem();

        break;
      default:
        return state;
    }

    setState({
      ropani,
      squareMeters,
      squareFeet,
      paisa,
      aana,
      daam,
      kattha,
      dhur,
      bigah,
    });
  };

  const onChange = (e, name) => {
    e.preventDefault();
    const { value } = e.target;
    converter(name, value);
  };

  console.log("state", state);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}> Land Converter</h1>
      <h4 style={{ textAlign: "center" }}> all in one nepali land converter</h4>
      <div className="button-container">
        <button onClick={resetState}>Reset</button>
      </div>
      <div>
        <h4>Ropani System</h4>
        <label>
          Ropani
          <input
            className="unit-input"
            placeholder="0"
            value={ropani}
            type="number"
            onChange={(e) => onChange(e, "ropani")}
          />
        </label>
        <label>
          Aana
          <input
            className="unit-input"
            placeholder="0"
            value={aana}
            type="number"
            onChange={(e) => onChange(e, "aana")}
          />
        </label>
        <label>
          Paisa
          <input
            className="unit-input"
            placeholder="0"
            value={paisa}
            type="number"
            onChange={(e) => onChange(e, "paisa")}
          />
        </label>
        <label>
          Daam
          <input
            className="unit-input"
            placeholder="0"
            value={daam}
            type="number"
            onChange={(e) => onChange(e, "daam")}
          />
        </label>
      </div>
      <div>
        <h4>Bigah System</h4>
        <label>
          Bigah
          <input
            className="unit-input"
            placeholder="0"
            value={bigah}
            type="number"
            onChange={(e) => onChange(e, "bigah")}
          />
        </label>
        <label>
          Kattha
          <input
            className="unit-input"
            placeholder="0"
            value={kattha}
            type="number"
            onChange={(e) => onChange(e, "kattha")}
          />
        </label>
        <label>
          Dhur
          <input
            className="unit-input"
            placeholder="0"
            value={dhur}
            type="number"
            onChange={(e) => onChange(e, "dhur")}
          />
        </label>
      </div>
      <div>
        <h4>Square Meters</h4>
        <label>
          Square Meters
          <input
            value={squareMeters}
            className="unit-input"
            onChange={(e) => onChange(e, "squareMeters")}
            placeholder="0"
            type="number"
          />
        </label>
      </div>
      <div>
        <h4>Square Feet</h4>
        <label>
          Square Feet
          <input
            value={squareFeet}
            className="unit-input"
            onChange={(e) => onChange(e, "squareFeet")}
            placeholder="0"
            type="number"
          />
        </label>
      </div>
    </div>
  );
};

export default Converter;
